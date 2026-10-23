import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";
import { OngoingShipments } from "@/features/dashboard/components/OngoingShipments";
import { dashboardExpenses, dashboardStats } from "../data/dashboard.mock";


export const DashboardPage = () => (
    <div className="space-y-8">
        <header>
            <h1 className="text-2xl font-bold text-slate-900">
                Tableau de bord
            </h1>

            <p className="mt-1 text-sm text-slate-500">
                Suivez vos courses et maîtrisez vos dépenses.
            </p>
        </header>

        <DashboardOverview stats={dashboardStats} expenses={dashboardExpenses} />

        <OngoingShipments />
    </div>
);