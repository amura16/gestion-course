import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Layout desktop */}
            <div className="flex min-h-screen">
                <div className={`hidden md:block shrink-0 transition-[width] duration-300 ease-in-out ${isSidebarOpen ? "w-[260px]" : "w-0"}`}>
                    <div className={`fixed left-0 top-0 h-screen w-[260px] transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <Sidebar onClose={() => setIsSidebarOpen(false)} />
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="min-w-0 flex-1">
                    <Header sidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                    <main className="min-h-screen pt-16">
                        <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-5 lg:p-6">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            {/* Sidebar mobile */}
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-in-out ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                <div className={` absolute inset-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-y-0" : "-translate-y-full"}`}>
                    <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
            </div>

        </div>
    );
};