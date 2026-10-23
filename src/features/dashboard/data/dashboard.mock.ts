import type { DashboardSummary } from "../types/dashboard.types";

export const dashboardStats: DashboardSummary = {
    pendingShipments: 5,
    ongoingShipments: 3,
    completedShipments: 12,
    pendingOffers: 8,
    totalOngoingAmount: 1_500_000,
    remainingAmount: 2_350_000,
};

export const dashboardExpenses = [
    { month: "Mai", amount: 180_000 },
    { month: "Juin", amount: 250_000 },
    { month: "Juil.", amount: 210_000 },
    { month: "Août", amount: 320_000 },
    { month: "Sept.", amount: 280_000 },
    { month: "Oct.", amount: 410_000 },
    { month: "Nov.", amount: 350_000 },
    { month: "Déc.", amount: 460_000 },
    { month: "Janv.", amount: 390_000 },
    { month: "Févr.", amount: 520_000 },
    { month: "Mars", amount: 440_000 },
    { month: "Avr.", amount: 610_000 },
];