import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateProductData } from "../types/product.types";
import { createProduct } from "../api/product.api";


export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateProductData) => createProduct(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produit"] });
        },
    });
}