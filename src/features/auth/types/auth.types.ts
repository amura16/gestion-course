export type Role = "CLIENT" | "CARRIER" | "ADMIN"

export interface User {
    id: number;
    nom: string;
    prenom: string;
    phone: string;
    role: Role;
    email: string;
    createdAt: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
}