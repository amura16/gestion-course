export type Product = {
    id: number;
    name: string;
    volume: number;
    origin: string;
    createdAt: string;
    updatedAt: string;
    status: "IN_STOCK" | "SHIPPED" | "DELIVERED";
};

export interface CreateProductData {
    description: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    origine: string;
    status: string
}