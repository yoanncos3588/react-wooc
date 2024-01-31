import { api } from "./services/api/api";

export const countriesQuery = () => ({
  queryKey: ["countries"],
  queryFn: async () => api.country.get(),
  refetchOnWindowFocus: false,
});
