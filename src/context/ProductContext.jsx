import { createContext, useState } from "react";
import * as productService from "../services/productService";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // ✅ global loading only

  /* ===================== GENERIC FETCH ===================== */
  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await productService.getProducts(filters); // ✅ accepts filters
      return data || [];
    } catch (err) {
      console.error("Failed to load products", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /* ===================== FETCH BY ID ===================== */
  const fetchProductById = async (id) => {
    if (!id) return null;
    return await productService.getProductById(id);
  };

  return (
    <ProductContext.Provider
      value={{
        fetchProducts,   // ✅ pages call this
        fetchProductById,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
