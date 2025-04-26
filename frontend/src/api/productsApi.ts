import axios from "axios";

export interface Product {
  id: number;
  productDisplayName: string;
  masterCategory: string;
  subCategory: string;
  articleType: string;
  baseColour: string;
  gender: string;
  season: string;
  year: number;
  usage: string;
}

export interface ProductsResponse {
  items: Product[];
}

export interface FilterParams {
  masterCategory?: string;
  subCategory?: string;
  gender?: string;
  baseColour?: string;
  season?: string;
  usage?: string;
  [key: string]: string | undefined;
}

const API_BASE_URL = "http://localhost:5000";

export const productsApi = {
  getProducts: async (filters?: FilterParams): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
    }

    const response = await axios.get(`${API_BASE_URL}/products`, {
      params,
    });
    return response.data;
  },

  getProductImageUrl: (productId: number): string => {
    return `${API_BASE_URL}/images/${productId}`;
  },
};
