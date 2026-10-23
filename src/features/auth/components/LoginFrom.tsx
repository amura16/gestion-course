import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
} from "lucide-react";

import {
    loginSchema,
    type LoginFormData,
} from "../schemas/login.schema";

import { useAuthStore } from "../store/useAuthStore";

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
        } catch {
            setError("root", {
                message: "Identifiants incorrects. Veuillez réessayer.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
        >
            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Adresse e-mail
                </label>

                <div
                    className={`group flex items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 focus-within:ring-4 ${
                        errors.email
                            ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10"
                            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-500/10"
                    }`}
                >
                    <Mail
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 transition-colors ${
                            errors.email
                                ? "text-red-400"
                                : "text-slate-400 group-focus-within:text-blue-600"
                        }`}
                    />

                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="vous@exemple.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                            errors.email ? "email-error" : undefined
                        }
                        {...register("email")}
                        className="h-12 w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                </div>

                {errors.email && (
                    <p
                        id="email-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-600"
                    >
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Mot de passe */}
            <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700"
                    >
                        Mot de passe
                    </label>

                    <a
                        href="/forgot-password"
                        className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:text-sm"
                    >
                        Mot de passe oublié ?
                    </a>
                </div>

                <div
                    className={`group flex items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 focus-within:ring-4 ${
                        errors.password
                            ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10"
                            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-500/10"
                    }`}
                >
                    <LockKeyhole
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 transition-colors ${
                            errors.password
                                ? "text-red-400"
                                : "text-slate-400 group-focus-within:text-blue-600"
                        }`}
                    />

                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Entrez votre mot de passe"
                        aria-invalid={!!errors.password}
                        aria-describedby={
                            errors.password ? "password-error" : undefined
                        }
                        {...register("password")}
                        className="h-12 w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((visible) => !visible)
                        }
                        aria-label={
                            showPassword
                                ? "Masquer le mot de passe"
                                : "Afficher le mot de passe"
                        }
                        aria-pressed={showPassword}
                        className="flex shrink-0 cursor-pointer items-center justify-center text-slate-400 transition-colors hover:text-slate-700"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {errors.password && (
                    <p
                        id="password-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-600"
                    >
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Erreur globale */}
            {errors.root && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                    {errors.root.message}
                </div>
            )}

            {/* Bouton de connexion */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? (
                    <>
                        <span className="loader" aria-hidden="true" />
                        <span>Connexion...</span>
                    </>
                ) : (
                    <>
                        <span>Se connecter</span>

                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                )}
            </button>
        </form>
    );
}