import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    deleteProduct,
    getProducts,
} from "../../../services/productService";

import "./ProductListAdmin.css";

/* ==========================================================
   COMPONENTE
========================================================== */

export const ProductListAdmin = () => {
  /* ========================================================
     ESTADOS
  ======================================================== */

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  /* ========================================================
     CARGAR PRODUCTOS
  ======================================================== */

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible obtener el listado de productos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ========================================================
     ELIMINAR
  ======================================================== */

  const handleDelete = async (id, producto) => {
    const confirmed = window.confirm(
      `¿Deseás eliminar "${producto}"?\n\nEsta acción no podrá deshacerse.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        "No fue posible eliminar el producto."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <section className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Cargando...
          </span>
        </div>

        <p className="mt-3 mb-0">
          Cargando productos...
        </p>

      </section>
    );
  }

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section className="container py-4 animate-fade-in">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="mb-1">
            Gestión de productos
          </h2>

          <p className="text-muted mb-0">
            Administrá el catálogo de la tienda.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="btn btn-primary"
        >
          + Nuevo producto
        </Link>

      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="alert alert-info">

          No hay productos registrados.

        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>Imagen</th>

                <th>Producto</th>

                <th>Marca</th>

                <th>Presentación</th>

                <th>Categoría</th>

                <th>Precio</th>

                <th className="text-center">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  <td style={{ width: 90 }}>

                    <img
                      src={product.imagen}
                      alt={product.producto}
                      className="img-thumbnail"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                      }}
                    />

                  </td>

                  <td>

                    <strong>
                      {product.producto}
                    </strong>

                  </td>

                  <td>

                    {product.marca}

                  </td>

                  <td>

                    {product.presentacion}

                  </td>

                  <td>

                    {product.categoria}

                  </td>

                  <td>

                    {product.precio_kilo != null
                      ? `$ ${product.precio_kilo.toLocaleString(
                          "es-AR"
                        )}`
                      : "Consultar"}

                  </td>

                  <td>

                    <div className="d-flex justify-content-center gap-2">

                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        ✏️ Editar
                      </Link>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        disabled={
                          deletingId === product.id
                        }
                        onClick={() =>
                          handleDelete(
                            product.id,
                            product.producto
                          )
                        }
                      >
                        {deletingId === product.id
                          ? "Eliminando..."
                          : "🗑 Eliminar"}
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </section>
  );
};
