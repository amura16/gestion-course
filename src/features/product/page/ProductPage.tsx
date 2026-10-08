import { useState } from "react";

import { ProductForm } from "../components/ProductForm";
import { ProductList } from "../components/ProductList";
import { ProductTabs } from "../components/ProductTabs";

export const ProductPage = () => {
    const [isActive, setIsActive] = useState<"produits" | "creer">(
        "produits"
    );

    return (
        <div className="w-full min-h-full p-4">
            <ProductTabs
                activeTab={isActive}
                onChange={setIsActive}
            />

            <div className="w-full mt-4">
                {isActive === "produits" && <ProductList />}

                {isActive === "creer" && (
                    <ProductForm />
                )}
            </div>
        </div>
    );
};