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

const API_BASE_URL = "http://localhost:5000";

export const productsApi = {
  getProducts: async (): Promise<ProductsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },
};
