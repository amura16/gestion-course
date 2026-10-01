import { create } from "zustand";

import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
} from "@/features/auth/api/auth.api";

import type {
    LoginCredentials,
    User,
} from "@/features/auth/types/auth.types";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    // Actions
    initialize: () => Promise<void>;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,

    initialize: async () => {
        try {
            const currentUser = await getCurrentUser();
            set({
                user: currentUser,
                isAuthenticated: currentUser !== null,
                isLoading: false,
            });
        } catch {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },

    login: async (credentials) => {
        const authenticatedUser = await loginRequest(credentials);

        set({
            user: authenticatedUser,
            isAuthenticated: true,
        });
    },

    logout: async () => {
        await logoutRequest();

        set({
            user: null,
            isAuthenticated: false,
        });
    },
}));