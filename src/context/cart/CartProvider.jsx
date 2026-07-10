import { useEffect, useMemo, useState } from "react";

import { isSameProduct } from "../../utils/isSameProduct";
import { CartContext } from "./CartContext";

const STORAGE_KEY = "cart";
const MIN_CANTIDAD = 1;

export const CartProvider = ({ children }) => {
  /* ========================================================
     ESTADO
  ======================================================== */

  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);

      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  /* ========================================================
     PERSISTENCIA
  ======================================================== */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  /* ========================================================
   HELPERS
======================================================== */

const isInCart = (id, tipoPrecio) => {
  return cart.some((item) =>
    isSameProduct(item, id, tipoPrecio)
  );
};

/* ========================================================
   ACCIONES
======================================================== */

  const addItem = (producto, tipoPrecio) => {
    const precio =
      tipoPrecio === "caja"
        ? producto.precio_caja
        : producto.precio_kilo;

    if (typeof precio !== "number") {
      return {
        success: false,
        message: "Consultar precio actualizado.",
      };
    }

    let response = {
      success: false,
      message: "No fue posible agregar el producto.",
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) =>
        isSameProduct(item, producto.id, tipoPrecio)
      );

      if (existingItem) {
        response = {
          success: true,
          message: "Cantidad actualizada.",
        };

        return prevCart.map((item) =>
          isSameProduct(item, producto.id, tipoPrecio)
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      response = {
        success: true,
        message: "Producto agregado al carrito.",
      };

      return [
        ...prevCart,
        {
          id: producto.id,
          producto: producto.producto,
          categoria: producto.categoria,
          marca: producto.marca,
          presentacion: producto.presentacion,
          peso: producto.peso,
          descripcion: producto.descripcion,
          imagen: producto.imagen,

          tipoPrecio,

          precio,

          cantidad: MIN_CANTIDAD,
        },
      ];
    });

    return response;
  };

  const increaseQuantity = (id, tipoPrecio) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        isSameProduct(item, id, tipoPrecio)
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id, tipoPrecio) => {
    setCart((prevCart) =>
      prevCart.flatMap((item) => {
        if (!isSameProduct(item, id, tipoPrecio)) {
          return [item];
        }

        if (item.cantidad <= MIN_CANTIDAD) {
          return [];
        }

        return [
          {
            ...item,
            cantidad: item.cantidad - 1,
          },
        ];
      })
    );
  };

  const removeItem = (id, tipoPrecio) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !isSameProduct(item, id, tipoPrecio)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  /* ========================================================
     DERIVADOS
  ======================================================== */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.precio * item.cantidad,
      0
    );
  }, [cart]);

  /* ========================================================
     CONTEXTO MEMORIZADO
  ======================================================== */

  const cartValue = useMemo(
    () => ({
      cart,

      totalItems,
      cartTotal,

      addItem,
      increaseQuantity,
      decreaseQuantity,

      removeItem,
      clearCart,

      isInCart,
    }),
    [cart, totalItems, cartTotal]
  );

  /* ========================================================
     PROVIDER
  ======================================================== */

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};
