import type { ConfirmDialogProps } from "@/features/product/types/product.types";
import { AlertTriangle, X } from "lucide-react";

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, isPending }: ConfirmDialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                            <AlertTriangle size={20} />
                        </div>

                        <h2 className="font-semibold text-slate-800">
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        aria-label="Fermer"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-5">
                    <p className="text-sm leading-6 text-slate-500">
                        {message}
                    </p>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`rounded-lg ${isPending?"bg-slate-500": "bg-red-600"}  px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700`}
                    >
                        {isPending?"Supprimer...": "Supprimer"}
                    </button>
                </div>
            </div>
        </div>
    );
};