import { categoriesQuery, countriesQuery, productQuery, productsQuery } from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import { buildApiParams } from "./services/filters/products";

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const query = countriesQuery();
  // if data in cache is undefined then fetch new data
  return await queryClient.ensureQueryData(query);
};

export const categoryProductsLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: { params: Params<"id">; request: Request }) => {
    const id = params.id as string;
    const searchParams = new URL(request.url).searchParams;
    const queryProducts = productsQuery(buildApiParams(id, searchParams));
    return await queryClient.ensureQueryData(queryProducts);
  };

export const categoriesLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData(categoriesQuery());
};

export const productLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<"id"> }) => {
    const { id } = params;
    if (!id) {
      throw new Response("Produit introuvable", { status: 404 });
    }
    const res = await queryClient.ensureQueryData(productQuery(id));
    return res;
  };
