import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateProductData } from "../types/product.types";
import { updateProduct } from "../api/product.api";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UpdateProductData) => updateProduct(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produit"] });
        },
    });
}