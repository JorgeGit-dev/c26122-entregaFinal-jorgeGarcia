/**
 * Obtiene el nombre del tipo de precio.
 * Acepta tanto un string ("kilo") como un objeto ({ nombre: "kilo" }).
 */
const normalizeTipoPrecio = (tipoPrecio) => {
  if (typeof tipoPrecio === "object") {
    return tipoPrecio?.nombre ?? "";
  }

  return tipoPrecio ?? "";
};

/**
 * Compara si dos productos del carrito representan el mismo ítem.
 * La igualdad se basa en:
 *  - id
 *  - tipo de precio (kilo / caja)
 */
export const isSameProduct = (item, id, tipoPrecio) => {
  return (
    item.id === id &&
    normalizeTipoPrecio(item.tipoPrecio) ===
      normalizeTipoPrecio(tipoPrecio)
  );
};
