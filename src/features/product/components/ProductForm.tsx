import { useState } from "react";
import type { CreateProductData } from "../types/product.types";
import { useCreateProduct } from "../hooks/useCreateProduct";

interface ProductFormProps {
    onCreated?: () => void;
}

export const ProductForm = ({ onCreated }: ProductFormProps) => {
    const [formData, setFormData] = useState<CreateProductData>({
        description: "",
        poids: 0,
        longueur: 0,
        largeur: 0,
        hauteur: 0,
        origine: "",
        status: ""
    });

    const createProduct = useCreateProduct();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                name === "poids" ||
                name === "longueur" ||
                name === "largeur" ||
                name === "hauteur"
                    ? Number(value)
                    : value
        }));
    }

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        createProduct.mutate(formData, {
            onSuccess: () => {
                setFormData({
                    description: "",
                    poids: 0,
                    longueur: 0,
                    largeur: 0,
                    hauteur: 0,
                    origine: "",
                    status: ""
                });

            }
        })
    }

    const isLoading = createProduct.isPending;
    const error = createProduct.error;
    

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 space-y-5"
        >
            <h2 className="text-xl font-semibold">
                Créer un produit
            </h2>

            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {error.message}
                </div>
            )}

            <div>
                <label className="block mb-1 font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description du produit"
                    required
                    className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">
                        Poids
                    </label>

                    <input
                        type="number"
                        name="poids"
                        value={formData.poids}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Origine
                    </label>

                    <input
                        type="text"
                        name="origine"
                        value={formData.origine}
                        onChange={handleChange}
                        placeholder="Ex: Madagascar"
                        required
                        className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Longueur
                    </label>

                    <input
                        type="number"
                        name="longueur"
                        value={formData.longueur}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Largeur
                    </label>

                    <input
                        type="number"
                        name="largeur"
                        value={formData.largeur}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Hauteur
                    </label>

                    <input
                        type="number"
                        name="hauteur"
                        value={formData.hauteur}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Sélectionner un status</option>
                        <option value="IN_STOCK">En stock</option>
                        <option value="SHIPPED">Expédié</option>
                        <option value="DELIVERED">Livré</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Création..." : "Créer le produit"}
            </button>
        </form>
    );
};