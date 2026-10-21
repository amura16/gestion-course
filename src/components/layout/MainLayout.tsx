import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useState } from "react";
import { Outlet } from "react-router";

export const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                {/* Sidebar desktop */}
                <div className={`hidden shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out md:block ${isSidebarOpen ? "md:w-[260px]" : "md:w-0"}`}>
                        <div className={`h-full w-[260px] transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                        </div>
                </div>

                {/* Zone principale */}
                <div className="min-w-0 flex-1">
                    {/* Header */}
                    <Header sidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                    {/* Contenu */}
                    <main className="min-h-screen pt-16">
                        <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-5 lg:p-6">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            {/* Sidebar mobile */}
            <div className="md:hidden">
                {isSidebarOpen && <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-[2px]" onClick={() => setIsSidebarOpen(false)} />}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            </div>
        </div>
    );
};