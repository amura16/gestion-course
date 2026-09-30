import { useAuth } from "@/features/auth/providers/AuthProviders";

export function HomePage() {
    const {
        user,
        logout,
    } = useAuth();

    return (
        <main>
            <h1>
                Bienvenue {user?.name}
            </h1>

            <p>{user?.email}</p>

            <button onClick={() => void logout()}>
                Se déconnecter
            </button>
        </main>
    );
}