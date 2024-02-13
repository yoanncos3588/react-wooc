import { categoriesQuery, countriesQuery, productsQueryByCategory } from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const query = countriesQuery();
  // if data in cache is undefined then fetch new data
  return await queryClient.ensureQueryData(query);
};

export const categoryLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<"id"> }) => {
    const queryCategory = categoriesQuery();
    const queryProducts = productsQueryByCategory(params.id);
    return await Promise.all([queryClient.ensureQueryData(queryCategory), queryClient.ensureQueryData(queryProducts)]);
  };
