import { api } from "@/lib/axios";
import type { CreateProductData, Product } from "../types/product.types";

export async function getProducts(): Promise<Product[] | null> {
    try {
        const response = await api.get<Product[]>("/product/client");

        if (!response.data) {
            throw new Error("Impossible de récupérer les produits");
        }

        return response.data;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export async function createProduct(data: CreateProductData): Promise<Product | null>  {
    try {
        const response = await api.post("/product", data);

        if (!response.data) {
            throw new Error("Impossible de créer le produit");
        }

        console.log(response);

        return response.data;
    } catch(error) {
        console.log(error);
        return null;
    }


}

export async function deleteProduct(id: Product["id"]) {
    try {
        await api.delete(`/product/${id}`);
    } catch(error) {
        console.log(error);
    }
    
}