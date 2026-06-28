import { z } from "zod";
import {Regex} from '@/constants'

export const signUpSchema = z
  .object({
    FirstName: z.string().min(3, "First Name is required").max(50),
    LastName: z.string().min(3, "Last Name is required").max(50),
    Email: z.email("Invalid email format").min(1, "Email is required"),
    ProfileSlug: z
        .string()
        .min(5, "Slug must be at least 5 characters")
        .max(100)
        .regex(
            Regex.Slug,
            "Only lowercase letters, numbers and hyphens are allowed"
        ),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be no more than 16 characters")
      .regex(
        Regex.Password,
        "Password must contain uppercase, lowercase, number and special character"
      ),
    ConfirmPassword: z.string(),
    AgreeTerms: z.boolean().refine(
      (val) => val === true,
      { error: "You must accept the terms and conditions" }
    ),
  })
  .refine(
    (data) => data.Password === data.ConfirmPassword,
    {
      error: "Passwords do not match",
      path: ["ConfirmPassword"],
    }
  );

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  Email: z.email("Invalid email format"),
  Password: z.string({error: "Password is required"}),
  RememberMe: z.boolean()
})

export type SignInFormData = z.infer<typeof signInSchema>;