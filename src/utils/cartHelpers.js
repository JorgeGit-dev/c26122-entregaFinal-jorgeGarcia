import { isSameProduct } from "./isSameProduct";

/**
 * Devuelve la cantidad de unidades de un producto
 * que ya existen en el carrito.
 */
export const getCantidadEnCarrito = (
  cart,
  id,
  tipoPrecio
) => {
  if (!Array.isArray(cart)) {
    return 0;
  }

  const item = cart.find((producto) =>
    isSameProduct(producto, id, tipoPrecio)
  );

  return item?.cantidad ?? 0;
};
