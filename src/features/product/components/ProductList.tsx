import { Pencil, Trash2 } from "lucide-react";
import type { Product, ProductListProps } from "../types/product.types";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const statusLabels = {
    IN_STOCK: "En stock",
    SHIPPED: "Expédié",
    DELIVERED: "Livré",
};

const statusStyles = {
    IN_STOCK: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-orange-100 text-orange-700",
    DELIVERED: "bg-emerald-100 text-emerald-700",
};

const formatDate = (date: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "short" }).format(new Date(date));

export const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleDelete = () => {
        if (productToDelete) {
            onDelete(productToDelete.id);
        }

        setProductToDelete(null);
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <tr>
                        <th className="px-5 py-4 font-semibold">Produit</th>
                        <th className="px-5 py-4 font-semibold">Volume</th>
                        <th className="px-5 py-4 font-semibold">Origine</th>
                        <th className="px-5 py-4 font-semibold">Date de création</th>
                        <th className="px-5 py-4 font-semibold">Dernier mise à jour</th>
                        <th className="px-5 py-4 font-semibold">Statut</th>
                        <th className="px-5 py-4 text-center font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {products.length > 0 ? products.map((product) => (
                        <tr key={product.id} className="transition-colors hover:bg-slate-50">
                            <td className="px-5 py-4 font-medium text-slate-800">{product.name}</td>
                            <td className="px-5 py-4 text-slate-600">{product.volume} m³</td>
                            <td className="px-5 py-4 text-slate-600">{product.origin}</td>
                            <td className="px-5 py-4 text-slate-600">{formatDate(product.createdAt)}</td>
                            <td className="px-5 py-4 text-slate-600">{formatDate(product.updatedAt)}</td>
                            <td className="px-5 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[product.status]}`}>
                                    {statusLabels[product.status]}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button type="button" onClick={() => onEdit(product)} aria-label={`Modifier ${product.name}`} className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                                        <Pencil size={18} />
                                    </button>
                                    <button type="button" onClick={() => setProductToDelete(product)} aria-label={`Supprimer ${product.name}`} className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                                Aucun produit trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ConfirmDialog
                isOpen={productToDelete !== null}
                title="Supprimer le produit ?"
                message={`Voulez-vous vraiment supprimer le produit « ${productToDelete?.name} » ? Cette action est irréversible.`}
                onCancel={() => setProductToDelete(null)}
                onConfirm={handleDelete}
            />
        </div>
    )
}
    
