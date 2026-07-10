import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";

import "./Cart.css";

export const CartView = () => {
  const { cart } = useCart();
  
  return (
    <section className="container my-5 animate-fade-in">
      <h1 className="h2 fw-bold mb-4 style-cart-title d-flex align-items-center gap-2">
        Tu carrito de compras <span className="cart-title-icon" aria-hidden="true">
  🛒
</span>

      </h1>

      {cart.length > 0 ? (
        
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <CartList />
          </div>
          <div className="col-12 col-lg-4 position-sticky" style={{ top: "90px" }}>
            <CartSummary />
          </div>
        </div>
      ) : (
        /* VISTA DE CARRITO VACÍO REFORMULADA */
        <div className="text-center p-5 border rounded-3 bg-light mx-auto" style={{ maxWidth: "500px" }}>
          <div className="display-4 text-muted mb-3" aria-hidden="true">😕</div>
          <h2 className="h4 fw-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-muted small mb-4">
            Parece que aún no agregaste ningún producto del catálogo de la distribuidora.
          </p>
          
          {/* CORRECCIÓN: Botón interactivo nativo de Bootstrap */}
          <Link className="btn btn-primary px-4 fw-medium" to="/">
            Volver a la tienda
          </Link>
        </div>
      )}
    </section>
  );
};
