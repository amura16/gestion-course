import Logo from "../../assets/logo.png"
import { ButtonGlobal } from "../ui/Button"

const navigations = [
    {
        path: "/ensemble",
        name: "Vue d'ensemble"
    },
    {
        path: "/demande",
        name: "Mes demandes"
    },
    {
        path: "/course",
        name: "Courses en cours"
    },
    {
        path: "/offre",
        name: "Offres & Comparateur"
    },
    {
        path: "/véhicule",
        name: "Véhicules"
    },
    {
        path: "/historique",
        name: "Historique & factures"
    },
    {
        path: "/telematique",
        name: "Télématique"
    }
]

export const Sidebar = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-18 w-full flex justify-between items-center gap-4 px-4 shadow-md">
                <img src={Logo} alt="logo" className="w-12 h-10"/>

                <h1 className="font-bold h-10 w-full flex items-center text-neutral">
                    MGIT-DRIVE
                </h1>
            </div>

            <div className="w-full flex flex-col items-center pt-4">
                <ButtonGlobal 
                    content="nouvelle demande"
                    size="large"
                    variant="primary"
                />
            </div>

            <div className="w-full mt-6 px-4">
                <p 
                    className="text-gray-400 text-sm"
                >
                    NAVIGATION
                </p>

                <div className="flex justify-center mt-2 ">
                    <ul>
                        {
                            navigations.map((nav) => {
                                return (
                                <li 
                                    key={nav.path}
                                    className="my-3"
                                >
                                    <a href={nav.path}>{nav.name}</a>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="mt-auto bottom-0 flex px-4 mb-8">
                <button className="rounded-md p-2 shadow-md w-full">
                    déconnexion
                </button>
            </div>
        </div>
    )
}