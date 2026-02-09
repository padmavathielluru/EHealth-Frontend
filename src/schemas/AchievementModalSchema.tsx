import { z } from "zod";
import { yearSchema } from "./schema";

export const AchievementModalSchema = z.object({
    title: z.string()
        .trim()
        .min(2, "Achievement title is required")
        .max(100, "Maximum 100 characters allowed")
        .regex(
            /^[A-Za-z][A-Za-z0-9 &()\-._']*$/,
            "Title must start with a letter and contain only valid characters"
        ),

    year: yearSchema,

    description: z.string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Maximum 500 characters allowed"),
});

export type AchievementModalFormType = z.infer<
    typeof AchievementModalSchema>;