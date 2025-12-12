import { z } from "zod";

const MeridiemEnum = {
  AM: "AM",
  PM: "PM",
} as const;

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "*First name is required")
    .regex(/^[A-Za-z ]+$/, "*Enter only alphabets"),

  lastName: z
    .string()
    .min(1, "*Last name is required")
    .regex(/^[A-Za-z ]+$/, "*Enter only alphabets"),

  plain: z.string().min(1, "*Must be at least 2 characters")
           .regex(/^[A-Za-z ]+$/,"Only alphabets allowed.No number or special characters."),

  countryCode: z.string().min(1, "Code required"),
 phone: z.string()
  .min(0, "*Phone number required")
  .regex(/^[0-9]+$/, "*Only numbers allowed"),

  email: z.email("Invalid email"),

  password: z.string().min(6, "Min 6 characters"),

  gender:z.string().min(1, "Select gender"),

  qualifications: z.string().min(1, "Select qualification"),
  specialization: z.string().min(1,"Select specialization"),

  fromTime: z.string().min(4, "Select From Time"),
  fromMeridiem: z.nativeEnum(MeridiemEnum),

  toTime: z.string().min(4, "Select To Time"),
  toMeridiem: z.nativeEnum(MeridiemEnum),
});

export type FormSchemaType = z.infer<typeof formSchema>;
