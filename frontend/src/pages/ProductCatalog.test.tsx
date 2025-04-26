import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "../store/slices/productsSlice";
import { ProductCatalog } from "./ProductCatalog";
import { ProductsState } from "../store/slices/productsSlice";

// Mock the fetchProducts thunk
vi.mock("../store/slices/productsSlice", () => ({
  fetchProducts: vi.fn(() => ({ type: "products/fetchProducts/pending" })),
  default: vi.fn((state = {}, action) => {
    switch (action.type) {
      case "products/fetchProducts/pending":
        return { ...state, status: "loading" as const };
      case "products/fetchProducts/fulfilled":
        return {
          ...state,
          status: "succeeded" as const,
          items: action.payload.items,
          total: action.payload.total,
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          totalPages: action.payload.totalPages,
        };
      case "products/fetchProducts/rejected":
        return {
          ...state,
          status: "failed" as const,
          error: action.error.message,
        };
      default:
        return state;
    }
  }),
}));

describe("ProductCatalog", () => {
  const mockProducts = {
    items: [
      {
        id: 1,
        name: "Test Product",
        price: 99.99,
        category: "Test Category",
        image: "test-image.jpg",
        brand: "Test Brand",
        year: 2024,
        season: "Spring",
      },
    ],
    total: 1,
    page: 1,
    pageSize: 12,
    totalPages: 1,
  };

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
          total: 0,
          page: 1,
          pageSize: 12,
          totalPages: 0,
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

  it("renders loading state", () => {
    renderProductCatalog({ status: "loading" as const });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error state", () => {
    renderProductCatalog({ status: "failed" as const, error: "Test error" });
    expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();
  });

  it("renders products when data is loaded", () => {
    renderProductCatalog({
      status: "succeeded" as const,
      items: mockProducts.items,
      total: mockProducts.total,
      page: mockProducts.page,
      pageSize: mockProducts.pageSize,
      totalPages: mockProducts.totalPages,
    });

    expect(screen.getByText("StyleDen Catalog")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("handles pagination", async () => {
    renderProductCatalog({
      status: "succeeded" as const,
      items: mockProducts.items,
      total: mockProducts.total,
      page: 1,
      pageSize: mockProducts.pageSize,
      totalPages: 2,
    });

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledWith({ page: 2, pageSize: 12 });
    });
  });

  it("handles add to cart", () => {
    const consoleSpy = vi.spyOn(console, "log");
    renderProductCatalog({
      status: "succeeded" as const,
      items: mockProducts.items,
      total: mockProducts.total,
      page: mockProducts.page,
      pageSize: mockProducts.pageSize,
      totalPages: mockProducts.totalPages,
    });

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Adding to cart:",
      mockProducts.items[0]
    );
  });
});
