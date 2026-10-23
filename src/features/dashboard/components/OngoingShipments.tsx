import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mockShipments } from "../data/shipments.mock";
import { ShipmentTrackingCard } from "./ShipmentTrackingCard";
import { ShipmentDetailsPanel } from "./ShipmentDetailsPanel";

export function OngoingShipments() {
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(
        null
    );

    const selectedShipment = mockShipments.find(
        (shipment) => shipment.id === selectedShipmentId
    );

    const isPanelOpen = Boolean(selectedShipment);

    return (
        <div className={`grid min-w-0 grid-cols-1 gap-6 ${isPanelOpen? "lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]": "grid-cols-1"}`}>
            {/* Grille des cartes */}
            <motion.div
                layout
                transition={{
                    layout: {
                        duration: 0.4,
                        ease: "easeInOut",
                    },
                }}
                className={`grid min-w-0 content-start items-start gap-4 ${isPanelOpen? "grid-cols-1 sm:grid-cols-2": "grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]"}`}
            >
                {mockShipments.map((shipment) => (
                    <motion.div
                        key={shipment.id}
                        layout
                        className="min-w-0 w-full"
                        transition={{
                            layout: {
                                duration: 0.4,
                                ease: "easeInOut",
                            },
                        }}
                    >
                        <ShipmentTrackingCard
                            shipment={shipment}
                            selected={shipment.id === selectedShipmentId}
                            onClick={() => setSelectedShipmentId(shipment.id)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Panneau de détails */}
            <AnimatePresence>
                {selectedShipment && (
                    <motion.div
                        key="shipment-details"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="min-w-0"
                    >
                        <ShipmentDetailsPanel
                            shipment={selectedShipment}
                            onClose={() => setSelectedShipmentId(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}