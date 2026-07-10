import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

import { AdminLayout } from "../layouts/AdminLayout";
import { PublicLayout } from "../layouts/PublicLayout";

/* =========================
   PÁGINAS PÚBLICAS
========================= */

import { Cart } from "../pages/Cart";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { ProductDetail } from "../pages/ProductDetail";

/* =========================
   ADMINISTRACIÓN
========================= */

import { Dashboard } from "../components/admin/dashboard";
import { EditProduct } from "../components/admin/editProduct";
import { ProductFormContainer, ProductSuccess } from "../components/admin/productForm";
import { ProductListAdmin } from "../components/admin/productList";

export const AppRouter = () => {
  return (
    <Routes>

      {/* =========================
          SITIO PÚBLICO
      ========================= */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/categoria/:categoria"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/*
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        */}

      </Route>

      {/* =========================
          ADMINISTRACIÓN
      ========================= */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          path="login"
          element={<Login />}
        />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="products/new"
          element={
            <ProtectedRoute>
              <ProductFormContainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="products/success/:id"
          element={
            <ProtectedRoute>
              <ProductSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="products"
          element={
            <ProtectedRoute>
              <ProductListAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

      </Route>

      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};
