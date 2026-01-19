import axios from "axios";

const API_URL = "https://app-backend-ruby.vercel.app";

const getProducts = async (filters = {}) => {
  try {
    let query = "";

    if (Object.keys(filters).length > 0) {
      const queryString = new URLSearchParams(filters).toString();
      query = `?${queryString}`;
    }
    const response = await axios.get(`${API_URL}/xbeat/products${query}`);
    return response.data.data; // ✅ products array
  } catch (error) {
    console.warn("error in get products:", error);
    return [];
  }
};

const getProductById = async (id) =>{
  try {
    const response = await axios.get(`${API_URL}/xbeat/product/${id}`);
    return response.data.data;
  }catch(error){
    console.warn("Error in getting productbyId:",error);
    return null;
  }
};

export default {
  getProducts, getProductById
};