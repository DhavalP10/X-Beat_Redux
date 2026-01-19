import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../../services/productService";
/* ===================== THUNKS ===================== */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ type, filters = {} }) => {
    const data = await productService.getProducts(filters);
    return { type, data };
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const res = await productService.getProductById(id);
    return res;
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ category, excludeId }) => {
    const data = await productService.getProducts({ category });
    return data.filter(item => item._id !== excludeId);
  }
);

/* ===================== SLICE ===================== */

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsByTag: {
      hero: [],
      featured: [],
      all: [],
      search: [],
    },
    loadingByTag: {
      hero: false,
      featured: false,
      all: false,
    },
    productDetails: {
      item: null,
      related: [],
      loading: false,
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ===== HOME PRODUCTS ===== */
      .addCase(fetchProducts.pending, (state, action) => {
        const type = action.meta.arg.type;
        state.loadingByTag[type] = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state.productsByTag[type] = data;
        state.loadingByTag[type] = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = "Failed to load products";
      })

      /* ===== PRODUCT DETAILS ===== */
      .addCase(fetchProductById.pending, (state) => {
        state.productDetails.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetails.item = action.payload;
        state.productDetails.loading = false;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.productDetails.loading = false;
        state.error = "Failed to load product";
      })

      /* ===== RELATED PRODUCTS ===== */
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.productDetails.related = action.payload;
      });
  },
});

export default productSlice.reducer;
