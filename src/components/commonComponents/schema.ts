import { z } from "zod";

const currentYear = new Date().getFullYear();
const futureYears = 5;

export const yearSchema = z.string()
  .min(4, "Enter a valid 4-digit year")
  .regex(/^\d+$/, "Only numbers allowed")
  .refine((val) => Number(val) >= 1900, {
    message: "Year cannot be less than 1900",
  })
  .refine((val) => Number(val) <= currentYear + futureYears, {
    message: "Year is too far in the future",
  });

export const singleYearSchema = z.object({
  year: yearSchema,
});

export type SingleYearFormType =
  z.infer<typeof singleYearSchema>;

export const responsibilitySchema = z.object({
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

export type ResponsibilityFormType = z.infer<typeof responsibilitySchema>;

export const symptomsSchema = z
  .string()
  .min(1, "*Symptoms is required")
  .regex(
    /^[A-Za-z][A-Za-z ,\s]*$/,
    "*Symptoms must start with a letter and contain only alphabets, commas and spaces"
  );

export type SymptomsFieldType = z.infer<typeof symptomsSchema>;

export const resetPasswordSchema = z.object({
  currentPassword: z.string()
              .min(6, "Current password is required"),

  newPassword: z.string()
              .min(6, "New Password must be at least 6 characters"),

  confirmPassword: z.string()
                  .min(6, "Confirm password is required"),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  path:["confirmPassword"],
  message: "Passwords do not match",
});

export type ResetPasswordFormType =
    z.infer<typeof resetPasswordSchema>;

export const amountSchema = z.string()
        .min(1, "*Amount is required")
        .refine((val) => /^\d/.test(val), {
          message: "*Amount must start with a number",
        })
        .refine((val) => /^\d+(\.\d+)?$/.test(val),{
          message: "*Only numbers and one dot (.) are allowed"
        });

export const costSchema = z.object({
  consultationFee: amountSchema,
  followUpFee: amountSchema,
  telemedicineFee: amountSchema,
  emergencyFee: amountSchema,
});
export type CostFormType = z.infer<typeof costSchema>;

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
    .regex(/^[A-Za-z ]+$/, "Only alphabets allowed.No number or special characters."),

  countryCode: z.string().min(1, "Code required"),
  phone: z.string()
    .min(0, "*Phone number required")
    .regex(/^[0-9]+$/, "*Only numbers allowed"),

  email: z.email("Invalid email"),

  password: z.string().min(6, "Min 6 characters"),

  gender: z.string().min(1, "Select gender"),

  qualifications: z.string().min(1, "Select qualification"),
  specialization: z.string().min(1, "Select specialization"),

  languages: z.string()
    .min(2, "*Languages field is required")
    .regex(/^[A-Za-z ,\s]+$/, "*Only alphabets and commas allowed"),

  // year: z.string().optional(),
   year: yearSchema,

  fromTime: z.string().optional(),
  fromMeridiem:z.string().optional(),
  toTime:z.string().optional(),
  toMeridiem:z.string().optional(),

});

export const dateDDMMYYYYSchema = z
  .string()
  .min(10, "*Date is required")
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "*Only numbers allowed")
  .refine((val) => {
    const [day, month, year] = val.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }, {
    message: "*Enter valid date",
  });


export type FormSchemaType = z.infer<typeof formSchema>;
