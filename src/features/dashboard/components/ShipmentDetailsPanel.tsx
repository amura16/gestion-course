import {
    X,
    MapPin,
    Truck,
    Clock3,
    Wallet,
    CalendarDays,
} from "lucide-react";
import type { ShipmentDetailsPanelProps } from "../types/dashboard.types";


const formatAmount = (amount: number) =>
    new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "MGA",
        maximumFractionDigits: 0,
    }).format(amount);

export const ShipmentDetailsPanel = ({
    shipment,
    onClose,
}: ShipmentDetailsPanelProps) => {
    return (
        <aside className="h-fit rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
                <div>
                    <p className="text-xs font-medium text-slate-500">
                        Détails de la course
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {shipment.reference}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer les détails"
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="space-y-5 p-5">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        Course en cours
                    </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                            <MapPin size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-500">Départ</p>
                            <p className="mt-1 font-medium text-slate-800">
                                {shipment.origin}
                            </p>
                        </div>
                    </div>

                    <div className="ml-4 my-3 h-6 border-l-2 border-dashed border-slate-300" />

                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                            <MapPin size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-500">
                                Destination
                            </p>
                            <p className="mt-1 font-medium text-slate-800">
                                {shipment.destination}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                            Progression estimée
                        </span>

                        <span className="font-semibold text-blue-600">
                            {shipment.progress} %
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${shipment.progress}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Truck size={18} className="mt-0.5 text-slate-400" />

                        <div>
                            <p className="text-xs text-slate-500">
                                Transporteur
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-800">
                                {shipment.carrier}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Clock3 size={18} className="mt-0.5 text-slate-400" />

                        <div>
                            <p className="text-xs text-slate-500">
                                Arrivée estimée
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-800">
                                {shipment.estimatedArrival}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Wallet size={18} className="mt-0.5 text-slate-400" />

                        <div>
                            <p className="text-xs text-slate-500">
                                Montant de la course
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                {formatAmount(shipment.amount)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <CalendarDays
                            size={18}
                            className="mt-0.5 text-slate-400"
                        />

                        <div>
                            <p className="text-xs text-slate-500">
                                Date de création
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-800">
                                {new Date(shipment.createdAt).toLocaleDateString(
                                    "fr-FR",
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};