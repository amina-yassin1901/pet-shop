import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice/categoriesSlice";
import productsReducer from "./slices/productsSlice/productsSlice";
import cartReducer from "./slices/cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
