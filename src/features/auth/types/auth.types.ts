export interface User {
    id: number;
    nom: string;
    prenom: string;
    phone: string;
    role: string;
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