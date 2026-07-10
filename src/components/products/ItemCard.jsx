import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_image.png";
import { formatPrice } from "../../utils/formatPrice";
import "./ItemCard.css";

export const ItemCard = ({ product, children }) => {
  const {
    producto,
    categoria,
    marca,
    presentacion,
    peso,
    precio_kilo,
    precio_caja,
    precio_kilo_texto,
    precio_caja_texto,
    descripcion,
    imagen,
  } = product;

  return (
    <article className="card h-100 shadow-sm border-light item-card">

      <div className="item-card-image-wrapper position-relative">

        <img
          src={imagen}
          alt={producto}
          className="item-card-image"
          onError={(e) => {
            e.currentTarget.src = logo;
          }}
        />

        {categoria && (
          <span className="badge bg-dark position-absolute top-0 start-0 m-2">
            {categoria}
          </span>
        )}

      </div>

      <div className="card-body d-flex flex-column p-3">

        <span className="text-uppercase text-muted small fw-bold">
          {marca}
        </span>

        <h3 className="h5 fw-semibold">
          {producto}
        </h3>

          <div className="row g-2 mb-3">

            <div className="col-6">

              <div className="border rounded-3 p-3 text-center h-100 shadow-sm">

                <div className="text-muted small mb-1">
                  <i className="bi bi-box-seam me-1"></i>
                  Presentación
                </div>

                <div className="fw-semibold">
                  {presentacion}
                </div>

              </div>

            </div>

            <div className="col-6">

              <div className="border rounded-3 p-3 text-center h-100 shadow-sm">

                <div className="text-muted small mb-1">
                  <i className="bi bi-speedometer2 me-1"></i>
                  Peso
                </div>

                <div className="info-value">
                  {peso}
                </div>

              </div>

            </div>

          </div>

        <div className="border-top pt-2 mb-2">

          <div className="d-flex justify-content-between">
            <span className="text-muted small">Kilo</span>
            <span className="fw-bold text-primary">
              {precio_kilo != null
                ? formatPrice(precio_kilo)
                : precio_kilo_texto}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span className="text-muted small">Caja</span>
            <span className="fw-bold text-success">
              {precio_caja != null
                ? formatPrice(precio_caja)
                : precio_caja_texto}
            </span>
          </div>

        </div>

        {descripcion && (
          <p className="item-card-description">
            {descripcion}
          </p>
        )}

        <Link
          to={`/product/${product.id}`}
          className="btn btn-primary w-100 mb-2"
        >
          Ver detalle
        </Link>
        
        <div className="mt-auto pt-2">
          {children}
        </div>

      </div>
    </article>
  );
};

ItemCard.propTypes = {
  product: PropTypes.object.isRequired,
  children: PropTypes.node
};