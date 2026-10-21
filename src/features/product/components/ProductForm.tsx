import { useForm } from "react-hook-form";
import { Package, Ruler, Weight, X } from "lucide-react";

export interface CreateProductData {
    description: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    origine: string;
}

type ProductFormProps = {
    onSubmit: (data: CreateProductData) => void;
    onCancel: () => void;
    initialData?: CreateProductData;
    isSubmitting?: boolean;
};

export const ProductForm = ({
    onSubmit,
    onCancel,
    initialData,
    isSubmitting = false,
}: ProductFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductData>({
        defaultValues: initialData ?? {
            description: "",
            poids: 0,
            longueur: 0,
            largeur: 0,
            hauteur: 0,
            origine: "",
        },
    });

    const submitForm = (data: CreateProductData) => {
        onSubmit(data);
    };

    const inputClass =
        "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400";

    const labelClass = "text-sm font-medium text-slate-700";

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="w-full animate-slide-down overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Package size={22} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            {initialData
                                ? "Modifier le produit"
                                : "Ajouter un produit"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Renseignez les informations du produit.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    aria-label="Fermer le formulaire"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-6 p-6">
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
                                required: "La description est obligatoire.",
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
                                required: "L'origine est obligatoire.",
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

                <section className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <Ruler size={17} className="text-blue-600" />
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
                                    required: "Le poids est obligatoire.",
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
                        {(
                            [
                                {id: "longueur", label: "Longueur"},
                                {id: "largeur", label: "Largeur"},
                                {id: "hauteur", label: "Hauteur"}
                            ] as const
                        ).map(({ id, label }) => (
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

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
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
                          : "Créer le produit"}
                </button>
            </div>
        </form>
    );
};