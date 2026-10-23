import { Clock3, MapPin, Package } from "lucide-react";
import { mockShipments } from "../data/shipments.mock";

export function PendingShipments() {
    const pendingShipments = mockShipments.filter(
        (shipment) => shipment.status === "PENDING"
    );

    return (
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Expéditions en attente
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Expéditions en attente d'affectation
                    </p>
                </div>

                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-amber-50 px-3 text-sm font-semibold text-amber-600">
                    {pendingShipments.length}
                </span>
            </div>

            <div className="space-y-3">
                {pendingShipments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Package className="mb-2 h-8 w-8 text-slate-300" />

                        <p className="text-sm font-medium text-slate-600">
                            Aucune expédition en attente
                        </p>
                    </div>
                ) : (
                    pendingShipments.map((shipment) => (
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

                                <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                                    En attente
                                </span>
                            </div>

                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                <Clock3 className="h-3.5 w-3.5" />

                                <span>
                                    Créée le{" "}
                                    {new Date(
                                        shipment.createdAt
                                    ).toLocaleDateString("fr-FR")}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}