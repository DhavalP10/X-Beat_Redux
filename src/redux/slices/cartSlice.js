import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    notification: null,
  },
  reducers: {
    addToCart: (state, action) => {
  const product = action.payload;
  const existing = state.items.find(item => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.items.push({ ...product, quantity: 1 });
  }

  state.notification = `${product.title} added to cart!`;
},

clearNotification: (state) => {
  state.notification = null;
},

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i._id === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i._id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );
    },

    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearNotification,
} = cartSlice.actions;

export default cartSlice.reducer;
