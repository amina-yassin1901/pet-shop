import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../contacts/api";

export const sendOrder = createAsyncThunk(
  "cart/sendOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/order/send`, orderData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

const loadCartFromStorage = () => {
  try {
    const persistedState = localStorage.getItem("cart");
    return persistedState ? JSON.parse(persistedState) : [];
  } catch (e) {
    return [];
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, discont_price, image, count } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.count += count;
      } else {
        state.items.push({ id, title, price, discont_price, image, count });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrementCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  incrementCount,
  decrementCount,
  removeFromCart,
  clearCart,
  resetStatus,
} = cartSlice.actions;
export default cartSlice.reducer;
