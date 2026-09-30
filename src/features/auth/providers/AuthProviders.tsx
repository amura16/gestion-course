import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
} from "@/features/auth/api/auth.api";

import type {
    LoginCredentials,
    User,
} from "@/features/auth/types/auth.types";

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Verifie si l'utilisateur est déjà connecter
    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        void loadUser();
    }, []);

    async function login(credentials: LoginCredentials) {
        const authenticatedUser = await loginRequest(credentials);

        setUser(authenticatedUser);
    }

    async function logout() {
        await logoutRequest();

        setUser(null);
    }

    const value: AuthContextValue = {
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider",
        );
    }

    return context;
}