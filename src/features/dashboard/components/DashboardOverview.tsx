import { DashboardStats } from "./DashboardStats";
import { ExpenseChart } from "./ExpenseChart";
import type {DashboardOverviewProps} from "../types/dashboard.types";

export const DashboardOverview = ({stats, expenses}: DashboardOverviewProps) => {
    return (
        <section className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <DashboardStats stats={stats} />

            <ExpenseChart data={expenses} />
        </section>
    );
};