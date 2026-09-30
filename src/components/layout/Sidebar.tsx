import { NavLink } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { ButtonGlobal } from "../ui/Button"


const navigations = [
    {
        path: "ensemble",
        name: "Vue d'ensemble"
    },
    {
        path: "demande",
        name: "Mes demandes"
    },
    {
        path: "course",
        name: "Courses en cours"
    },
    {
        path: "offre",
        name: "Offres & Comparateur"
    },
    {
        path: "véhicule",
        name: "Véhicules"
    },
    {
        path: "historique",
        name: "Historique & factures"
    },
    {
        path: "product",
        name: "Produits"
    }
]

export const Sidebar = () => {
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
                        {navigations.map((nav) => (
                            <NavLink
                                key={nav.path}
                                className={({ isActive }) =>
                                    `block my-3 p-2 ${
                                        isActive
                                            ? "bg-white rounded-md"
                                            : ""
                                    }`
                                }
                                to={nav.path}
                            >
                                {nav.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            {/* Déconnexion */}
            <div className="shrink-0 px-4 mb-8">
                <button className="rounded-md p-2 shadow-md w-full">
                    Déconnexion
                </button>
            </div>

        </div>
    );
};