import { MoveRight } from "lucide-react";
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";
import { OngoingShipments } from "@/features/dashboard/components/OngoingShipments";
import { PendingShipments } from "@/features/dashboard/components/PendingShipments";
import { CompletedShipments } from "@/features/dashboard/components/CompletedShipments";
import {dashboardExpenses,dashboardStats} from "@/features/dashboard/data/dashboard.mock";

export const DashboardPage = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">
                    Tableau de bord
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Suivez vos courses et maîtrisez vos dépenses.
                </p>
            </header>

            <DashboardOverview
                stats={dashboardStats}
                expenses={dashboardExpenses}
            />

            <div className="flex justify-between">
                <p className="mt-1 text-slate-500">
                    Suivez vos courses en cours.
                </p>
                <a className="text-primary font-manrope me-8 sm:flex shrink-0 items-center gap-2 hidden cursor-pointer">
                    Voir toutes les courses en cours 
                    <MoveRight size={16} color="#2563EB"/>
                </a>
            </div>

            <OngoingShipments />

            <p className="mt-1 text-slate-500">
                Vos courses en attente et vos courses terminées.
            </p>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <PendingShipments />

                <CompletedShipments />
            </section>
        </div>
    );
};