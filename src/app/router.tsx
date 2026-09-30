import {
    createBrowserRouter,
    Navigate,
} from "react-router";

import { HomePage } from "@/app/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";

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
]);