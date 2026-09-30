import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Format d'email invalide"),

    password: z
        .string()
        .min(1, "Le mot de passe ne doit pas être vide")
        // .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        // .regex(/[A-Z]/, "Doit contenir au moins une lettre majuscule")
        // .regex(/[0-9]/, "Doit contenir au moins un chiffre")
        // .regex(/[^a-zA-Z0-9]/, "Doit contenir au moins un caractère spécial"),
})

export type LoginFormData = z.infer<typeof loginSchema>;