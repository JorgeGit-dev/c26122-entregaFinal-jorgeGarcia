import { Link, useNavigate, useParams } from "react-router-dom";

export const ProductSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="container py-5 animate-fade-in">

    <div className="card shadow-sm border-0 mx-auto product-success-card">

        <div className="card-body text-center p-5">

            <div
                className="product-success-icon text-success mb-3"
                aria-hidden="true"
            >
                ✅
            </div>

          <h1 className="h3 fw-bold mb-3">
            Producto cargado correctamente
          </h1>

          <p className="text-muted mb-2">
            El producto fue registrado exitosamente en la base de datos.
          </p>

          <p className="small text-muted mb-4">
            ID generado:
            <br />
            <code className="fs-6">{id}</code>
          </p>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

            <Link
              to="/admin/products/new"
              className="btn btn-primary"
            >
              Agregar otro producto
            </Link>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/admin/dashboard")}
            >
              Volver al panel
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
