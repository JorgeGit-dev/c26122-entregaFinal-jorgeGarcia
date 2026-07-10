import { useCart } from "../../context/cart";
import { formatPrice } from "../../utils/formatPrice";

export const CartItem = ({ item }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  // CORRECCIÓN CLAVE: Se evalúa según la estructura real del objeto (.nombre)
  const esCaja = item.tipoPrecio === "caja";
  const tipoCompra = esCaja ? "Compra por Caja" : "Compra por Kilo";

  const subtotal = item.precio * item.cantidad;

  const handleDecrease = () => {
    if (item.cantidad === 1) {
      const confirmar = window.confirm(
        `¿Querés eliminar "${item.producto}" del carrito?`
      );
      if (!confirmar) return; 
    }
    decreaseQuantity(item.id, item.tipoPrecio);
  };

  return (
    /* Estructuramos el ítem como una tarjeta horizontal ligera y responsiva */
    <article className="card shadow-sm border-light rounded-3 p-3">
      <div className="row align-items-center g-3">
        
        {/* 1. IMAGEN DEL PRODUCTO */}
        <div className="col-3 col-sm-2 col-md-2">
          <img
              src={item.imagen}
              alt={item.producto}
              loading="lazy"
              className="img-fluid rounded border bg-light cart-item-image"
          />
        </div>

        {/* 2. DETALLES COMERCIALES */}
        <div className="col-9 col-sm-4 col-md-4">
          <span className="text-uppercase text-muted fw-bold small" style={{ fontSize: "0.7rem" }}>
            {item.marca}
          </span>
          <h3 className="h6 mb-1 fw-semibold text-truncate" title={item.producto}>
            {item.producto}
          </h3>
          <span className={`badge ${esCaja ? "bg-success" : "bg-primary"} opacity-75 fw-normal small`}>
            {tipoCompra}
          </span>
        </div>

        {/* 3. CONTROLADORES DE CANTIDAD (Estilo input-group compacto) */}
        <div className="col-6 col-sm-3 col-md-2 d-flex justify-content-start justify-content-sm-center">
          <div className="input-group input-group-sm" style={{ maxWidth: "100px" }}>
            <button
              className="btn btn-outline-secondary fw-bold"
              type="button"
              onClick={handleDecrease}
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="form-control text-center bg-white border-secondary-subtle fw-medium">
              {item.cantidad}
            </span>
            <button
              className="btn btn-outline-secondary fw-bold"
              type="button"
              onClick={() => increaseQuantity(item.id, item.tipoPrecio)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>

        {/* 4. DESGLOSE DE PRECIOS */}
        <div className="col-6 col-sm-3 col-md-2 text-end text-sm-center">
          <div className="small text-muted d-none d-md-block">
            {formatPrice(item.precio)} c/u
          </div>
          <div className="fw-bold text-dark fs-6">
            {formatPrice(subtotal)}
          </div>
        </div>

        {/* 5. BOTÓN ELIMINAR (Ícono o texto adaptativo) */}
        <div className="col-12 col-sm-12 col-md-2 text-end text-md-center mt-2 mt-md-0">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger px-3 px-md-2 py-1"
            onClick={() => removeItem(item.id, item.tipoPrecio)}
            title={`Remover ${item.producto}`}
          >
            <span className="d-md-none">Eliminar producto</span>
            <span className="d-none d-md-inline" aria-hidden="true">🗑️</span>
          </button>
        </div>

      </div>
    </article>
  );
};
