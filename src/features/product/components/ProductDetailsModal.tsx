import {Calendar, MapPin, Package, Pencil, Trash2, X} from "lucide-react";
import { statusLabels, statusStyles, type ProductDetailsModalProps } from "../types/product.types";

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function ProductDetailsModal({product, onClose, onEdit, onDelete}: ProductDetailsModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <p className="text-sm text-slate-500">
                            Détails du produit
                        </p>

                        <h2 className="text-xl font-bold text-slate-800">
                            {product.description}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fermer"
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4 p-5">
                    {/* Statut */}
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span className="text-sm font-medium text-slate-600">
                            Statut
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[product.status]}`}
                        >
                            {statusLabels[product.status]}
                        </span>
                    </div>

                    {/* Informations */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Volume */}
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                <Package size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Volume
                                </p>

                                <p className="font-semibold text-slate-800">
                                    {product.volume} m³
                                </p>
                            </div>
                        </div>

                        {/* Origine */}
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                                <MapPin size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Origine
                                </p>

                                <p className="font-semibold text-slate-800">
                                    {product.origine}
                                </p>
                            </div>
                        </div>

                        {/* Date création */}
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                                <Calendar size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Créé le
                                </p>

                                <p className="font-semibold text-slate-800">
                                    {formatDate(product.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Date modification */}
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                            <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
                                <Calendar size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Modifié le
                                </p>

                                <p className="font-semibold text-slate-800">
                                    {formatDate(product.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-between">
                    <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50`}
                    >
                        <Trash2 size={18} />
                        Supprimer
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                        >
                            Fermer
                        </button>

                        <button
                            type="button"
                            onClick={() => onEdit(product)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            <Pencil size={18} />
                            Modifier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}