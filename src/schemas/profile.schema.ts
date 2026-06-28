import { LanguageLevel } from "@/constants";
import { addressSchema } from "@/schemas";
import { z } from "zod";

export const languageSchema = z.object({
  UniqueCode: z.string().nullable().optional(),
  Name: z.string({error: "Language name is required"}).min(1, "Language is required"),
  Level: z.enum(Object.values(LanguageLevel)),
}).optional();

export const profileFormSchema = z.object({
  FirstName: z
    .string({error: "First name is required"})
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  LastName: z
    .string({error: "Last name is required"})
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  Email: z.
    email("Invalid email format")
    .min(1, "Email is required"),
  Phone: z.string({error: "Phone is required"}).min(1, "Phone number is required"),
  Designation: z.string().optional(),
  Hobbies: z.array(z.string()).optional(),
  Language: z.array(languageSchema).optional(),
  Availability: z.string().optional(),
  Summary: z.string().optional(),
  AboutMe: z.string().optional(),
  Address: addressSchema,
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;