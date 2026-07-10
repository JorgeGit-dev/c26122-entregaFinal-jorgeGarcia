import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ItemDetail } from "../components/products/ItemDetail";
import { getProductById } from "../services/productService";

export const ProductDetail = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);


  useEffect(() => {

    const fetchProduct = async () => {

      const data = await getProductById(id);

      setProduct(data);

    };

    fetchProduct();

  }, [id]);


  if (!product) {
    return (
      <div className="container py-5">
        Cargando producto...
      </div>
    );
  }


  return (
    <section className="container py-5">

      <ItemDetail item={product}/>

    </section>
  );
};