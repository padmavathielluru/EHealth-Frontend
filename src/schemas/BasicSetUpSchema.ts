import { z } from "zod";
import { dateDDMMYYYYSchema } from "./schema";

export const personalInfoSchema = z.object({

    firstName: z.string()
            .min(1,"*First name is required")
            .regex(/^[A-Za-z ]+$/, "*Only alphabets allowed"),

    middleName: z.string()
                .optional()
                .refine((val) => !val || /^[A-Za-z ]+$/.test(val),
            { message: "*Only alphabets allowed"}),

    lastName: z.string()
            .min(1, "*Last name is required")
            .regex(/^[A-Za-z ]+$/, "*Only alphabets allowed"),

    email:z.string()
            .min(1, "*Email is required")
            .email("*Enter a valid email"),

    gender:z.string().min(1, "*Select gender"),

    startDate: dateDDMMYYYYSchema,
});

export const addressInfoSchema = z.object({

    address1:z.string().min(1, "*Address is required"),
    address2:z.string().optional(),

    city:z.string().min(1, "*City is required"),

    country:z.string().min(1, "*Country is required"),

    state:z.string().min(1, "*state is required"),

    pincode:z.string()
            .min(1, "*PIN Code is required")
            .regex(/^[0-9]{6}$/, "*Enter valid PIN code"),
});

export const basicSetUpSchema = personalInfoSchema.merge(addressInfoSchema);

export type BasicSetUpFormValues = z.infer<typeof basicSetUpSchema>;