import { useCart } from "../../context/cart";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart } = useCart();

  return (
    <div className="cart-items-container d-flex flex-column gap-3 animate-fade-in">
      {cart.map((item) => (
        <CartItem
          key={`${item.id}-${item.tipoPrecio}`}
          item={item}
        />
      ))}
    </div>
  );
};
