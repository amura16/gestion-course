import { Navigate } from "react-router";
import { Truck } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { LoginForm } from "../components/LoginFrom";

const LOGIN_BACKGROUND ="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=90";

export function LoginPage() {
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <span className="loader" aria-label="Chargement" />

                    <p className="text-sm font-medium text-slate-500">
                        Vérification de votre session...
                    </p>
                </div>
            </main>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/client/dashboard" replace />;
    }

    return (
        <main className="relative grid min-h-screen overflow-hidden bg-white lg:grid-cols-2">
            {/* Image de fond : mobile uniquement */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center lg:hidden"
                style={{
                    backgroundImage: `url("${LOGIN_BACKGROUND}")`,
                }}
            />

            {/* Voile sombre sur l'image mobile */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-slate-950/55 lg:hidden"
            />

            {/* Partie formulaire */}
            <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:px-12 xl:px-20">
                <div className="w-full max-w-md rounded-3xl border border-white/50 bg-white/95 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl sm:p-9 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
                    {/* Logo */}
                    <a
                        href="/"
                        aria-label="MGIT-DRIVE, accueil"
                        className="mb-10 inline-flex items-center gap-3"
                    >
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                            <Truck className="h-6 w-6" />
                        </span>

                        <span className="text-xl font-extrabold tracking-tight text-slate-900">
                            MGIT
                            <span className="text-blue-600">-DRIVE</span>
                        </span>
                    </a>

                    {/* En-tête */}
                    <div className="mb-8">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Bon retour parmi nous
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Connectez-vous
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Gérez vos expéditions et suivez vos livraisons
                            depuis un seul espace.
                        </p>
                    </div>

                    {/* Formulaire */}
                    <LoginForm />

                    {/* Inscription */}
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Vous n'avez pas encore de compte ?{" "}
                        <a
                            href="/register"
                            className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                        >
                            Créer un compte
                        </a>
                    </p>

                    {/* Pied de page */}
                    <p className="mt-8 text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} MGIT-DRIVE. Tous droits
                        réservés.
                    </p>
                </div>
            </section>

            {/* Partie visuelle : ordinateur et grand écran */}
            <section className="relative hidden min-h-screen overflow-hidden bg-slate-950 lg:block">
                {/* Image */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                        backgroundImage: `url("${LOGIN_BACKGROUND}")`,
                    }}
                />

                {/* Dégradé */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/10"
                />

                {/* Contenu visuel */}
                <div className="relative flex min-h-screen flex-col justify-between p-10 text-white xl:p-16">
                    <div className="flex items-center gap-2 self-end rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />

                        <span>Votre logistique, simplifiée</span>
                    </div>

                    <div className="max-w-xl pb-6">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                            <Truck className="h-4 w-4 text-cyan-300" />

                            <span>Une meilleure façon de livrer</span>
                        </div>

                        <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                            Chaque expédition
                            <br />
                            vous rapproche
                            <br />
                            de votre objectif.
                        </h2>

                        <p className="mt-5 max-w-md text-base leading-7 text-slate-200">
                            Centralisez vos expéditions, collaborez avec les
                            transporteurs et gardez le contrôle sur vos
                            livraisons.
                        </p>

                        <div className="mt-8 flex items-center gap-3">
                            <span className="h-1.5 w-8 rounded-full bg-cyan-400" />
                            <span className="h-1.5 w-3 rounded-full bg-white/50" />
                            <span className="h-1.5 w-3 rounded-full bg-white/50" />
                        </div>
                    </div>

                    <p className="text-xs text-slate-300">
                        Une plateforme pensée pour simplifier votre chaîne
                        logistique.
                    </p>
                </div>
            </section>
        </main>
    );
}