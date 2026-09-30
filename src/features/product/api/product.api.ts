import type { CreateProductData, Product } from "../types/product.types";

interface GetProductsResponse {
    data: Product[];
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product/client`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Impossible de récupérer les produits");
    }

    const result: GetProductsResponse = await response.json();

    return result.data;
}

export async function createProduct(
    data: CreateProductData
): Promise<Product> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.message ?? "Impossible de créer le produit"
        );
    }

    console.log(response);

    return response.json();
}