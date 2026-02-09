import { z } from "zod";
import { yearSchema } from "./schema";

export const responsibilityBaseSchema = z.object({
  startYear: yearSchema,
  endYear: yearSchema,
})
.refine(
  (data) => Number(data.endYear) >= Number(data.startYear),
  {
    path: ["endYear"],
    message: "End year cannot be before start year",
  }
)
.refine(
  (data) => Number(data.startYear) <= Number(data.endYear),
  {
    path: ["startYear"],
    message: "Start year cannot be after end year",
  }
);

export type ResponsibilityBaseFormType =
  z.infer<typeof responsibilityBaseSchema>;
