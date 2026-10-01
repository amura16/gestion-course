import { useProduit } from "../hooks/useGetProduct";
import type { Product } from "../types/product.types";

export const ProductList = () => {

    const { data, isPending, isError, error } = useProduit();

    if (isPending) {
        return <p>Chargement des produits...</p>;
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
                {error.message}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg text-gray-500">
                Aucun produit trouvé.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((product: Product) => (
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

                        <div className="w-full mt-4 flex justify-between">
                            <button className="p-2 border rounded-md">
                                modifier
                            </button>

                            <button className="p-2 border rounded-md bg-red-600 text-white">
                                supprimer
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};