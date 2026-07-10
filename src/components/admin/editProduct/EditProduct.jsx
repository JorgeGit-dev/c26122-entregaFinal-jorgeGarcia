import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateProduct,
} from "../../../services/productService";

import { uploadImage } from "../../../services/uploadImage";

import { ProductForm } from "../productForm";

import "./EditProduct.css";

export const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);

        setErrors({
          general:
            "No fue posible cargar el producto seleccionado.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = ({ target }) => {
    const file = target.files?.[0];

    setProduct((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setIsSubmitting(true);

    try {
      let updatedProduct = { ...product };

      if (product.imageFile) {
        const imageUrl = await uploadImage(product.imageFile);

        updatedProduct = {
          ...updatedProduct,
          imagen: imageUrl,
        };
      }

      await updateProduct(id, updatedProduct);

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      setErrors({
        general:
          "No fue posible guardar los cambios. Intentá nuevamente.",
      });

      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-product-loading d-flex justify-content-center align-items-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Cargando producto...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="edit-product-container animate-fade-in">

      <h1 className="edit-product-title">
        Editar producto
      </h1>

      {errors.general && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      <div
        className={`edit-product-form-wrapper ${
          isSubmitting ? "loading" : ""
        }`}
      >
        <ProductForm
          title="Editar producto"
          submitText={
            isSubmitting
              ? "Guardando..."
              : "Guardar cambios"
          }
          product={product}
          errors={errors}
          loading={isSubmitting}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />
      </div>

    </section>
  );
};
