import { z } from "zod";
import { addressSchema } from "@/schemas";
import { educationLevels } from "@/constants";

export const educationSchema = z.object({
  UniqueCode: z.string().optional(),

  EducationLevel: z.enum(educationLevels, {
    message: "Education level is required",
  }),

  Institute: z
    .string()
    .trim()
    .min(1, "Institute is required"),

  Degree: z
    .string()
    .trim(),

  SpecializationOfStudy: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  Description: z.string().optional(),

  StartDate: z
    .string()
    .trim()
    .min(1, "Start period is required"),

  EndDate: z
    .string()
    .optional()
    .nullable(),

  Marks: z.coerce
    .number()
    .min(0, "Marks cannot be negative")
    .optional(),

  Grade: z.coerce
    .number()
    .min(0, "Grade cannot be negative")
    .max(4, "Grade cannot be greater than 4")
    .optional(),

  Address: addressSchema,

  Achievements: z.array(
    z.string().trim()
  )
})
.superRefine((data, ctx) => {
  if (
    data.StartDate &&
    data.EndDate &&
    new Date(data.EndDate) < new Date(data.StartDate)
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["EndDate"],
      message: "End period cannot be earlier than start period",
    });
  }
});

export type EducationSchemaFormData = z.infer<typeof educationSchema>;
export type EducationSchemaFormDataInput = z.input<typeof educationSchema> 
export type EducationSchemaFormDataOutput = z.output<typeof educationSchema>