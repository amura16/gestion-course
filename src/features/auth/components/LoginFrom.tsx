import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../providers/AuthProviders";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";

export const LoginForm = () => {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur", // ← validation en temps réel au blur (recommandé)
        // mode: "onChange", // ← si on veux valider à chaque frappe
    });
    

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
        } catch {
            // Erreur globale (identifiants incorrects)
            setError("root", {
                message: "Identifiants incorrects.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* noValidate pour laisser Zod gérer */}
            <div>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p role="alert" style={{ color: "crimson" }}>
                        {errors.email.message}
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
                    {...register("password")}
                    aria-invalid={!!errors.password}
                />
                {errors.password && (
                    <p role="alert" style={{ color: "crimson" }}>
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Erreur globale */}
            {errors.root && (
                <p role="alert" style={{ color: "crimson" }}>
                {errors.root.message}
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