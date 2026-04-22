import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../contacts/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ mode, categoryId }, { rejectWithValue }) => {
    try {
      let url = API_URL;

      if (mode === "sale") {
        url += `/products/all`;
      } else if (mode === "category") {
        url += `/categories/${categoryId}`;
      } else {
        url += `/products/all`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      const data = response.data;

      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        let data = action.payload;

        if (Array.isArray(data)) {
        } else if (data.data) {
          data = data.data;
        } else if (data.products) {
          data = data.products;
        } else {
          data = [];
        }

        if (action.meta.arg.mode === "sale") {
          state.items = data.filter(
            (item) => item.discont_price && item.discont_price < item.price,
          );
        } else {
          state.items = data;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
