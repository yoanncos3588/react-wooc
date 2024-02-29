import { camelCase } from "change-case/keys";
import { api } from "./services/api/api";
import { UrlParams } from "./types/apiParams";
import { AxiosResponse } from "axios";

const options = { refetchOnWindowFocus: false, refetchOnMount: false };

interface dataHeaders {
  totalPages: string;
  total: string;
}

interface formatedDataResponseType<T> {
  headers?: dataHeaders;
  data: T;
}

/**
 * transform axios data response to use camelcase on object keys
 */
function formatDataToCamelCase(data: unknown) {
  let formated = null;
  if (Array.isArray(data)) {
    formated = data.map((item: unknown) => camelCase(item));
  } else {
    formated = camelCase(data);
  }
  return formated;
}

/**
 * clean axio's response
 */
function formatDataResponse(response: AxiosResponse<unknown, unknown>): formatedDataResponseType<unknown> {
  const dataResponse: formatedDataResponseType<unknown> = {
    data: formatDataToCamelCase(response.data),
  };
  if (response.headers["x-wp-totalpages"] && response.headers["x-wp-total"]) {
    dataResponse.headers = {
      totalPages: response.headers["x-wp-totalpages"],
      total: response.headers["x-wp-total"],
    };
  }
  return dataResponse;
}

export const countriesQuery = () => ({
  ...options,
  queryKey: ["countries"],
  queryFn: async () => {
    const res = await api.country.get();
    return formatDataResponse(res);
  },
});

export const categoriesTopLevelQuery = () => ({
  ...options,
  queryKey: ["categoriesTopLevel"],
  queryFn: async () => {
    const res = await api.category.getTopLevel();
    return formatDataResponse(res);
  },
});

export const categoriesQuery = () => ({
  ...options,
  queryKey: ["categories"],
  queryFn: async () => {
    const res = await api.category.getAll();
    return formatDataResponse(res);
  },
  staleTime: 10 * (60 * 1000), // 10 mins
});

export const productsQuery = (params: UrlParams) => ({
  ...options,
  queryKey: ["products", params],
  queryFn: async () => {
    const res = await api.product.getAll(params);
    return formatDataResponse(res);
  },
});
