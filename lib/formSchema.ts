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

export const AddPartenaireSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  secteur: z.string().optional(),
  contact: z.string().optional(),
  commentaire: z.string().optional(),
});

export const AddEventCalendarSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  start: z.string(),
  end: z.string(),
});
