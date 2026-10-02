import { NavLink, useNavigate } from "react-router"
import Logo from "../../assets/logo.png"
import { ButtonGlobal } from "../ui/Button"
import { LayoutDashboard, Truck, Handshake, History, Package, LogOut, type LucideIcon, Car} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEspace } from "@/store/useEspace";
import type { Role } from "@/features/auth/types/auth.types";

type Navigation = {
    path: string,
    name: string,
    icon: LucideIcon
}

const navigations: Record<Role, Navigation[]> = {
    CLIENT: [
        {
            path: "ensemble",
            name: "Vue d'ensemble",
            icon: LayoutDashboard
        },
        {
            path: "course",
            name: "Courses en cours",
            icon: Truck
        },
        {
            path: "offre",
            name: "Offres & Comparateur",
            icon: Handshake
        },
        {
            path: "historique",
            name: "Historique & factures",
            icon: History
        },
        {
            path: "produit",
            name: "Produits",
            icon: Package
        }
    ],
    CARRIER: [
        {
            path: "ensemble",
            name: "Vue d'ensemble",
            icon: Package
        },
        {
            path: "vehicule",
            name: "Véhicule",
            icon: Car
        },
        {
            path: "course",
            name: "Voir les courses disponibles",
            icon: Truck
        },
        {
            path: "offres",
            name: "Voir les offres proposés",
            icon: Handshake
        }
    ],
    ADMIN: []
};

export const Sidebar = () => {

    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    const espace = useEspace((state) => state.espace);

    const rolePath = {
        CLIENT: "client",
        CARRIER: "carrier",
        ADMIN: "admin"
    }

    const logoutClick = async () => {

        logout();

        navigate("/login");

        console.log("logout");
    }

    return (
        <div className="h-screen w-full flex flex-col">

            {/* Logo */}
            <div className="h-18 shrink-0 w-full flex justify-between items-center gap-4 px-4 shadow-md">
                <img
                    src={Logo}
                    alt="logo"
                    className="w-12 h-10"
                />

                <h1 className="font-bold h-10 w-full flex items-center text-neutral">
                    MGIT-DRIVE
                </h1>
            </div>

            {/* Nouvelle demande */}
            <div className="shrink-0 w-full flex flex-col items-center pt-4">
                <ButtonGlobal
                    content="nouvelle demande"
                    size="large"
                    variant="primary"
                />
            </div>

            {/* Navigation */}
            <div className="flex-1 min-h-0 w-full mt-6 px-4 overflow-y-auto">

                <p className="text-gray-400 text-sm">
                    NAVIGATION
                </p>

                <div className="flex justify-center mt-2 ps-0 lg:ps-10">
                    <div className="w-full">
                        {navigations[espace].map((nav) => {
                            const Icon = nav.icon;

                            return (
                                <NavLink
                                    key={nav.path}
                                    className={({ isActive }) => `flex gap-3 items-center my-3 p-2 ${isActive? "bg-white rounded-md": ""}`}
                                    to={`/${rolePath[espace]}/${nav.path}`}
                                >
                                    <Icon size={20} />
                                    <span>{nav.name}</span>
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Déconnexion */}
            <div className="shrink-0 px-4 mb-20 md:mb-8">
                <button 
                    className="rounded-md p-2 shadow-md w-full flex justify-center items-center" 
                    onClick={logoutClick}
                >
                    <LogOut size={16} className="me-4"/> Déconnexion
                </button>
            </div>

        </div>
    );
};