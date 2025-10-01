import { appClient } from "../utils/app-client";

type Params = {
  page?: number;
  filter?: {
    price_from?: number;
    price_to?: number;
  };
  sort?: string;
};

const PRODUCTS_URL = "/products";

export const fetchProducts = async (params: Params) => {
  const response = await appClient.get(PRODUCTS_URL, { params });
  return response.data;
};

export const fetchProduct = async (id: string) => {
  const response = await appClient.get(`${PRODUCTS_URL}/${id}`);
  return response.data;
};
