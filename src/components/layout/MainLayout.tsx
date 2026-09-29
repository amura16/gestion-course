import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useState } from "react";

export const MainLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-5">

            <aside className="hidden sm:block md:col-span-1">
                <Sidebar />
            </aside>

            <main className="col-span-4 min-w-0">

                <Header 
                    onMenuClick={() => setSidebarOpen(true)}
                />

            {/* mobile sidebar*/}
            {
                sidebarOpen && (
                    <aside className="fixed inset-0 z-50 bg-black/40 md:hidden">
                        <div className="h-full w-64 bg-white">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-4"
                            >
                                ✕
                            </button>

                            <Sidebar />
                        </div>
                    </aside>
                    )
            }

                <div className="h-screen w-full flex justify-center items-center bg-gray-300">
                    contenu
                </div>

            </main>
        </div>
    )
}