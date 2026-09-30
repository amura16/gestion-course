import { useState } from "react";
import { useAuth } from "../providers/AuthProviders";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { ZodError } from "zod";

export const LoginForm = () => {
    const { login } = useAuth();

    const [formData, setFromData] = useState<LoginFormData>({
        email: "",
        password: "",
    })

    // Erreur par champ
    const [fieldErrors, setFieldErrors] = useState<
        Partial<Record<keyof LoginFormData, string>>
    >({});
    const [globalError, setGlobalError] = useState<string | null >(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name , value } = event.target;
        setFromData((prev) => ({...prev, [name] : value}));

        // effacer l'erreur du champ dès qu'on tape
        if (fieldErrors[name as keyof LoginFormData]){
            setFieldErrors((prev) => ({ ...prev, [name] : undefined }));
        }
    }
    

    const handleSubmit = async (
        event: React.SubmitEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setFieldErrors({});
        setGlobalError(null);
        setIsSubmitting(true);

        try {
            // validation zod
            const validatedData = loginSchema.parse(formData);
            
            // Appel API aprés la validation 
            await login(validatedData);

        } catch (error) {

            if (error instanceof ZodError){
                // Transformer les erreurs Zod en objet { email?: string, password?: string }
                const errors: Partial<Record<keyof LoginFormData, string>> = {};

                error.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof LoginFormData;
                    if (field) {
                        errors[field] = issue.message;
                    }
                });

                setFieldErrors(errors);
            } else {
                // Erreur venant de l'API (identifiants incorrects, etc.)
                setGlobalError("Identifiants incorrects.");
            }
            
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate> {/* noValidate pour laisser Zod gérer */}
            <div>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                    <p id="email-error" role="alert" style={{ color: "red" }}>
                        {fieldErrors.email}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="password">
                    Mot de passe
                </label>

                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? "password-error" : undefined}
                />
                {fieldErrors.password && (
                    <p id="password-error" role="alert" style={{ color: "red" }}>
                        {fieldErrors.password}
                    </p>
                )}
            </div>

            {globalError && (
                <p role="alert" style={{ color: "red" }}>
                    {globalError}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Connexion..."
                    : "Se connecter"}
            </button>
        </form>
    );
}