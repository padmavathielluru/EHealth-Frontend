import { z } from "zod";

const MeridiemEnum = {
  AM: "AM",
  PM: "PM",
} as const;

export const formSchema = z.object({
  plain: z.string().min(2, "Must be at least 2 characters"),

  number: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Min 6 characters"),

  fromTime: z.string().min(4, "Select From Time"),
  fromMeridiem: z.nativeEnum(MeridiemEnum),

  toTime: z.string().min(4, "Select To Time"),
  toMeridiem: z.nativeEnum(MeridiemEnum),
});

export type FormSchemaType = z.infer<typeof formSchema>;
