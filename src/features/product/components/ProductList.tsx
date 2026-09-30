import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product.types";

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadProducts() {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getProducts();

            setProducts(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Impossible de récupérer les produits"
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        void loadProducts();
    }, []);

    if (isLoading) {
        return <p>Chargement des produits...</p>;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
                {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg text-gray-500">
                Aucun produit trouvé.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md p-5"
                >
                    <h3 className="font-semibold text-lg mb-3">
                        {product.description}
                    </h3>

                    <div className="space-y-1 text-sm text-gray-600">
                        <p>
                            <strong>Poids :</strong>{" "}
                            {product.poids}
                        </p>

                        <p>
                            <strong>Dimensions :</strong>{" "}
                            {product.longueur} ×{" "}
                            {product.largeur} ×{" "}
                            {product.hauteur}
                        </p>

                        <p>
                            <strong>Volume :</strong>{" "}
                            {product.volume}
                        </p>

                        <p>
                            <strong>Origine :</strong>{" "}
                            {product.origine}
                        </p>

                        <p>
                            <strong>Status :</strong>{" "}
                            {product.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};