import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  productsApi,
  Product,
  ProductsResponse,
  FilterParams,
} from "../../api/productsApi";

export interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: FilterParams;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  filters: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters?: FilterParams) => {
    const response = await productsApi.getProducts(filters);
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
