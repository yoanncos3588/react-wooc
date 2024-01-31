import { countriesQuery } from "./queries";
import { QueryClient } from "@tanstack/react-query";

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const query = countriesQuery();
  // if data in cache is undefined then fetch new data
  return await queryClient.ensureQueryData(query);
};
