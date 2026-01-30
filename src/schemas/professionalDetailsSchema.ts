import { z } from "zod";

export const practiceSchema = z.object({
    practiceType: z.string().min(1, "Practice type is required"),
    clinicName: z.string().min(1, "Clinic/Hospital name is required"),
    location: z.string().min(1, "Location is required"),
});

export const professionalDetailsSchema = z.object({
    degree: z.string().optional(),

    specialization: z.string().min(1, "Specialization is required"),

    experience: z.string()
                .min(1, "Experience is required")
                .refine((val) => Number(val) > 0, {
                    message: "Experience must be greater than 0",
                }),
    council: z.string().min(1, "Medical council is required"),
    license: z.string().min(1,"License number is required"),
    practices:z.array(practiceSchema)
                .min(1, "At least one practice is required"),
});