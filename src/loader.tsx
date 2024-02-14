import { categoriesQuery, countriesQuery, productsQuery } from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const query = countriesQuery();
  // if data in cache is undefined then fetch new data
  return await queryClient.ensureQueryData(query);
};

export const categoryLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: { params: Params<"id">; request: Request }) => {
    const id = params.id as string;
    const pageSearchParams = new URL(request.url).searchParams.get("page");
    const queryCategory = categoriesQuery();
    const queryProducts = productsQuery(pageSearchParams ? { categories: id, page: pageSearchParams } : { categories: id });
    return await Promise.all([queryClient.ensureQueryData(queryCategory), queryClient.ensureQueryData(queryProducts)]);
  };
