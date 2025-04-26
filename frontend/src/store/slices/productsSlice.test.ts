import { describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./productsSlice";
import { productsApi } from "../../api/productsApi";

vi.mock("../../api/productsApi");

describe("products slice", () => {
  const mockProductsResponse = {
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

  const createTestStore = () => {
    return configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  };

  it("should handle initial state", () => {
    const store = createTestStore();
    const state = store.getState().products;

    expect(state.items).toEqual([]);
    expect(state.status).toBe("idle");
    expect(state.error).toBeNull();
  });

  it("should handle fetchProducts.pending", async () => {
    const store = createTestStore();
    vi.mocked(productsApi.getProducts).mockImplementation(
      () => new Promise(() => {})
    );

    store.dispatch(fetchProducts({ page: 1, pageSize: 12 }));
    const state = store.getState().products;

    expect(state.status).toBe("loading");
  });

  it("should handle fetchProducts.fulfilled", async () => {
    const store = createTestStore();
    vi.mocked(productsApi.getProducts).mockResolvedValueOnce(
      mockProductsResponse
    );

    await store.dispatch(fetchProducts({ page: 1, pageSize: 12 }));
    const state = store.getState().products;

    expect(state.status).toBe("succeeded");
    expect(state.items).toEqual(mockProductsResponse.items);
    expect(state.total).toBe(mockProductsResponse.total);
    expect(state.page).toBe(mockProductsResponse.page);
    expect(state.pageSize).toBe(mockProductsResponse.pageSize);
    expect(state.totalPages).toBe(mockProductsResponse.totalPages);
  });

  it("should handle fetchProducts.rejected", async () => {
    const store = createTestStore();
    const errorMessage = "Failed to fetch products";
    vi.mocked(productsApi.getProducts).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await store.dispatch(fetchProducts({ page: 1, pageSize: 12 }));
    const state = store.getState().products;

    expect(state.status).toBe("failed");
    expect(state.error).toBe(errorMessage);
  });
});
