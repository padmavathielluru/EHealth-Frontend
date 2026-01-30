import { z } from "zod";

const currentYear = new Date().getFullYear();
const futureYears = 5;

export const PHONE_LENGTH_BY_COUNTRY: Record<string, {min: number; max: number}> = {
  "+91": { min: 10, max: 10 },
  "+1": { min: 10, max: 10 },
  "+44": { min: 10, max: 11 },
  "+61": { min: 9, max: 9 },
  "+971": { min: 9, max: 9 },
}

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
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordFormType =
  z.infer<typeof resetPasswordSchema>;

export const amountSchema = z.string()
  .min(1, "*Amount is required")
  .refine((val) => /^\d/.test(val), {
    message: "*Amount must start with a number",
  })
  .refine((val) => /^\d+(\.\d+)?$/.test(val), {
    message: "*Only numbers and one dot (.) are allowed"
  });

export const costSchema = z.object({
  inClinic: z.object({
    consultationFee: amountSchema,
    followUpFee: amountSchema,
    emergencyFee: amountSchema,
  }),
  video: z.object({
    consultationFee: amountSchema,
    followUpFee: amountSchema,
    emergencyFee: amountSchema,
  }),
  homeVisit: z.object({
    consultationFee: amountSchema,
    followUpFee: amountSchema,
    emergencyFee: amountSchema,
  }),
});


export type CostFormType = z.infer<typeof costSchema>;

export const loginSchema = z.object({
  username: z.string()
    .min(1, "*Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Username must start with a letter and contain only letters, numbers, and underscore")
    .refine((val) => !/\s/.test(val), {
      message: "Username should not contain spaces",
    })
    .transform((val) => val.toLowerCase()),

  password: z.string()
    .min(1, "Password is required")
    .min(6, "*Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&#]/, "Password must conatin at least one special character"),
});
export type LoginFormType = z.infer<typeof loginSchema>;

export const createAccountSchema = z.object({
  username: z.string()
    .min(1, "*Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Username must start with a letter and contain only letters, numbers, and underscore")
    .refine((val) => !/\s/.test(val), {
      message: "Username should not contain spaces",
    })
    .transform((val) => val.toLowerCase()),

  email: z.string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine((val) => !/\s/.test(val), {
      message: "Email should not contain spaces",
    })
    .transform((val: string) => val.trim().toLowerCase()),


  password: z.string()
    .min(1, "Password is required")
    .min(6, "*Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&#]/, "Password must conatin at least one special character"),
});
export type createAccountFormType = z.infer<typeof createAccountSchema>;


export const verifyMobileSchema = z
  .object({
    countryCode: z.string().min(1, "Country code is required"),

    phone: z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^[0-9]+$/, "Mobile number must contain only digits"),
  })
  .superRefine((data, ctx) => {
    const rule = PHONE_LENGTH_BY_COUNTRY[data.countryCode];

    if (!rule) return;

    if (data.phone.length < rule.min || data.phone.length > rule.max) {
      ctx.addIssue({
        path: ["phone"],
        message: `Mobile number must be ${rule.min}${
          rule.min !== rule.max ? `–${rule.max}` : ""
        } digits`,
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type VerifyMobileFormType = z.infer<typeof verifyMobileSchema>;

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
    .min(1, "*Phone number required")
    .regex(/^[0-9]+$/, "*Only numbers allowed")
    .min(7, "*Phone number is too short")
    .max(15, "*Phone number is too long"),

  email: z.email("Invalid email"),

  password: z.string().min(6, "Min 6 characters"),

  gender: z.string().min(1, "Select gender"),

  startDate:z.string().min(1, "Start date is required"),

  qualifications: z.string().min(1, "Select qualification"),
  specialization: z.string().min(1, "Select specialization"),

  languages: z.string()
    .min(2, "*Languages field is required")
    .regex(/^[A-Za-z ,\s]+$/, "*Only alphabets and commas allowed"),
    
  year: yearSchema,

});


export type FormSchemaType = z.infer<typeof formSchema>;
