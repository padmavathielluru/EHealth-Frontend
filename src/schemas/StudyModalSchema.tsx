import { z } from "zod";
import { yearSchema } from "./schema";

export const studySchema = z.object({
  degree: z
    .string()
    .trim()
    .min(2, "Degree / Certification is required")
    .max(100, "Degree / Certification is too long")
    .regex(/^[A-Za-z]/, "Degree / Certification must start with a letter")
    .regex(
      /^[A-Za-z][A-Za-z .,&()-]*$/,
      "Degree must start with a letter and contain only valid characters"
    ),

  institution: z
    .string()
    .trim()
    .min(2, "Institution Name is required")
    .max(100, "Institution Name is too long")
    .regex(/^[A-Za-z]/, "Institution Name must start with a letter")
    .regex(
      /^[A-Za-z][A-Za-z .,&()-]*$/,
      "Institution name must start with a letter and contain only valid characters"
    ),

  specialization: z
    .string()
    .trim()
    .min(1, "Specialization is required"),

  year: yearSchema,
});

export type StudyFormType = z.infer<typeof studySchema>;
