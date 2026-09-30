import { Navigate } from "react-router";

import { LoginForm } from "@/features/auth/components/LoginForm.old";
import { useAuth } from "../providers/AuthProviders";

export function LoginPage() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <main>
            <h1>Connexion</h1>

            <LoginForm />
        </main>
    );
}