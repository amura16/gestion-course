import { Navigate } from "react-router";
import { LoginForm } from "../components/LoginFrom";
import { useAuthStore } from "../store/useAuthStore";

export function LoginPage() {
    const isLoading = useAuthStore((state) => (state.isLoading));
    const isAuthenticated = useAuthStore((state) => (state.isAuthenticated));

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (isAuthenticated) {
        return <Navigate to="/client/produit" replace />;
    }

    return (
        <main>
            <h1>Connexion</h1>

            <LoginForm />
        </main>
    );
}