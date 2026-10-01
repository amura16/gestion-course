import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useState } from "react";
import { Outlet } from "react-router";
import { useAuth } from "@/features/auth/providers/AuthProviders";

export const MainLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-5">

            <aside className="hidden md:block md:col-span-1">
                <Sidebar />
            </aside>

            <main className="col-span-4 min-w-0 shrink-0">

                <Header 
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* mobile sidebar*/}
                {
                    isSidebarOpen && (
                        <aside className="fixed inset-0 z-50 bg-black/40 md:hidden">
                            <div className="h-full w-64 bg-white">
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-4"
                                >
                                    ✕
                                </button>

                                <Sidebar />
                            </div>
                        </aside>
                    )
                }

                <div className="flex-1 min-h-screen overflow-y-auto pt-18">
                    <Outlet />
                </div>

            </main>
        </div>
    )
}