import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

// ========================================================
// REFERENCIA CENTRALIZADA
// ========================================================
const COLLECTION = "productosavicolas";

const productsRef = collection(
  db,
  COLLECTION
);

// ========================================================
// HELPERS
// ========================================================
const mapProduct = (document) => ({
  id: document.id,
  ...document.data(),
});

const mapSnapshot = (snapshot) =>
  snapshot.docs.map(mapProduct);

// ========================================================
// GET ALL PRODUCTS
// ========================================================
export const getProducts = async () => {

  try {

    const productsQuery = query(
      productsRef,
      orderBy("producto", "asc")
    );

    const snapshot = await getDocs(productsQuery);

    return mapSnapshot(snapshot);

  } catch (error) {

    console.error(
      "Error obteniendo productos:",
      error
    );

    return [];

  }

};

// ========================================================
// GET PRODUCT BY ID
// ========================================================
export const getProductById = async (id) => {

  try {

    const productRef = doc(
      productsRef,
      id
    );

    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    return mapProduct(snapshot);

  } catch (error) {

    console.error(
      "Error obteniendo producto:",
      error
    );

    return null;

  }

};

// ========================================================
// GET BY CATEGORY
// ========================================================
export const getByCategory = async (categoria) => {

  try {

    const productsQuery = categoria

      ? query(
          productsRef,
          where(
            "categoria",
            "==",
            categoria
          ),
          orderBy(
            "producto",
            "asc"
          )
        )

      : query(
          productsRef,
          orderBy(
            "producto",
            "asc"
          )
        );

    const snapshot = await getDocs(productsQuery);

    return mapSnapshot(snapshot);

  } catch (error) {

    console.error(
      "Error filtrando productos:",
      error
    );

    return [];

  }
};

// ========================================================
// CREATE PRODUCT
// ========================================================
export const createProduct = async (
  productData
) => {

  try {

    const document = await addDoc(
      productsRef,
      {
        ...productData,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      }
    );

    return document.id;

  } catch (error) {

    console.error(
      "[productService] Error creando producto",
      error
    );

    throw error;

  }

};

// ========================================================
// UPDATE PRODUCT
// ========================================================
export const updateProduct = async (
  id,
  updatedData
) => {

  try {

    const productRef = doc(
      productsRef,
      id
    );

    const {
      imageFile,
      ...productData
    } = updatedData;

    await updateDoc(
      productRef,
      {
        ...productData,

        updatedAt:
          serverTimestamp(),
      }
    );

  } catch (error) {

    console.error(
      "Error actualizando producto:",
      error
    );

    throw error;
  }

};

// ========================================================
// DELETE PRODUCT
// ========================================================
export const deleteProduct = async (
  id
) => {
  try {

    const productRef = doc(
      productsRef,
      id
    );

    await deleteDoc(productRef);

  } catch (error) {

    console.error(
      "Error eliminando producto:",
      error
    );

    throw error;
  }

};
