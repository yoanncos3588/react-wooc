import { camelCase } from "change-case/keys";
import { api } from "./services/api/api";
import { UrlParams } from "./types/apiParams";
import { AxiosResponse } from "axios";

const options = { refetchOnWindowFocus: false, refetchOnMount: false };

interface dataHeaders {
  totalPages: string;
  total: string;
}

export interface FormatedDataResponseType<T> {
  headers?: dataHeaders;
  data: T;
}

/**
 * transform axios data response to use camelcase on object keys
 */
function formatDataToCamelCase(data: unknown) {
  let formated = null;
  if (Array.isArray(data)) {
    formated = data.map((item: unknown) => camelCase(item, 4));
  } else {
    formated = camelCase(data, 4);
  }
  return formated;
}

/**
 * clean axio's response
 */
function formatDataResponse(response: AxiosResponse<unknown, unknown>): FormatedDataResponseType<unknown> {
  const dataResponse: FormatedDataResponseType<unknown> = {
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

export const productsQuery = (params: UrlParams | URLSearchParams, queryOptions = {}) => ({
  ...options,
  queryKey: ["products", params],
  queryFn: async () => {
    const res = await api.product.getAll(params);
    return formatDataResponse(res);
  },
  ...queryOptions,
});

export const productQuery = (id: string) => ({
  ...options,
  queryKey: ["product", id],
  queryFn: async () => {
    const resProduct = await api.product.getById(Number(id));
    return formatDataResponse(resProduct);
  },
});

export const productVariationsQuery = (id: string, params: UrlParams | URLSearchParams, queryOptions = {}) => ({
  ...options,
  queryKey: ["productVariations", id, params],
  queryFn: async () => {
    const resProduct = await api.product.getVariations(Number(id), params);
    return formatDataResponse(resProduct);
  },
  ...queryOptions,
});

export const productAttributeQuery = (id: string) => ({
  ...options,
  queryKey: ["productAttribute", id],
  queryFn: async () => {
    const res = await api.product.getAttributeById(Number(id));
    return formatDataResponse(res);
  },
});

export const attributeTermsQuery = (attributeId: string) => ({
  ...options,
  queryKey: ["attributeTerms", attributeId],
  queryFn: async () => {
    const res = await api.product.getAttributeTerms(Number(attributeId));
    return formatDataResponse(res);
  },
});

export const getUserWPQuery = () => ({
  ...options,
  queryKey: ["getUserWP"],
  queryFn: async () => {
    const res = await api.user.get();
    return formatDataResponse(res);
  },
});

export const getCustomerQuery = (customerId: number) => ({
  ...options,
  queryKey: ["getCustomerQuery", customerId],
  queryFn: async () => {
    const res = await api.customer.get(customerId);
    return formatDataResponse(res);
  },
  enabled: !!customerId,
});

export const getOrder = (orderId: number) => ({
  ...options,
  queryKey: ["getOrder", orderId],
  queryFn: async () => {
    const res = await api.order.get(orderId);
    return formatDataResponse(res);
  },
  enabled: !!orderId,
});
