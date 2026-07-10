import { Link } from "react-router-dom";

import "./Dashboard.css";

export const Dashboard = () => {
  
  return (
    <main
        className="dashboard container animate-fade-in"
    >
      <header className="dashboard-header">

        <h2 className="mb-0 fw-semibold">
          Panel de administración
        </h2>

        <div className="header-actions d-flex gap-2">

          <Link
            className="btn btn-outline-primary btn-sm px-3"
            to="/"
          >
            Volver a la tienda
          </Link>

        </div>

      </header>

      <section className="dashboard-actions mb-4">
        <h3 className="h5 text-muted mb-3">Acciones rápidas</h3>

        <div className="actions-grid">
          {/* MEJORA A11Y: Emojis aislados de forma semántica */}
          <Link to="/admin/products/new" className="action-card">
            <span className="fs-4 mb-2" aria-hidden="true">➕</span>
            <span>Cargar Producto</span>
          </Link>

          <Link to="/admin/products" className="action-card">
            <span className="fs-4 mb-2" aria-hidden="true">📦</span>
            <span>Gestionar Productos</span>
          </Link>
        </div>
      </section>

      <section className="dashboard-help">
        <h3 className="h5 mb-2">Ayuda</h3>
        <p className="dashboard-help-text">
          Desde este panel podés dar de alta nuevos productos y editar o eliminar el catálogo existente de la tienda de forma directa sobre la base de datos.
        </p>
      </section>
    </main>
  );
};
