import { Card } from "@/components/ui/Card";
import { Package, Truck, CheckCircle, Boxes } from "lucide-react";
import type { ProductCardProps } from "../types/product.types";

export const ProductCard = ({ inStock, shipped, delivered }: ProductCardProps) => {
    const total = inStock + shipped + delivered;

    const products = [
        { title: "En stock", count: inStock, icon: Package, color: "bg-blue-500", IconColor: "#2563EB" },
        { title: "Expédiés", count: shipped, icon: Truck, color: "bg-orange-500", IconColor: "black" },
        { title: "Livrés", count: delivered, icon: CheckCircle, color: "bg-emerald-500", IconColor: "green" },
    ];

    return (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {products.map(({ title, count, icon: Icon, color, IconColor }) => {
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                    <Card key={title}>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">{title}</p>
                            <Icon size={22} color={IconColor} className="text-slate-400" />
                        </div>
                        <p className="mt-3 text-3xl font-bold text-slate-800">{count}</p>
                        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{percentage}% du total</p>
                    </Card>
                );
            })}

            <Card>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">Total des produits</p>
                    <Boxes size={22} color="#7C3AED" className="text-slate-400" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-800">{total}</p>
                <p className="mt-4 text-sm text-slate-500">Tous les produits</p>
            </Card>
        </div>
    );
};