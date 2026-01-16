import axios from "axios";
const API_URL = "https://app-backend-ruby.vercel.app";

export const getProducts = async (filters = {}) => {
  try {
    const query =
      Object.keys(filters).length > 0
        ? `?${new URLSearchParams(filters).toString()}`
        : "";

    const response = await axios.get(
      `${API_URL}/xbeat/products${query}`
    );

    return response.data.data;
  } catch (error) {
    console.warn("error in getProducts:", error);
    return [];
  }
};


export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/xbeat/product/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.warn("error in getProductById:", error);
    return null;
  }
};