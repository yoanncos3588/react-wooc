import { api } from "./services/api/api";

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

export const productsQueryByCategory = (categoryId: string | undefined) => ({
  queryKey: ["products", categoryId],
  queryFn: async () => (categoryId ? api.product.getAll({ category: categoryId }) : { data: [] }),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  enabled: !!categoryId, // disable if categoryId is undefined
});
