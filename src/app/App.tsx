import { RouterProvider } from "react-router"
import { router } from "./router"
import { useAuthStore } from "@/features/auth/store/useAuthStore"

export const App = () => {

    void useAuthStore.getState().initialize();

    return (
        <RouterProvider router={router}/>
    )
}