import { useEffect } from "react";
import { Input } from "../ui/Input";
import {Search,Bell,Menu, User as UserIcon} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEspace } from "@/store/useEspace";
import type { User } from "@/features/auth/types/auth.types";
import { IconButton } from "../ui/IconButton";
import { EspaceToogle } from "../ui/EspaceToogle";

interface HeaderProps {
    onMenuClick: () => void;
    sidebarOpen: boolean;
}

export const Header = ({onMenuClick, sidebarOpen}: HeaderProps) => {

    const user: User | null = useAuthStore((state) => state.user);

    const isLoading = useAuthStore((state) => state.isLoading);

    const changeEspace = useEspace((state) => state.changeEspace);

    useEffect(() => {
        if (user?.role) {
            changeEspace(user.role);
        }
    }, [user, changeEspace]);

    return (
        <header className={`fixed right-0 top-0 z-40 flex h-16 items-center gap-3 bg-white px-4 shadow-sm transition-[left,width] duration-300 ${sidebarOpen ? "left-0 md:left-61.25 md:w-[calc(100%-250px)]" : "left-0 w-full"}`}>

            {/* Bouton menu desktop/mobile */}
            {!sidebarOpen && (
                <IconButton
                    icon={Menu}
                    label="Ouvrir le menu"
                    size={21}
                    onClick={onMenuClick}
                />
            )}

            {/* Espace */}
            <div className="ms-5 hidden lg:block">
                <EspaceToogle />
            </div>

            {/* Search */}
            <div className="min-w-0 flex-1">
                <div className="mx-auto w-full max-w-xl">
                    <Input
                        leftContent={
                            <Search
                                size={18}
                                className="text-slate-400"
                            />
                        }
                        placeholder="Rechercher..."
                    />
                </div>
            </div>

            {/* Notification */}
            <IconButton icon={Bell} label="Notifications" showIndicator />

            {/* Utilisateur */}
            <div className="hidden h-10 max-w-40 shrink-0 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm md:flex">
                <span className="truncate">
                    {isLoading
                        ? "Chargement..."
                        : (
                            user?.nom ? 
                            <div className="flex justify-center items-center gap-2">
                                user.nom 
                                <UserIcon size={20}/>     
                            </div> : 
                            <div className="flex justify-center items-center gap-2">
                                Non connecté
                                <UserIcon size={20}/>     
                            </div>
                        )
                    }
                </span>
            </div>

        </header>
    );
};