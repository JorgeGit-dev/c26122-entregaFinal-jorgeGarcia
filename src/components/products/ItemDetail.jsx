import PropTypes from "prop-types";
import { useState } from "react";

import logo from "../../assets/logo_image.png";

import { useCart } from "../../context/cart";
import { formatPrice } from "../../utils/formatPrice";

import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {

  const { addItem } = useCart();
  const [loadingBtn, setLoadingBtn] = useState(null);


  const handleAdd = (tipo) => {

    setLoadingBtn(tipo);

    try {

      const result = addItem(item, tipo);

      if (!result.success) {
        console.warn(result.message);
      }

    } catch (error) {

      console.error(
        "Error al agregar producto:",
        error
      );

    } finally {

      setLoadingBtn(null);

    }
  };

  const handleImageError = (e) => {

    e.currentTarget.src = logo;

    e.currentTarget.classList.add(
      "p-4",
      "object-fit-contain"
    );

  };

  const {
    producto,
    categoria,
    marca,
    presentacion,
    peso,
    precio_kilo,
    precio_kilo_texto,
    precio_caja,
    precio_caja_texto,
    descripcion,
    imagen,

  } = item;

  return (

    <article className="card item-detail shadow-sm border-0">

      <div className="item-detail-image-wrapper position-relative">

        <img
          src={imagen}
          alt={`Imagen de ${producto}`}
          className="item-detail-image"
          onError={handleImageError}
        />

        {categoria && (

          <span className="badge bg-dark position-absolute top-0 start-0 m-3">
            {categoria}
          </span>

        )}

      </div>

      <div className="card-body d-flex flex-column p-4">

        <span className="text-uppercase text-muted small fw-bold">
          {marca}
        </span>

        <h1 className="h4 fw-semibold mb-3">
          {producto}
        </h1>

        <div className="row g-3 mb-4">

          <InfoRow
            label="Presentación"
            value={presentacion}
          />

          <InfoRow
            label="Peso"
            value={peso}
          />

        </div>

        <div className="border-top pt-3 mb-3">

          <PriceRow
            label="Precio por kilo"
            value={precio_kilo}
            text={precio_kilo_texto}
            color="text-primary"
          />

          <PriceRow
            label="Precio por caja"
            value={precio_caja}
            text={precio_caja_texto}
            color="text-success"
          />

        </div>

        {descripcion && (

          <p className="item-detail-description text-dark">
            {descripcion}
          </p>

        )}

        <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">

          <button
            type="button"
            className="btn btn-primary flex-fill"
            disabled={
              precio_kilo == null ||
              loadingBtn !== null
            }
            onClick={() => handleAdd("kilo")}
          >

            {
              loadingBtn === "kilo"
                ? "Agregando..."
                : "Comprar por kilo"
            }

          </button>

          <button
            type="button"
            className="btn btn-success flex-fill"
            disabled={
              precio_caja == null ||
              loadingBtn !== null
            }
            onClick={() => handleAdd("caja")}
          >

            {
              loadingBtn === "caja"
                ? "Agregando..."
                : "Comprar caja"
            }
          </button>
        </div>
      </div>
    </article>

  );
};

const InfoRow = ({ label, value }) => (
  <div className="col-6">

    <div className="border rounded-3 p-3 text-center shadow-sm h-100 info-card">

      <div className="info-title mb-2 text-dark">

        <i
          className={
            label === "Presentación"
              ? "bi bi-box-seam me-1"
              : "bi bi-box me-1"
          }
        ></i>

        {label}

      </div>

      <div className="info-value text-dark">
        {value}
      </div>

    </div>

  </div>
);

const PriceRow = ({
  label,
  value,
  text,
  color,
}) => (

  <div className="d-flex justify-content-between align-items-center mb-2">

    <span className="text-dark fw-semibold">
      {label}
    </span>

    <span className={`fw-bold ${color}`}>

      {
        value != null
          ? formatPrice(value)
          :
          <span className="text-warning fw-normal">
            {text || "Consultar precio"}
          </span>
      }

    </span>

  </div>

);

ItemDetail.propTypes = {

  item: PropTypes.object.isRequired,

};