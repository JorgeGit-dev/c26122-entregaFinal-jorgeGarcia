import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../../../services/productService";
import { uploadImage } from "../../../services/uploadImage";

import { validateProduct } from "../../../utils/validateProduct";

import { ProductForm } from "./ProductForm";

import "./ProductForm.css";

/* ==========================================================
   ESTADO INICIAL
========================================================== */

const initialProduct = {
  producto: "",
  marca: "",
  presentacion: "",
  peso: "",

  precio_kilo: "",
  precio_kilo_texto: "",

  precio_caja: "",
  precio_caja_texto: "",

  descripcion: "",
  categoria: "",

  imageFile: null,
};

/* ==========================================================
   COMPONENTE
========================================================== */

export const ProductFormContainer = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ========================================================
     INPUTS
  ======================================================== */

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0] ?? null;

    setProduct((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  /* ========================================================
     SUBMIT
  ======================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({});
    setLoading(true);

    const validationErrors = validateProduct(product);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const imageUrl = product.imageFile
        ? await uploadImage(product.imageFile)
        : "https://placehold.co/600x600?text=Producto+Sin+Foto";

      const newProduct = {
        producto: product.producto.trim(),
        marca: product.marca.trim(),
        presentacion: product.presentacion.trim(),
        peso: product.peso.trim(),

        precio_kilo:
          product.precio_kilo === ""
            ? null
            : Number(product.precio_kilo),

        precio_kilo_texto:
          product.precio_kilo_texto.trim() || null,

        precio_caja:
          product.precio_caja === ""
            ? null
            : Number(product.precio_caja),

        precio_caja_texto:
          product.precio_caja_texto.trim() ||
          "Consultar precio al día",

        descripcion: product.descripcion.trim(),

        categoria: product.categoria.trim(),

        imagen: imageUrl,
      };

      const productId = await createProduct(newProduct);

      setProduct(initialProduct);

      navigate(`/admin/products/success/${productId}`);
    } catch (error) {
      console.error(error);

      setErrors({
        general:
          "No fue posible guardar el producto. Intentá nuevamente.",
      });

      setLoading(false);
    }
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section className="product-form-container animate-fade-in">
      <div
        className={`product-form-wrapper ${
          loading ? "loading" : ""
        }`}
      >
        <ProductForm
          title="Agregar nuevo producto"
          submitText="Guardar producto"
          product={product}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};
