import { useEffect, useState } from "react";
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
import { useGetProduct } from "../hooks/useGetProduct";

export function ProductPage() {
    const {data, isPending: isLoading, isError} = useGetProduct();

    if (isError) {
        console.log(isError);
    }

    const products = data ?? []

    const {mutate: createProductMutation, isPending: isCreating} = useCreateProduct();
    const {mutate: deleteProductMutation, isPending: isDeleting} = useDeleteProduct();
    const {mutate: updateProductMutation, isPending: isUpdating} = useUpdateProduct();

    const [formOpened, setFormOpened] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [inStockCount, setInStockCount] = useState<number>(0);
    const [shippedCount, setShippedCount] = useState<number>(0);
    const [deliveredCount, setDeliveredCount] = useState<number>(0);

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

    useEffect(() => {
        setInStockCount(() => products.filter((product) => product.status === "IN_STOCK").length);
        setShippedCount(() => products.filter((product) => product.status === "SHIPPED").length);
        setDeliveredCount(() => products.filter((product) => product.status === "DELIVERED").length);
    }, [products]);

    useEffect(()=> {
        if (!isCreating || !isUpdating) {
            setFormOpened(false);
        }
    }, [isCreating, isUpdating])

    return (
        <div>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold text-slate-800">Gestion des produits</h1>
                <ProductCard inStock={inStockCount} shipped={shippedCount} delivered={deliveredCount} />
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
                <ProductList products={products} isLoading={isLoading} onEdit={handleEdit} onDelete={deleteProductMutation} onView={handleView} isPending={isDeleting}/>
            </div>
        </div>
    );
}