import { api } from "./services/api/api";
import { UrlParams } from "./types/apiParams";

const options = { refetchOnWindowFocus: false, refetchOnMount: false };

export const countriesQuery = () => ({
  ...options,
  queryKey: ["countries"],
  queryFn: async () => api.country.get(),
});

export const categoriesTopLevelQuery = () => ({
  ...options,
  queryKey: ["categoriesTopLevel"],
  queryFn: async () => api.category.getTopLevel(),
});

export const categoriesQuery = () => ({
  ...options,
  queryKey: ["categories"],
  queryFn: async () => api.category.getAll(),
  staleTime: 10 * (60 * 1000), // 10 mins
});

export const productsQuery = (params: UrlParams) => ({
  ...options,
  queryKey: ["products", params],
  queryFn: async () => api.product.getAll(params),
});
