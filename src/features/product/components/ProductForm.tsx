import { useForm } from "react-hook-form";
import { Package, Ruler, Weight, X } from "lucide-react";
import type { CreateProductData, ProductFormProps } from "../types/product.types";

export const ProductForm = ({onSubmit, onCancel, initialData, isSubmitting = false}: ProductFormProps) => {
    const emptyProduct = {
            description: "",
            poids: 0,
            longueur: 0,
            largeur: 0,
            hauteur: 0,
            origine: "",
    };

    const {register,handleSubmit, reset, formState: { errors }} = useForm<CreateProductData>({
        defaultValues: initialData ?? emptyProduct 
    });

    const handleFormSubmit = (data: CreateProductData) => {
        onSubmit(data);

        reset(emptyProduct);
    };

    const dimensions = [
        { id: "longueur", label: "Longueur" },
        { id: "largeur", label: "Largeur" },
        { id: "hauteur", label: "Hauteur" }
    ] as const;

    const inputClass = "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400";

    const labelClass = "text-sm font-medium text-slate-700";

    return (
        <div
            className="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/50 p-4"
            onClick={onCancel}
        >
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                onClick={(event) => event.stopPropagation()}
                className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl animate-slide-down"
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Package size={22} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-semibold text-slate-800">
                                {initialData
                                    ? "Modifier le produit"
                                    : "Ajouter un produit"}
                            </h2>

                            <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                                Renseignez les informations du produit.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        aria-label="Fermer le formulaire"
                        className="ml-3 shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Contenu scrollable */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="space-y-6 p-4 sm:p-6">

                        {/* Informations générales */}
                        <section className="space-y-4">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <Package size={17} className="text-blue-600" />
                                Informations générales
                            </h3>

                            <div>
                                <label
                                    htmlFor="description"
                                    className={labelClass}
                                >
                                    Description du produit *
                                </label>

                                <textarea
                                    id="description"
                                    rows={3}
                                    maxLength={500}
                                    placeholder="Décrivez le produit..."
                                    className={`${inputClass} resize-y`}
                                    {...register("description", {
                                        required:
                                            "La description est obligatoire.",
                                        validate: (value) =>
                                            value.trim().length > 0 ||
                                            "La description est obligatoire.",
                                    })}
                                />

                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="origine"
                                    className={labelClass}
                                >
                                    Origine *
                                </label>

                                <input
                                    id="origine"
                                    maxLength={150}
                                    placeholder="Ex. : Antananarivo, Madagascar"
                                    className={inputClass}
                                    {...register("origine", {
                                        required:
                                            "L'origine est obligatoire.",
                                        validate: (value) =>
                                            value.trim().length > 0 ||
                                            "L'origine est obligatoire.",
                                    })}
                                />

                                {errors.origine && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.origine.message}
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Dimensions et poids */}
                        <section className="space-y-4">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <Ruler
                                    size={17}
                                    className="text-blue-600"
                                />
                                Dimensions et poids
                            </h3>

                            <div>
                                <label
                                    htmlFor="poids"
                                    className={labelClass}
                                >
                                    Poids (kg) *
                                </label>

                                <div className="relative">
                                    <Weight
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="poids"
                                        type="number"
                                        min="0.01"
                                        step="any"
                                        placeholder="Ex. : 12.5"
                                        className={`${inputClass} pl-10 pr-12`}
                                        {...register("poids", {
                                            valueAsNumber: true,
                                            required:
                                                "Le poids est obligatoire.",
                                            min: {
                                                value: 0.01,
                                                message:
                                                    "Le poids doit être supérieur à 0.",
                                            },
                                        })}
                                    />

                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                                        kg
                                    </span>
                                </div>

                                {errors.poids && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.poids.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {dimensions.map(({ id, label }) => (
                                    <div key={id}>
                                        <label
                                            htmlFor={id}
                                            className={labelClass}
                                        >
                                            {label} (cm) *
                                        </label>

                                        <div className="relative">
                                            <input
                                                id={id}
                                                type="number"
                                                min="0.01"
                                                step="any"
                                                placeholder="0"
                                                className={`${inputClass} pr-12`}
                                                {...register(id, {
                                                    valueAsNumber: true,
                                                    required: `${label} est obligatoire.`,
                                                    min: {
                                                        value: 0.01,
                                                        message: `${label} doit être supérieure à 0.`,
                                                    },
                                                })}
                                            />

                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                                                cm
                                            </span>
                                        </div>

                                        {errors[id] && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors[id].message}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Enregistrement..."
                            : initialData
                            ? "Enregistrer les modifications"
                            : "Créer le produit"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};