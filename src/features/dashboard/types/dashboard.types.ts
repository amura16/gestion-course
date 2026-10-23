import type { Shipment } from "@/features/shipment/types/shipment.types";
import type { LucideIcon } from "lucide-react";

export type StatCardProps = {
    title: string;
    value: number;
    icon: LucideIcon;
    iconClassName?: string;
    percentage?: number;
    gaugeColor?: string;
    onClick?: () => void;
};

export type DashboardSummary = {
    pendingShipments: number;
    ongoingShipments: number;
    completedShipments: number;
    pendingOffers: number;
    totalOngoingAmount: number;
    remainingAmount: number;
};

export type DashboardStatsProps = {
    stats: DashboardSummary;
};

export type ExpensePoint = {
    month: string;
    amount: number;
};

export type ExpenseChartProps = {
    data: ExpensePoint[];
};

export type Period = 6 | 12;

export type DashboardOverviewProps = {
    stats: DashboardSummary;
    expenses: ExpensePoint[];
};

export type ShipmentTrackingCardProps = {
    shipment: Shipment;
    selected: boolean;
    onClick: () => void;
};

export type ShipmentDetailsPanelProps = {
    shipment: Shipment;
    onClose: () => void;
};