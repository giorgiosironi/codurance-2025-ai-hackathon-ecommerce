import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ProductCatalog } from "./ProductCatalog";
import productsReducer, { fetchProducts } from "../store/slices/productsSlice";
import { ProductsState } from "../store/slices/productsSlice";

const mockProducts = [
  {
    id: 1,
    productDisplayName: "Test Product 1",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "Tshirts",
    baseColour: "Blue",
    gender: "Men",
    season: "Summer",
    year: 2024,
    usage: "Casual",
  },
  {
    id: 2,
    productDisplayName: "Test Product 2",
    masterCategory: "Apparel",
    subCategory: "Bottomwear",
    articleType: "Jeans",
    baseColour: "Black",
    gender: "Women",
    season: "Winter",
    year: 2024,
    usage: "Casual",
  },
];

// Mock the fetchProducts thunk
vi.mock("../store/slices/productsSlice", async () => {
  const actual = await vi.importActual("../store/slices/productsSlice");
  return {
    ...actual,
    fetchProducts: vi.fn(() => async (dispatch: any) => {
      dispatch({ type: "products/fetchProducts/pending" });
      try {
        dispatch({
          type: "products/fetchProducts/fulfilled",
          payload: mockProducts,
        });
      } catch (error) {
        dispatch({
          type: "products/fetchProducts/rejected",
          error: { message: "Failed to fetch products" },
        });
      }
    }),
  };
});

const renderProductCatalog = (initialState: Partial<ProductsState> = {}) => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    preloadedState: {
      products: {
        items: [],
        status: "idle" as const,
        error: null,
        ...initialState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <ProductCatalog />
    </Provider>
  );
};

describe("ProductCatalog", () => {
  it("renders loading state initially", () => {
    renderProductCatalog({ status: "loading" as const });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", () => {
    renderProductCatalog({
      status: "failed" as const,
      error: "Failed to fetch products",
    });
    expect(screen.getByText("Failed to fetch products")).toBeInTheDocument();
  });

  it("renders products when fetch succeeds", async () => {
    renderProductCatalog({
      status: "succeeded" as const,
      items: mockProducts,
    });

    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    });
  });
});
