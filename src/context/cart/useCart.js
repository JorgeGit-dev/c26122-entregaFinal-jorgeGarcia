import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null || context === undefined) {
    throw new Error(
      "useCart debe utilizarse dentro de un <CartProvider>."
    );
  }

  return context;
};
