import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "../components/ProductCard";
import { ProductList } from "../components/ProductList";
import type { CreateProductData, Product } from "../types/product.types";
import { ProductForm } from "../components/ProductForm";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { ProductDetailsModal } from "../components/ProductDetailsModal";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

const initialProducts: Product[] = [
    { id: 1, description: "Riz",longueur: 20, largeur: 5, hauteur: 4, volume: 25,poids: 5, origine: "Antananarivo", createdAt: "2026-10-01", updatedAt: "2026-10-15", status: "IN_STOCK" },
    { id: 2, description: "Vanille",longueur: 20, largeur: 5, hauteur: 4, volume: 10,poids: 5, origine: "Sambava", createdAt: "2026-10-05", updatedAt: "2026-10-18", status: "SHIPPED" },
    { id: 3, description: "Café",longueur: 20, largeur: 5, hauteur: 4, volume: 15,poids: 5, origine: "Fianarantsoa", createdAt: "2026-10-08", updatedAt: "2026-10-20", status: "DELIVERED" },
];

export function ProductPage() {
    const [formOpened, setFormOpened] = useState<boolean>(false);
    const [products, ] = useState<Product[]>(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const {mutate: createProductMutation, isPending: isCreating} = useCreateProduct();
    const {mutate: deleteProductMutation, isPending: isDeleting} = useDeleteProduct();
    const {mutate: updateProductMutation, isPending: isUpdating} = useUpdateProduct();

    const handleEdit = (product: Product) => {
        console.log(product);
        setProductToEdit(product);
        setFormOpened(true);
    };

    const handleSubmit = (data: CreateProductData) => {
        if (productToEdit) {
            updateProductMutation({
                id: productToEdit.id,
                ...data,
                status: productToEdit.status
            });
        } else {
            createProductMutation({
                ...data,
                status: "IN_STOCK",
            });
        }
    }

    const handleView = (product: Product) => {
        setSelectedProduct(product);
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
                        <Button 
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
                    <ProductForm
                        initialData={productToEdit ?? undefined}
                        onSubmit={handleSubmit}
                        isSubmitting={productToEdit ? isUpdating: isCreating}
                        onCancel={() => {
                            setFormOpened(false);
                            setProductToEdit(null);
                        }}
                    />
                )}

                { selectedProduct && (
                    <ProductDetailsModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onEdit={handleEdit}
                        onDelete={deleteProductMutation}
                    />
                )}
                <ProductList products={products} onEdit={handleEdit} onDelete={deleteProductMutation} onView={handleView} isPending={isDeleting}/>
            </div>
        </div>
    );
}