import { z } from "zod";

export const optionalUrl = z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
        value => !value || /^https?:\/\/.+/i.test(value),
        {
            message: "Please enter a valid URL",
        }
    );