import {
    createBrowserRouter,
    Navigate,
} from "react-router";

import { HomePage } from "@/app/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ProductPage } from "@/features/product/page/ProductPage";
import { MainLayout } from "../components/layout/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
    {
        path: "/client",
        Component: MainLayout,
        children: [
            {
                path: "produit",
                Component: ProductPage
            }
        ]
    }
]);