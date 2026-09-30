import { useState } from "react";
import { Card } from "../../../components/ui/Card";

export const ProductPage = () => {

    const [isActive, setIsActive] = useState<"produits" | "courses">("produits");

    return (
        <div className="w-full min-h-full p-4">
            <div className="w-full flex gap-4">
                <Card 
                    content="Produits" 
                    isActive={"produits" === isActive} 
                    onClick={() => setIsActive("produits")}
                />

                <Card 
                    content="Courses" 
                    isActive={"courses" === isActive} 
                    onClick={() => setIsActive("courses")}
                />
            </div>

            <div className="w-full mt-4">

            </div>
        </div>
    );
};

