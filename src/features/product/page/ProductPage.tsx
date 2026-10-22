import { useState } from "react";
import { Plus } from "lucide-react";
import { ButtonGlobal } from "@/components/ui/Button";
import { ProductCard } from "../components/ProductCard";
import { ProductList } from "../components/ProductList";
import type { Product } from "../types/product.types";
import { ProductForm } from "../components/ProductForm";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useCreateProduct } from "../hooks/useCreateProduct";

const initialProducts: Product[] = [
    { id: 1, name: "Riz", volume: 25, origin: "Antananarivo", createdAt: "2026-10-01", updatedAt: "2026-10-15", status: "IN_STOCK" },
    { id: 2, name: "Vanille", volume: 10, origin: "Sambava", createdAt: "2026-10-05", updatedAt: "2026-10-18", status: "SHIPPED" },
    { id: 3, name: "Café", volume: 15, origin: "Fianarantsoa", createdAt: "2026-10-08", updatedAt: "2026-10-20", status: "DELIVERED" },
];

export function ProductPage() {
    const [formOpened, setFormOpened] = useState<boolean>(false);
    const [products, ] = useState<Product[]>(initialProducts);

    const {mutate: createProductMutation} = useCreateProduct();
    const {mutate: deleteProductMutation} = useDeleteProduct();

    const handleEdit = (product: Product) => {
        console.log("Modifier :", product);
    };

    return (
        <div>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold text-slate-800">Gestion des produits</h1>
                <ProductCard inStock={1} shipped={1} delivered={1} />
            </div>
            <div className="space-y-6 p-6">
                <div className="flex gap-5 items-center">
                    <h1 className="text-2xl font-bold text-slate-800 shrink-0">Liste des produits</h1>
                    <div>
                        <ButtonGlobal 
                            variant="primary"
                            size="medium"
                            content={
                                <div className="flex gap-4 md:gap-2 items-center justify-center">
                                    <Plus size={24}/>
                                    <p className="text-start hidden md:block md:text-sm font-manrope">Ajouter une nouvelle produit</p>
                                </div>
                            }
                            onClick={() => setFormOpened(true)}
                        />
                    </div>
                </div>
                {formOpened && (
                    <div className="p-6">
                        <ProductForm onSubmit={createProductMutation} onCancel={() => setFormOpened(false)} />
                    </div>
                )}
                <ProductList products={products} onEdit={handleEdit} onDelete={deleteProductMutation} />
            </div>
        </div>
    );
}