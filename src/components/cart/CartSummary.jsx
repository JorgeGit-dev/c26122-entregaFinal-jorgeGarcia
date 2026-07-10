import { Link } from "react-router-dom";

import { useCart } from "../../context/cart";
import { formatPrice } from "../../utils/formatPrice";

export const CartSummary = () => {
  const { totalItems, cartTotal } = useCart();

  return (
    <aside className="card shadow-sm border-light rounded-3 p-3 style-summary-card">
      <h2 className="h5 fw-bold pb-2 mb-3 border-bottom">
        Resumen de compra
      </h2>

      <div className="d-flex justify-content-between mb-2 text-muted">
        <span>Productos:</span>
        <span>{totalItems}</span>
      </div>

      <div className="d-flex justify-content-between mb-2 text-muted">
        <span>Subtotal:</span>
        <span>{formatPrice(cartTotal)}</span>
      </div>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Retiro / Despacho:</span>
        <span className="text-success fw-semibold">
          Sin cargo
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
        <span className="fw-bold">
          Total
        </span>

        <span className="fs-4 fw-bold text-primary">
          {formatPrice(cartTotal)}
        </span>
      </div>

      <Link
        to="/"
        className="btn btn-success w-100 transition-btn"
      >
        Seguir comprando
      </Link>
    </aside>
  );
};
