import {createProduct as createProductApi, getProducts as getProductsApi} from "../api/product.api";

import type {CreateProductData, Product} from "../types/product.types";

export async function getProducts(): Promise<Product[]> {
    try {
        return await getProductsApi();
    } catch (error) {
        console.error("Erreur récupération produits :", error);
        throw error;
    }
}

export async function createProduct(
    data: CreateProductData
): Promise<Product> {
    try {
        return await createProductApi(data);
    } catch (error) {
        console.error("Erreur création produit :", error);
        throw error;
    }
}