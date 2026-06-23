import { z } from "zod";
import { addressSchema } from "./addressSchema";

export const experienceSchema = z.object({
  UniqueCode: z.string().optional(),
  Position: z
    .string()
    .trim()
    .min(1, "Position is required"),
  Company: z
    .string()
    .trim()
    .min(1, "Company is required"),
  Address: addressSchema,
  StartDate: z
    .string()
    .trim()
    .min(1, "Start period is required"),
  EndDate: z.string().optional().nullable(),
  Phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  Website: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) =>
        !value ||
        /^https?:\/\/.+/i.test(value),
      {
        message: "Please enter a valid website URL",
      }
    ),
  Description: z.string().optional(),
  Achievements: z
    .array(
      z.string().trim()//.min(1, "Achievement cannot be empty")
    )
    // .min(1, "At least one achievement is required"),
})
.superRefine((data, ctx) => {
  if (
    data.StartDate &&
    data.EndDate &&
    new Date(data.EndDate) < new Date(data.StartDate)
  ) {
    ctx.addIssue({
    //   code: z.ZodIssueCode.custom,
      code: "custom",
      path: ["EndDate"],
      message: "End period cannot be earlier than start period",
    });
  }
});

export type ExperienceSchemaFormData = z.infer<typeof experienceSchema>;