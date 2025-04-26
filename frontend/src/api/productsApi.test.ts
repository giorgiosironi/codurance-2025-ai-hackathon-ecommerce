import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { productsApi } from "./productsApi";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

describe("productsApi", () => {
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

  it("fetches products successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProductsResponse });

    const result = await productsApi.getProducts(1, 12);

    expect(result).toEqual(mockProductsResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5000/api/products",
      { params: { page: 1, pageSize: 12 } }
    );
  });

  it("handles API errors", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(productsApi.getProducts(1, 12)).rejects.toThrow(errorMessage);
  });
});
