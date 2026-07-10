const isEmpty = (value) =>
  value == null || value.toString().trim() === "";

const validatePrice = (value, field, errors) => {
  if (isEmpty(value)) {
    return false;
  }

  const price = Number(value);

  if (Number.isNaN(price)) {
    errors[field] = "Debe ser un valor numérico.";
    return false;
  }

  if (price <= 0) {
    errors[field] = "Debe ser mayor que cero.";
    return false;
  }

  return true;
};

export const validateProduct = (product) => {
  const errors = {};

  const requiredFields = {
    producto: "El nombre del producto es obligatorio.",
    marca: "La marca es obligatoria.",
    presentacion: "La presentación es obligatoria.",
    peso: "El peso es obligatorio.",
    categoria: "La categoría es obligatoria.",
    descripcion: "La descripción es obligatoria.",
  };

  Object.entries(requiredFields).forEach(([field, message]) => {
    if (isEmpty(product[field])) {
      errors[field] = message;
    }
  });

  const kiloOk = validatePrice(
    product.precio_kilo,
    "precio_kilo",
    errors
  );

  const cajaOk = validatePrice(
    product.precio_caja,
    "precio_caja",
    errors
  );

  if (!kiloOk && !cajaOk) {
    const message =
      "Debe ingresar al menos un precio válido.";

    errors.precio_kilo ??= message;
    errors.precio_caja ??= message;
  }

  if (!product.imageFile && !product.imagen) {
    errors.imagen =
      "Debe seleccionar una imagen para el producto.";
  }

  return errors;
};
