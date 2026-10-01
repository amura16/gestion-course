import { api } from "@/lib/axios";

import type {
    LoginCredentials,
    LoginResponse,
    User,
} from "@/features/auth/types/auth.types";

export const login = async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post<LoginResponse>(
        "/user/login",
        credentials,
    );

    return response.data.user;
}

export const getCurrentUser = async () : Promise<User> =>  {
    const response = await api.get<User>("/user/me");

    console.log("getcurrent", response.data)

    return response.data;
}

export const logout = async () : Promise<void> => {
    await api.get("/user/logout");
}