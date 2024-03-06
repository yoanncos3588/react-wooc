import { UrlParams } from "../../types/apiParams";

interface Filter {
  key: string;
  label: string;
  orderby: string;
  order: string;
}

interface QueriesAvailable {
  [key: string]: { key: string; values?: Array<string> };
}

export const queriesAvailable: QueriesAvailable = {
  orderBy: { key: "orderby", values: ["title", "price", "date"] },
  order: { key: "order", values: ["asc", "desc"] },
  onSale: { key: "on_sale", values: ["true", "false"] },
  minPrice: { key: "min_price" },
  maxPrice: { key: "max_price" },
};

/**
 * Find if a key exist in queriesAvailable obj and test if the value exist for this key
 */
export function validParam(key: string): boolean {
  for (const query in queriesAvailable) {
    if (key === queriesAvailable[query].key) {
      return true;
    }
  }
  return false;
}

/**
 * Build api parameters from an urlSearchParams instance
 */
export function buildApiParams(id: string, urlSearchParams: URLSearchParams): UrlParams {
  const params: UrlParams = {};
  const page = urlSearchParams.get("page");
  params.category = id;
  if (page && page !== "1") {
    params.page = page;
  }
  for (const [key, value] of urlSearchParams) {
    if (validParam(key)) {
      params[key] = value;
    }
  }
  return params;
}

export const selectFilterDefaultValue = { key: "default", label: "Plus récents", orderby: "date", order: "asc" };

export const selectFilterValues: Array<Filter> = [
  selectFilterDefaultValue,
  { key: "older", label: "Plus anciens ", orderby: "date", order: "desc" },
  { key: "name", label: "Nom (A-z)", orderby: "title", order: "asc" },
  { key: "nameReverse", label: "Nom (Z-a)", orderby: "title", order: "desc" },
  { key: "price", label: "Plus chers", orderby: "price", order: "asc" },
  { key: "priceReverse", label: "Moins chers", orderby: "price", order: "desc" },
];

export function findFilterByParams(orderBy: string | null, order: string | null) {
  if (!orderBy || !order) {
    return undefined;
  }
  return selectFilterValues.find((filter) => filter.orderby === orderBy && filter.order === order);
}

export function findFilterByKey(key: string) {
  return selectFilterValues.find((filter) => filter.key === key);
}
