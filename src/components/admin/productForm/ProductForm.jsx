import "./ProductForm.css";

export const ProductForm = ({
  product,
  errors = {},
  loading = false,
  onChange,
  onFileChange,
  onSubmit,
  title = "Agregar nuevo producto",
  submitText = "Guardar producto",
}) => {
  return (
    <form className="product-form" onSubmit={onSubmit} noValidate>

      <h2 className="product-form-title">
        {title}
      </h2>

      {/* =======================
          PRODUCTO / MARCA
      ======================== */}

      <div className="row g-3">

        <div className="col-md-6">
          <label htmlFor="producto" className="form-label">
            Producto
          </label>

          <input
            id="producto"
            name="producto"
            type="text"
            className={`form-control ${
              errors.producto ? "is-invalid" : ""
            }`}
            value={product?.producto ?? ""}
            onChange={onChange}
            disabled={loading}
          />

          <div className="invalid-feedback">
            {errors.producto}
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="marca" className="form-label">
            Marca
          </label>

          <input
            id="marca"
            name="marca"
            type="text"
            className={`form-control ${
              errors.marca ? "is-invalid" : ""
            }`}
            value={product?.marca ?? ""}
            onChange={onChange}
            disabled={loading}
          />

          <div className="invalid-feedback">
            {errors.marca}
          </div>
        </div>

      </div>

      {/* =======================
          PRESENTACIÓN / PESO
      ======================== */}

      <div className="row g-3 mt-1">

        <div className="col-md-6">
          <label htmlFor="presentacion" className="form-label">
            Presentación
          </label>

          <input
            id="presentacion"
            name="presentacion"
            type="text"
            className={`form-control ${
              errors.presentacion ? "is-invalid" : ""
            }`}
            value={product?.presentacion ?? ""}
            onChange={onChange}
            disabled={loading}
          />

          <div className="invalid-feedback">
            {errors.presentacion}
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="peso" className="form-label">
            Peso
          </label>

          <input
            id="peso"
            name="peso"
            type="text"
            className={`form-control ${
              errors.peso ? "is-invalid" : ""
            }`}
            value={product?.peso ?? ""}
            onChange={onChange}
            disabled={loading}
          />

          <div className="invalid-feedback">
            {errors.peso}
          </div>
        </div>

      </div>

      {/* =======================
            PRECIOS
      ======================== */}

      <div className="row g-3 mt-1">

        <div className="col-md-6">
          <label htmlFor="precio_kilo" className="form-label">
            Precio por kilo
          </label>

          <input
            id="precio_kilo"
            name="precio_kilo"
            type="number"
            className={`form-control ${
              errors.precio_kilo ? "is-invalid" : ""
            }`}
            value={product?.precio_kilo ?? ""}
            onChange={onChange}
            disabled={loading}
          />

          <small className="form-text text-muted">
            Dejar vacío para mostrar
            "Consultar precio al día".
          </small>

          <div className="invalid-feedback">
            {errors.precio_kilo}
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="precio_caja" className="form-label">
            Precio por caja
          </label>

          <input
            id="precio_caja"
            name="precio_caja"
            type="number"
            className={`form-control ${
              errors.precio_caja ? "is-invalid" : ""
            }`}
            value={product?.precio_caja ?? ""}
            onChange={onChange}
            disabled={loading}
          />

          <small className="form-text text-muted">
            Dejar vacío para mostrar
            "Consultar precio al día".
          </small>

          <div className="invalid-feedback">
            {errors.precio_caja}
          </div>
        </div>

      </div>

      {errors.precios && (
        <div className="alert alert-warning mt-3 mb-0">
          {errors.precios}
        </div>
      )}

      {/* =======================
          CATEGORÍA
      ======================== */}

      <div className="mt-3">

        <label htmlFor="categoria" className="form-label">
          Categoría
        </label>

        <input
          id="categoria"
          name="categoria"
          type="text"
          className={`form-control ${
            errors.categoria ? "is-invalid" : ""
          }`}
          value={product?.categoria ?? ""}
          onChange={onChange}
          disabled={loading}
        />

        <div className="invalid-feedback">
          {errors.categoria}
        </div>

      </div>

      {/* =======================
          DESCRIPCIÓN
      ======================== */}

      <div className="mt-3">

        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>

        <textarea
          id="descripcion"
          name="descripcion"
          rows="4"
          className={`form-control ${
            errors.descripcion ? "is-invalid" : ""
          }`}
          value={product?.descripcion ?? ""}
          onChange={onChange}
          disabled={loading}
        />

        <div className="invalid-feedback">
          {errors.descripcion}
        </div>

      </div>

      {/* =======================
          IMAGEN
      ======================== */}

      <div className="mt-3">

        <label htmlFor="imageFile" className="form-label">
          Imagen del producto
        </label>

        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          className={`form-control ${
            errors.imagen ? "is-invalid" : ""
          }`}
          onChange={onFileChange}
          disabled={loading}
        />

        <div className="invalid-feedback">
          {errors.imagen}
        </div>

      </div>

      {/* =======================
            ERROR GENERAL
      ======================== */}

      {errors.general && (
        <div
          className="alert alert-danger mt-4"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      {/* =======================
             BOTÓN
      ======================== */}

      <button
        type="submit"
        className="btn btn-primary w-100 mt-4"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            />
            Guardando...
          </>
        ) : (
          submitText
        )}
      </button>

    </form>
  );
};
