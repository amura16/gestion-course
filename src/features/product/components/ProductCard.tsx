import { Card } from "@/components/ui/Card";
import { Package, Truck, CheckCircle, Boxes } from "lucide-react";

type ProductCardProps = {
    inStock: number;
    shipped: number;
    delivered: number;
};

export const ProductCard = ({ inStock, shipped, delivered }: ProductCardProps) => {
    const total = inStock + shipped + delivered;

    const products = [
        { title: "En stock", count: inStock, icon: Package, color: "bg-blue-500" },
        { title: "Expédiés", count: shipped, icon: Truck, color: "bg-orange-500" },
        { title: "Livrés", count: delivered, icon: CheckCircle, color: "bg-emerald-500" },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {products.map(({ title, count, icon: Icon, color }) => {
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                    <Card key={title}>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">{title}</p>
                            <Icon size={22} className="text-slate-400" />
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
                    <Boxes size={22} className="text-slate-400" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-800">{total}</p>
                <p className="mt-4 text-sm text-slate-500">Tous les produits</p>
            </Card>
        </div>
    );
};