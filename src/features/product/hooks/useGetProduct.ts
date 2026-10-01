import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/product.api"

export const useProduit = () => {
    return useQuery({
        queryKey: ["produit"],
        queryFn: getProducts
    })
}