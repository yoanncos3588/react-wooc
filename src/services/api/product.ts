import { camelCase } from "change-case/keys";
import { UrlParams } from "../../types/apiParams";
import { Product } from "../../types/products";
import { axiosInstanceWoo } from "./api";

interface PaginatedPayload {
  totalPages: number;
  totalItems: number;
}

interface PayloadFetchProducts extends PaginatedPayload {
  products: Product[];
}

interface PayloadFetchVariations extends PaginatedPayload {
  variations: ProductVariation[];
}

export const product = {
  /**
   * Fetch products from api, with possibles filters
   * @param params @type {UrlParams} : obj listing all parameters use to construct url parameters for filtering
   */
  fetchProducts: async (params?: UrlParams): Promise<PayloadFetchProducts> => {
    const res = await axiosInstanceWoo.get("/products", { params: params });

    const productsRaw = res.data;
    const products: Product[] = productsRaw.map((product: unknown) => camelCase(product, 2));

    const totalPages = Number(res.headers["x-wp-totalpages"]);
    const totalItems = Number(res.headers["x-wp-total"]);

    const payload: PayloadFetchProducts = { products, totalPages, totalItems };

    return payload;
  },
};
