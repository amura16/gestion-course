import { NavLink, useNavigate } from "react-router";
import Logo from "../../assets/logo.png";
import { Button } from "../ui/Button";
import {LayoutDashboard, Truck, Handshake, History, Package, LogOut, type LucideIcon, Car, Zap, X,} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEspace } from "@/store/useEspace";
import type { Role } from "@/features/auth/types/auth.types";
import { EspaceToogle } from "../ui/EspaceToogle";

type Navigation = {
    path: string;
    name: string;
    icon: LucideIcon;
};

type SidebarProps = {
    onClose: () => void;
};

const navigations: Record<Role, Navigation[]> = {
    CLIENT: [
        {
            path: "ensemble",
            name: "Vue d'ensemble",
            icon: LayoutDashboard,
        },
        {
            path: "course",
            name: "Courses en cours",
            icon: Truck,
        },
        {
            path: "offre",
            name: "Offres & Comparateur",
            icon: Handshake,
        },
        {
            path: "historique",
            name: "Historique & factures",
            icon: History,
        },
        {
            path: "produit",
            name: "Produits",
            icon: Package,
        },
    ],

    CARRIER: [
        {
            path: "ensemble",
            name: "Vue d'ensemble",
            icon: Package,
        },
        {
            path: "vehicule",
            name: "Véhicule",
            icon: Car,
        },
        {
            path: "course",
            name: "Voir les courses disponibles",
            icon: Truck,
        },
        {
            path: "offres",
            name: "Voir les offres proposés",
            icon: Handshake,
        },
    ],

    ADMIN: [],
};

export const Sidebar = ({onClose}: SidebarProps) => {

    const navigate = useNavigate();

    const logout = useAuthStore(
        (state) => state.logout
    );

    const espace = useEspace(
        (state) => state.espace
    );

    const rolePath: Record<Role, string> = {
        CLIENT: "client",
        CARRIER: "carrier",
        ADMIN: "admin",
    };

    const logoutClick = async () => {
        logout();
        navigate("/login");
        onClose();
    };

    return (
        <aside className={`fixed left-0 top-0 z-60 flex h-screen w-full flex-col bg-white shadow-xl md:shadow-md`}>
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">

                <div className="flex min-w-0 items-center gap-3">
                    <img
                        src={Logo}
                        alt="Logo MGIT-DRIVE"
                        className="h-10 w-10 shrink-0 object-contain"
                    />

                    <h1 className="truncate text-lg font-bold tracking-tight text-slate-800">
                        MGIT-DRIVE
                    </h1>
                </div>

                {/* Fermer */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer le menu"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                >
                    <X size={20} />
                </button>

            </div>

            {/* Contenu */}
            <div className="flex min-h-0 flex-1 flex-col">

                {/* Nouvelle demande */}
                <div className="w-full shrink-0 px-3 pt-5">

                    <Button
                        size="large"
                        variant="primary"
                        content={
                            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                                <Zap
                                    size={20}
                                    className="shrink-0"
                                />

                                <span className="font-semibold">
                                    Nouvelle demande
                                </span>
                            </div>
                        }
                    />

                </div>

                {/* Navigation */}
                <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-7">

                    <p className="px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        Navigation
                    </p>

                    <nav className="mt-3 space-y-1">

                        {navigations[espace].map((nav) => {

                            const Icon = nav.icon;

                            return (
                                <NavLink
                                    key={nav.path}
                                    to={`/${rolePath[espace]}/${nav.path}`}
                                    onClick={() => {
                                        // Sur mobile, on ferme après navigation.
                                        if (window.innerWidth < 768) {
                                            onClose();
                                        }
                                    }}
                                    className={({ isActive }) =>
                                        `
                                        group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200
                                        ${isActive? 
                                            `bg-blue-500/10 font-bold text-blue-700 shadow-sm` : 
                                            `font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-0.5`}
                                        `
                                    }
                                >

                                    {({ isActive }) => (
                                        <>
                                            <span
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200
                                                    ${
                                                        isActive
                                                            ? "bg-blue-500/15 text-blue-600" : 
                                                            "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-700"
                                                    }
                                                `}
                                            >
                                                <Icon size={19} />
                                            </span>

                                            <span className="truncate">
                                                {nav.name}
                                            </span>
                                        </>
                                    )}

                                </NavLink>
                            );
                        })}

                    </nav>

                    <div className="pt-7 flex justify-center lg:hidden">
                        <EspaceToogle />
                    </div>
                </div>

                {/* Déconnexion */}
                <div className="shrink-0 border-t border-slate-100 px-3 pb-6 pt-4">

                    <button
                        type="button"
                        className=" group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 p-3 font-medium text-slate-600 transition-all duration-200 hover:border-red-100 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
                        onClick={logoutClick}
                    >
                        <LogOut
                            size={17}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />

                        Déconnexion
                    </button>

                </div>

            </div>

        </aside>
    );
};