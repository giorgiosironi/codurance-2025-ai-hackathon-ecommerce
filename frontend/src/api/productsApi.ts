import axios from "axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  brand: string;
  year: number;
  season: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const API_BASE_URL = "http://localhost:5000/api";

export const productsApi = {
  getProducts: async (
    page: number = 1,
    pageSize: number = 12
  ): Promise<ProductsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { page, pageSize },
    });
    return response.data;
  },
};
