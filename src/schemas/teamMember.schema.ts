import { z } from "zod";
import { optionalUrl } from "@/schemas";

const socialSchema = z.object({
  Facebook: optionalUrl,
  Twitter: optionalUrl,
  LinkedIn: optionalUrl,
  Instagram: optionalUrl,
  Github: optionalUrl
});

export const teamMemberSchema = z.object({

  UniqueCode: z.string().optional(),

  MemberName: z
    .string()
    .trim()
    .min(1, "Member name is required"),

  Designation: z
    .string()
    .trim()
    .min(1, "Designation is required"),

  Image: z.any().optional(),

  Experience: z
    .coerce
    .number()
    .min(0, "Experience cannot be negative")
    .optional(),

  Bio: z
    .string()
    .trim()
    .min(1, "Bio is required"),

  Skills: z.array(
    z.string().trim()
  ),

  Social: socialSchema
});

export type TeamMemberSchemaFormData = z.infer<typeof teamMemberSchema>;