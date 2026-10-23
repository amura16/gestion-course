import { Pencil, Trash2 } from "lucide-react";
import { statusLabels, statusStyles, type Product, type ProductListProps } from "../types/product.types";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Loader } from "@/components/ui/Loader";

const formatDate = (date: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "short" }).format(new Date(date));

export const ProductList = ({ products, onEdit, onDelete, onView, isPending, isLoading }: ProductListProps) => {
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleDelete = () => {
        if (productToDelete) {
            onDelete(productToDelete.id);
        }
    }

    useEffect(() => {
        if (!isPending){
            setProductToDelete(null);
        }
    }, [isPending])

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <tr>
                        {/* Toujours visible */}
                        <th className="px-3 py-4 font-semibold sm:px-5">
                            Produit
                        </th>

                        <th className="px-3 py-4 font-semibold sm:px-5">
                            Volume
                        </th>

                        {/* Mobile : caché */}
                        <th className="hidden px-5 py-4 font-semibold md:table-cell">
                            Origine
                        </th>

                        <th className="hidden px-5 py-4 font-semibold md:table-cell">
                            Date de création
                        </th>

                        <th className="px-3 py-4 font-semibold sm:px-5">
                            Statut
                        </th>

                        <th className="px-3 py-4 text-center font-semibold sm:px-5">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="px-5 py-4">
                                <Loader />
                            </td>
                        </tr>
                    ) :products.length > 0 ? (
                        products.map((product) => (
                            <tr
                                key={product.id}
                                className="cursor-pointer transition-colors hover:bg-slate-50"
                            >
                                {/* Produit */}
                                <td className="px-3 py-4 font-medium text-slate-800 sm:px-5">
                                    {product.description}
                                </td>

                                {/* Volume */}
                                <td className="px-3 py-4 text-slate-600 sm:px-5">
                                    {product.volume} cm³
                                </td>

                                {/* Origine : desktop uniquement */}
                                <td className="hidden px-5 py-4 text-slate-600 md:table-cell">
                                    {product.origine}
                                </td>

                                {/* Date : desktop uniquement */}
                                <td className="hidden px-5 py-4 text-slate-600 md:table-cell">
                                    {formatDate(product.createdAt)}
                                </td>

                                {/* Statut */}
                                <td className="px-3 py-4 sm:px-5">
                                    <span
                                        className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium sm:px-3 ${statusStyles[product.status]}`}
                                    >
                                        {statusLabels[product.status]}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-3 py-4 sm:px-5">
                                    <div className="flex items-center justify-center gap-2">

                                        {/* Mobile : Voir uniquement */}
                                        <button
                                            type="button"
                                            onClick={() => onView(product)}
                                            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 md:hidden cursor-pointer"
                                        >
                                            Voir
                                        </button>

                                        {/* Desktop : Modifier + Supprimer */}
                                        <div className="hidden items-center justify-center gap-2 md:flex">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(product)}
                                                aria-label={`Modifier ${product.description}`}
                                                className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setProductToDelete(product)}
                                                aria-label={`Supprimer ${product.description}`}
                                                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-5 py-10 text-center text-slate-500"
                            >
                                Aucun produit trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ConfirmDialog
                isOpen={productToDelete !== null}
                title="Supprimer le produit ?"
                message={`Voulez-vous vraiment supprimer le produit « ${productToDelete?.description} » ? Cette action est irréversible.`}
                onCancel={() => setProductToDelete(null)}
                onConfirm={handleDelete}
                isPending={isPending}
            />
        </div>
    )
}
    
