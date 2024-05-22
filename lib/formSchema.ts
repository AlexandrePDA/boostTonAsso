import { z } from "zod";

export const AddAdherentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  benevole: z.boolean(),
  email: z.string().optional(),
  telephone: z.string().optional(),
});
