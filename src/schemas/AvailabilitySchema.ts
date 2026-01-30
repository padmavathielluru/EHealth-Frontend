import { z } from "zod";
import { toMinutes } from "../utils/TimeConstants";


const timeRangeSchema = z.object({
  startTime: z.string().optional(),

  startMeridiem: z.string().refine(
    (v) => v === "AM" || v === "PM",
    { message: "Invalid meridiem" }
  ),

  endTime: z.string().optional(),

  endMeridiem: z.string().refine(
    (v) => v === "AM" || v === "PM",
    { message: "Invalid meridiem" }
  ),
});

const overlaps = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd;

const validateTimeRanges = (
  ranges: any[],
  ctx: z.RefinementCtx,
  label: string
) => {
  ranges.forEach((r) => {
    if (!r.startTime || !r.endTime) return;

    const start = toMinutes(r.startTime, r.startMeridiem);
    const end = toMinutes(r.endTime, r.endMeridiem);

    if (start === null || end === null || start >= end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label}: Start time must be earlier than end time`,
        path: [label.toLowerCase()],
      });
    }
  });

  const validRanges = ranges
    .map((r) => ({
      start: r.startTime
        ? toMinutes(r.startTime, r.startMeridiem)
        : null,
      end: r.endTime
        ? toMinutes(r.endTime, r.endMeridiem)
        : null,
    }))
    .filter((r) => r.start !== null && r.end !== null)
    .sort((a, b) => a.start! - b.start!);

  for (let i = 0; i < validRanges.length - 1; i++) {
    if (validRanges[i + 1].start! < validRanges[i].end!) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label}: Time ranges should not overlap`,
        path: [label.toLowerCase()],
      });
      break;
    }
  }

  return validRanges;
};


export const availabilitySchema = z
  .object({
    location: z.string().min(1, "Location is required"),
    day: z.string().min(1, "Day is required"),
    consultationMode: z.string().min(1, "Consultation mode is required"),

    slots: z.array(timeRangeSchema),
    breaks: z.array(timeRangeSchema).optional(),
  })
  .superRefine((data, ctx) => {
    const { slots, breaks = [] } = data;

    const hasAnySlot = slots.some(
      (s) => s.startTime && s.endTime
    );

    if (!hasAnySlot) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one slot is required",
        path: ["slots"],
      });
      return;
    }

    const validSlots = validateTimeRanges(slots, ctx, "Slots");

    const validBreaks = validateTimeRanges(breaks, ctx, "Breaks");

    validBreaks.forEach((br) => {
      const overlapsWithSlot = validSlots.some((slot) =>
        overlaps(
          br.start!,
          br.end!,
          slot.start!,
          slot.end!
        )
      );

      if (overlapsWithSlot) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Break time overlaps with doctor working hours",
          path: ["breaks"],
        });
      }
    });

  });

export type AvailabilitySchemaType = z.infer<typeof availabilitySchema>;
