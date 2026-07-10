/**
 * Formatea un número como moneda argentina.
 * Si recibe null, undefined o un string,
 * devuelve el valor sin modificar.
 */
export const formatPrice = (value) => {
  if (typeof value !== "number") {
    return value;
  }

  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
