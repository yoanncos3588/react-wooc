import { categoriesQuery, countriesQuery, productsQuery } from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import { buildApiParams } from "./services/filters/products";

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const query = countriesQuery();
  // if data in cache is undefined then fetch new data
  return await queryClient.ensureQueryData(query);
};

export const categoryLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: { params: Params<"id">; request: Request }) => {
    const id = params.id as string;
    const searchParams = new URL(request.url).searchParams;
    const queryCategory = categoriesQuery();
    const queryProducts = productsQuery(buildApiParams(id, searchParams));
    return await Promise.all([queryClient.ensureQueryData(queryCategory), queryClient.ensureQueryData(queryProducts)]);
  };
