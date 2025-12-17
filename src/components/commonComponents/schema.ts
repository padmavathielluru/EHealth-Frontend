import { z } from "zod";

const MeridiemEnum = {
  AM: "AM",
  PM: "PM",
} as const;

const currentYear = new Date().getFullYear();
const futureYears=5;

 export const yearSchema=z.string()
    .min(4, "Enter a valid 4-digit year")
    .regex(/^\d+$/, "Only numbers allowed")
    .refine((val) => Number(val) >= 1900,{
      message: "Year cannot be less than 1900",
    })
    .refine((val) => Number(val) <= currentYear+futureYears, {
      message: "Year is too far in the future",
    });

    export const singleYearSchema = z.object({
      year: yearSchema,
    });

    export type SingleYearFormType=
      z.infer<typeof singleYearSchema>;

      export const responsibilitySchema =z.object({
        startYear: yearSchema,
        endYear: yearSchema,
      })
      .refine(
        (data) => Number(data.endYear) >= Number(data.startYear),
        {
          path:["endYear"],
          message: "End year cannot be before start year",
        }
      )
      .refine(
        (data) => Number(data.startYear) <= Number(data.endYear),
        {
          path: ["startYear"],
          message:"Start year cannot be after end year",   
         }
      );

      export type ResponsibilityFormType = z.infer<typeof responsibilitySchema>;  

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

  languages:z.string()
  .min(2, "*Languages field is required")
  .regex(/^[A-Za-z ,\s]+$/,"*Only alphabets and commas allowed"),

  fromTime: z.string().min(4, "Select From Time"),
  fromMeridiem: z.nativeEnum(MeridiemEnum),

  toTime: z.string().min(4, "Select To Time"),
  toMeridiem: z.nativeEnum(MeridiemEnum),

  year: yearSchema,

 
});

export type FormSchemaType = z.infer<typeof formSchema>;
