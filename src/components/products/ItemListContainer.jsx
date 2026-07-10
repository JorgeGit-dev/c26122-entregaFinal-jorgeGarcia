import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ItemList } from "./ItemList";

import {
  EmptyState,
  ErrorMessage,
  Loader,
} from "../common";

import {
  getByCategory,
  getProducts,
} from "../../services/productService";

export const ItemListContainer = () => {
  const { categoria } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      setError(null);

      try {
        const data = categoria
          ? await getByCategory(categoria)
          : await getProducts();
        console.log("Productos:", data);
        setProducts(data);

      } catch (err) {
        console.error(
          "Error cargando productos:",
          err
        );

        setError(
          "No se pudieron cargar los productos."
        );

      } finally {
        setLoading(false);
      }

    };
    fetchData();

  }, [categoria]);

  if (loading) {
    return (
      <Loader message="Cargando productos..." />
    );
  }

  if (error) {
    return (
      <section className="container my-5">
        <ErrorMessage message={error} />
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="container my-5">
        <EmptyState

          icon="📦"
          title="Sin productos disponibles"
          description={
            categoria
              ? `No encontramos productos en la categoría ${categoria}.`
              : "Actualmente no hay productos cargados."
          }
          buttonText="Volver al inicio"
          buttonTo="/"
        />
      </section>
    );
  }

  return (
    <section className="container my-4">

      <ItemList products={products} />

    </section>
  );
};