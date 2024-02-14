import { api } from "./services/api/api";
import { UrlParams } from "./types/apiParams";

export const countriesQuery = () => ({
  queryKey: ["countries"],
  queryFn: async () => api.country.get(),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
});

export const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: async () => api.category.getParent0(),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
});

export const productsQuery = (params: UrlParams) => ({
  queryKey: ["products", params],
  queryFn: async () => api.product.getAll(params),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
});
