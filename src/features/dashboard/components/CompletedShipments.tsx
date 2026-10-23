import { CheckCircle2, MapPin, Package } from "lucide-react";
import { mockShipments } from "../data/shipments.mock";

export function CompletedShipments() {
    const completedShipments = mockShipments.filter(
        (shipment) => shipment.status === "COMPLETED"
    );

    return (
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Expéditions terminées
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Vos dernières expéditions livrées
                    </p>
                </div>

                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-emerald-50 px-3 text-sm font-semibold text-emerald-600">
                    {completedShipments.length}
                </span>
            </div>

            <div className="space-y-3">
                {completedShipments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Package className="mb-2 h-8 w-8 text-slate-300" />

                        <p className="text-sm font-medium text-slate-600">
                            Aucune expédition terminée
                        </p>
                    </div>
                ) : (
                    completedShipments.map((shipment) => (
                        <div
                            key={shipment.id}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-slate-900">
                                        {shipment.reference}
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />

                                        <span className="truncate">
                                            {shipment.origin} →{" "}
                                            {shipment.destination}
                                        </span>
                                    </div>
                                </div>

                                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="text-xs text-slate-500">
                                    {new Date(
                                        shipment.createdAt
                                    ).toLocaleDateString("fr-FR")}
                                </span>

                                <span className="text-sm font-semibold text-slate-900">
                                    {shipment.amount.toLocaleString("fr-FR")}{" "}
                                    Ar
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}