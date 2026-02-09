import { z } from "zod";
import { responsibilityBaseSchema } from "./ResponsibilitybaseSchema";

export const responsibilityModalSchema =
  responsibilityBaseSchema.safeExtend({

    role: z
      .string()
      .min(1, "*Role is required")
      .min(2, "*Role must be at least 2 characters")
     .regex(
        /^[A-Za-z][A-Za-z .,&()-]*$/,
        "*Role must start with a letter and contain only valid characters"
      ),

    institution: z
      .string()
      .min(1, "*Institution is required")
      .min(2, "*Institution must be at least 2 characters")
        .regex(
        /^[A-Za-z][A-Za-z .,&()-]*$/,
        "*Institution must start with a letter and contain only valid characters"
      ),

    keyResponsibilities: z
      .string()
      .min(1, "*Key responsibilities is required")
      .min(10, "*Minimum 10 characters required")
      .regex(
        /^[A-Za-z][A-Za-z ,.\n-]*$/,
        "*Must start with a letter and contain only valid characters"
      ),
  });

export type ResponsibilityModalFormType =
  z.infer<typeof responsibilityModalSchema>;
