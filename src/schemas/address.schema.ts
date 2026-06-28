import { z } from "zod";

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
  City: z.string().optional(),
  Pincode: z.string().optional(),
}).nullable().optional();
