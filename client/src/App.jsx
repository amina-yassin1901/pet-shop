import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/home/index";
import CategoriesPage from "./pages/categoriesPage/index";
import CategoriesProductPage from "./pages/categoriesProductPage";
import NotFoundPage from "./pages/notFoundPage/index";
import ProductsPage from "./pages/productsPage";
import ProductsItemPage from "./pages/productsItemPage/index";
import SalePage from "./pages/salePage";
import CartPage from "./pages/cartPage/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route
          path="categories/:categoryId"
          element={<CategoriesProductPage />}
        />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductsItemPage />} />
        <Route path="sales" element={<SalePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
