import {
    Clock3,
    Truck,
    CheckCircle2,
    Handshake,
    Wallet,
    CreditCard,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { StatCard } from "./StatCard";
import type { DashboardStatsProps } from "../types/dashboard.types";


export const DashboardStats = ({ stats }: DashboardStatsProps) => {
    const totalShipments =
        stats.pendingShipments +
        stats.ongoingShipments +
        stats.completedShipments;

    const getPercentage = (value: number) =>
        totalShipments > 0 ? (value / totalShipments) * 100 : 0;

    return (
        <Card
            title="Vue d'ensemble"
            description="Retrouvez rapidement l'état de vos courses et de vos paiements."
            className="h-full"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="border-b border-slate-100 sm:border-r">
                    <StatCard
                        title="Courses en attente"
                        value={stats.pendingShipments}
                        icon={Clock3}
                        iconClassName="bg-amber-50 text-amber-600"
                        percentage={getPercentage(stats.pendingShipments)}
                        gaugeColor="#D97706"
                    />
                </div>

                <div className="border-b border-slate-100">
                    <StatCard
                        title="Courses en cours"
                        value={stats.ongoingShipments}
                        icon={Truck}
                        iconClassName="bg-blue-50 text-blue-600"
                        percentage={getPercentage(stats.ongoingShipments)}
                        gaugeColor="#2563EB"
                    />
                </div>

                <div className="border-b border-slate-100 sm:border-r sm:border-b-0">
                    <StatCard
                        title="Courses terminées"
                        value={stats.completedShipments}
                        icon={CheckCircle2}
                        iconClassName="bg-emerald-50 text-emerald-600"
                        percentage={getPercentage(stats.completedShipments)}
                        gaugeColor="#059669"
                    />
                </div>

                <div>
                    <StatCard
                        title="Offres à examiner"
                        value={stats.pendingOffers}
                        icon={Handshake}
                        iconClassName="bg-violet-50 text-violet-600"
                        gaugeColor="#7C3AED"
                    />
                </div>
            </div>

            <div className="border-t border-slate-100 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4 transition-colors hover:bg-sky-50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm">
                                <Wallet size={19} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-500">
                                    Montant des courses en cours
                                </p>

                                <p className="mt-1 wrap-break-words text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                                    {new Intl.NumberFormat("fr-FR", {
                                        style: "currency",
                                        currency: "MGA",
                                        maximumFractionDigits: 0,
                                    }).format(stats.totalOngoingAmount)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4 transition-colors hover:bg-rose-50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-rose-500 shadow-sm">
                                <CreditCard size={19} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-500">
                                    Montant restant à payer
                                </p>

                                <p className="mt-1 wrap-break-words text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                                    {new Intl.NumberFormat("fr-FR", {
                                        style: "currency",
                                        currency: "MGA",
                                        maximumFractionDigits: 0,
                                    }).format(stats.remainingAmount)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};