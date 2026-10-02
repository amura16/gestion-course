import {
    createBrowserRouter,
    Navigate,
} from "react-router";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ProductPage } from "@/features/product/page/ProductPage";
import { MainLayout } from "@/components/layout/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
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
                children: [
                    {
                        index: true,
                        Component: ProductPage
                    }
                ]
            }
        ]
    }
]);