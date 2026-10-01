import { useEffect } from "react"
import Burger from "../../assets/burger-bar.png"
import { Input } from "../ui/Input"
import { Toogle } from "../ui/Toogle"
import { Search } from "lucide-react"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useEspace } from "@/store/useEspace"
import type { User } from "@/features/auth/types/auth.types"

interface HeaderProps {
    onMenuClick: () => void
}

export const Header = ({onMenuClick}: HeaderProps ) => {

    const user: User | null = useAuthStore((state) => (state.user));
    const isLoading = useAuthStore((state) => (state.isLoading));
    const espace = useEspace((state) => state.espace);
    const changeEspace = useEspace((state) => state.changeEspace);

    useEffect(() => {
        if (user?.role){
            changeEspace(user.role);
        }
        console.log("espace actuelle : ", espace);
    }, [user, changeEspace])

    return (
        <header className="fixed top-0 right-0 z-50 h-18 w-full md:w-[80%] flex items-center shadow-md bg-white py-2 px-4 gap-2 flex justify-between">

            <div className="hidden sm:flex bg-gray-200 rounded-lg w-60 shadow-lg items-center">
                <Toogle
                    content={
                        <p className="text-center text-sm">
                            ESPACE <br />
                            CLIENT
                        </p>
                    }
                    isActive={"CLIENT" === espace}
                    onClick={() => changeEspace("CLIENT")}
                />

                <Toogle
                    content={
                        <p className="text-center text-sm">
                            ESPACE <br />
                            TRANSPORT
                        </p>
                    }
                    isActive={"CARRIER" === espace}
                    onClick={() => changeEspace("CARRIER")}
                />
            </div>

            {/* search bar */}
            <div className="w-75 border rounded-lg shadow-lg">
                <Input 
                    leftContent={<Search size={18} />}
                    placeholder="Rechercher"
                />
            </div>

            {/* Burger mobile */}
            <button
                className="ml-4 text-2xl md:hidden"
                onClick={onMenuClick}
            >
                <img src={Burger} alt="" className="h-8 w-14"/>
            </button>

            <div className="shadow-lg rounded-lg h-full w-64 hidden md:flex items-center justify-center">
                {isLoading?"chargement...":user?.nom}
            </div>

        </header>
    )
}