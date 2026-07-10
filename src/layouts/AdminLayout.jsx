import { Link, Outlet } from "react-router-dom";

import { useAuth } from "../context/auth";

export const AdminLayout = () => {

  const { logout } = useAuth();

  return (
    <>

      <header className="bg-light border-bottom py-3 mb-4">

        <div className="container">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

            <h2 className="mb-0">
              Panel Administrador
            </h2>


            <nav className="d-flex flex-wrap gap-2 justify-content-center">

              <Link
                to="/admin/dashboard"
                className="btn btn-outline-primary btn-sm"
              >
                Inicio
              </Link>


              <Link
                to="/admin/products"
                className="btn btn-outline-secondary btn-sm"
              >
                Gestionar productos
              </Link>


              <Link
                to="/admin/products/new"
                className="btn btn-primary btn-sm"
              >
                Agregar producto
              </Link>


              <Link
                to="/"
                className="btn btn-outline-dark btn-sm"
              >
                Ver tienda
              </Link>


              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={logout}
              >
                Cerrar sesión
              </button>

            </nav>

          </div>

        </div>

      </header>


      <Outlet />

    </>
  );
};
