export interface Product {
    id: number;
    description: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    volume: number;
    origine: string;
    status: string;
    userId: number;
    shipmentId: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductData {
    description: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    origine: string;
    status: string
}