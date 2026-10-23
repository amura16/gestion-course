import { ArrowRight, MapPin, Truck, Clock3 } from "lucide-react";
import type { ShipmentTrackingCardProps } from "../types/dashboard.types";

export const ShipmentTrackingCard = ({shipment, selected, onClick}: ShipmentTrackingCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full min-w-0 rounded-xl border p-4 text-left transition-colors ${
                selected
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium text-slate-500">
                        Référence
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900">
                        {shipment.reference}
                    </h3>
                </div>

                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                    En cours
                </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <MapPin size={18} />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                        {shipment.origin}
                    </p>
                    <p className="text-xs text-slate-500">Origine</p>
                </div>

                <ArrowRight size={18} className="shrink-0 text-slate-400" />

                <div className="min-w-0 flex-1 text-right">
                    <p className="truncate text-sm font-medium text-slate-800">
                        {shipment.destination}
                    </p>
                    <p className="text-xs text-slate-500">Destination</p>
                </div>
            </div>

            <div className="mt-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                        Progression estimée
                    </span>

                    <span className="text-xs font-semibold text-blue-600">
                        {shipment.progress} %
                    </span>
                </div>

                <div
                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-valuenow={shipment.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progression estimée de la course"
                >
                    <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${shipment.progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <div className="flex min-w-0 items-center gap-2 text-slate-500">
                    <Truck size={16} />
                    <span className="truncate text-xs">
                        {shipment.carrier}
                    </span>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 text-slate-500">
                    <Clock3 size={15} />
                    <span className="text-xs">
                        {shipment.estimatedArrival}
                    </span>
                </div>
            </div>
        </button>
    );
};