import { LanguageLevel } from "@/constants";
import type { IProfile } from "@/types/data.types";
import { z } from "zod";

export const languageSchema = z.object({
  UniqueCode: z.string().nullable().optional(),
  Name: z.string({error: "Language name is required"}).min(1, "Language is required"),
  Level: z.enum(Object.values(LanguageLevel)),
}).optional();

export const countrySchema = z.object({
  Name: z.string().min(1, "Country is required"),
  Code: z.string().min(1),
  PhoneCode: z.string().optional(),
  Flag: z.string().optional(),
  Currency: z.string().optional(),
}).nullable().optional();

export const stateSchema = z.object({
  Name: z.string().min(1, "State is required"),
  Code: z.string().min(1),
  CountryCode: z.string(),
}).nullable().optional();

export const citySchema = z.object({
  Name: z.string().min(1, "City is required"),
  CountryCode: z.string(),
  StateCode: z.string(),
}).nullable().optional();

export const addressSchema = z.object({
  UniqueCode: z.string().optional(),
  AddressLine1: z.string().optional(),
  AddressLine2: z.string().optional(),
  Country: countrySchema,
  State: stateSchema,
  City: citySchema,
  Pincode: z.string().optional(),
}).nullable().optional();

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

// export type ProfileFormValues = Pick<
//   IProfile,
//   | "FullName"
//   | "Email"
//   | "Phone"
//   | "Designation"
//   | "Hobbies"
//   | "Language"
//   | "Availability"
//   | "Summary"
//   | "AboutMe"
//   | "Address"
// >;