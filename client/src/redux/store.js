import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice/categoriesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
