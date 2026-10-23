import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { mockShipments } from "../data/shipments.mock";
import { ShipmentTrackingCard } from "./ShipmentTrackingCard";
import { ShipmentDetailsPanel } from "./ShipmentDetailsPanel";

export function OngoingShipments() {
    const shipmentData = mockShipments.filter(
        (shipment) => shipment.status === "ASSIGNED"
    );

    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(
        null
    );

    const selectedShipment = shipmentData.find(
        (shipment) => shipment.id === selectedShipmentId
    );

    const isPanelOpen = Boolean(selectedShipment);

    const closePanel = () => setSelectedShipmentId(null);

    return (
        <>
            {/* Conteneur principal */}
            <div
                className={`grid min-w-0 grid-cols-1 items-start gap-6 ${
                    isPanelOpen
                        ? "md:grid-cols-[minmax(0,1.5fr)_minmax(260px,1fr)]"
                        : "grid-cols-1"
                }`}
            >
                {/* Grille des cartes */}
                <motion.div
                    layout
                    transition={{
                        layout: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    }}
                        className={`grid min-w-0 content-start items-start gap-4 ${
                            isPanelOpen
                                ? "grid-cols-1 sm:grid-cols-2"
                                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                        }`}
                >
                    {shipmentData.map((shipment) => (
                        <motion.div
                            key={shipment.id}
                            layout="position"
                            transition={{
                                layout: {
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            }}
                            className="w-full min-w-0"
                        >
                            <ShipmentTrackingCard
                                shipment={shipment}
                                selected={shipment.id === selectedShipmentId}
                                onClick={() =>
                                    setSelectedShipmentId((currentId) =>
                                        currentId === shipment.id
                                            ? null
                                            : shipment.id
                                    )
                                }
                            />
                        </motion.div>
                    ))}

                    {/* Aucune expédition */}
                    {shipmentData.length === 0 && (
                        <div className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center">
                            <p className="text-sm font-medium text-slate-600">
                                Aucune expédition en cours.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Vos expéditions affectées apparaîtront ici.
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Panneau latéral : tablette et ordinateur */}
                <div className="hidden min-w-0 md:block">
                    <AnimatePresence mode="wait">
                        {selectedShipment && (
                            <motion.div
                                key={selectedShipment.id}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 24 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                                className="min-w-0"
                            >
                                <ShipmentDetailsPanel
                                    shipment={selectedShipment}
                                    onClose={closePanel}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal de détails : mobile uniquement */}
            <AnimatePresence>
                {selectedShipment && (
                    <motion.div
                        key="shipment-modal"
                        className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 backdrop-blur-sm md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closePanel}
                    >
                        <motion.div
                            key={selectedShipment.id}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`Détails de l'expédition ${selectedShipment.reference}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(event) => event.stopPropagation()}
                            className="relative max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl"
                        >
                            {/* En-tête du modal */}
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-base font-semibold text-slate-900">
                                    Détails de l'expédition
                                </h2>

                                <button
                                    type="button"
                                    onClick={closePanel}
                                    aria-label="Fermer les détails"
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <ShipmentDetailsPanel
                                shipment={selectedShipment}
                                onClose={closePanel}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}