import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";
import { OngoingShipments } from "@/features/dashboard/components/OngoingShipments";
import { PendingShipments } from "@/features/dashboard/components/PendingShipments";
import { CompletedShipments } from "@/features/dashboard/components/CompletedShipments";
import {
    dashboardExpenses,
    dashboardStats,
} from "@/features/dashboard/data/dashboard.mock";

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

            <p className="mt-1 text-sm text-slate-500">
                Suivez vos courses en cours.
            </p>

            <OngoingShipments />

            <p className="mt-1 text-sm text-slate-500">
                Vos courses en attente et courses terminées.
            </p>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <PendingShipments />

                <CompletedShipments />
            </section>
        </div>
    );
};