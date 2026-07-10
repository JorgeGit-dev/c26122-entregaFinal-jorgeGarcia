import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../../services/productService";
import { ItemDetail } from "./ItemDetail";

import {
  EmptyState,
  ErrorMessage,
  Loader,
} from "../common";

export const ItemDetailContainer = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setItem(null);

      try {
        const product = await getProductById(id);

        if (!product) {
          setError("El producto solicitado no existe.");
          return;
        }

        setItem(product);

      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading) {
    return (
      <Loader message="Cargando producto..." />
    );
  }


  if (error) {
    return (
      <section className="container my-5">
        <ErrorMessage message={error} />

        <EmptyState
          icon="🔎"
          title="Producto no encontrado"
          description="El producto que buscas no está disponible."
          buttonText="Volver al inicio"
          buttonTo="/"
        />
      </section>
    );
  }

  if (!item) {
    return (
      <EmptyState
        title="Sin información"
        description="No hay datos disponibles para este producto."
      />
    );
  }

  return (
    <section className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <ItemDetail item={item} />
        </div>
      </div>
    </section>
  );
};