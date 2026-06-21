import { z } from "zod";

export const addSkillSchema = z.object({
  Title: z.string({error: "Title is required."}).trim().nonempty({error: "Title is required."}),
  Icon: z.string({message: "Icon is required"}).trim().nonempty({error: "Icon is required."})
})

export type AddSkillSchemaFormData = z.infer<typeof addSkillSchema>;

export const addSubSkillSchema = z.object({
  Name: z.string({error: "Name is required."})
            .trim().nonempty({error: "Name is required."}),
  Category: z.string({message: "Category is required"})
            .trim().nonempty({error: "Category is required."}),
  Percentage: z.coerce.number({error: "percentage should be number"})
                .min(0, {error: "percentage should not be less than 0"})
                .max(100, {error: "percentage should not be more than 100"})
})

export type AddSubSkillSchemaFormData = z.infer<typeof addSubSkillSchema>;

export const addTechnologySchema = z.object({
  Name: z.string({error: "Name is required."}).trim().nonempty({error: "Name is required."})
})

export type AddTechnologySchemaFormData = z.infer<typeof addTechnologySchema>;
