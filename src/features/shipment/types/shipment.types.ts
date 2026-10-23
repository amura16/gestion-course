export type ShipmentStatus = "PENDING" | "ASSIGNED" | "COMPLETED" | "CANCELED";

export type Shipment = {
    id: string;
    reference: string;
    origin: string;
    destination: string;
    carrier: string;
    status: ShipmentStatus;
    progress: number;
    estimatedArrival: string;
    amount: number;
    createdAt: string;
};