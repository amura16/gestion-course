import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ProductPage } from "./features/product/page/ProductPage";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Toutes ces pages utilisent MainLayout */}
                <Route path="/client" element={<MainLayout />}>

                    <Route
                        path="produit"
                        element={<ProductPage />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
};