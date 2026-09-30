interface ProductTabsProps {
    activeTab: "produits" | "creer";
    onChange: (tab: "produits" | "creer") => void;
}

export const ProductTabs = ({activeTab,onChange}: ProductTabsProps) => {
    return (
        <div className="w-full flex gap-4 bg-gray-200 p-2 rounded-lg">
            <button
                type="button"
                onClick={() => onChange("produits")}
                className={`flex-1 py-3 rounded-md font-medium transition ${
                    activeTab === "produits"
                        ? "bg-white text-blue-600 shadow"
                        : "text-gray-600 hover:bg-white/50"
                }`}
            >
                Produits
            </button>

            <button
                type="button"
                onClick={() => onChange("creer")}
                className={`flex-1 py-3 rounded-md font-medium transition ${
                    activeTab === "creer"
                        ? "bg-white text-blue-600 shadow"
                        : "text-gray-600 hover:bg-white/50"
                }`}
            >
                Créer produit
            </button>
        </div>
    );
};