import { AxiosResponse } from "axios";
import { UrlParams } from "../../types/apiParams";
import { axiosInstanceWoo } from "./api";
import { Product } from "../../types/products";

const product = {
  /**
   * Fetch products from api, with possibles filters
   * @param params @type {UrlParams} : obj listing all parameters use to construct url parameters for filtering
   */
  getAll: async (params?: UrlParams): Promise<AxiosResponse<Product, unknown>> => {
    return await axiosInstanceWoo.get("/products", { params });
  },
  /**
   * Fetch products from api by id
   * @param productId @type {number} : product id to fetch
   */
  getById: async (productId: number, params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/${productId}`, { params });
  },
  /**
   * Fetch variation from api by id
   * @param productId @type {number} : product id parent of the variation
   * @param productVariationId @type {number} : variation id to fetch
   */
  getVariationById: async (productId: number, productVariationId: number, params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/${productId}/variations/${productVariationId}`, { params });
  },
  /**
   * Fetch variations from api
   * @param productId @type {number} : product id parent of the variations
   * @param params @type {UrlParams} : obj listing all parameters use to construct url parameters for filtering
   */
  getVariations: async (productId: number, params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/${productId}/variations`, { params });
  },
  /**
   * Fetch attributes from api
   */
  getAttributes: async (params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/attributes?per_page=100`, { params });
  },
  /**
   * Fetch attribute from api by id
   * @param attributeId @type {number} : attribute's id
   */
  getAttributeById: async (attributeId: number, params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/attributes/${attributeId}`, params);
  },
  /**
   * Fetch attributes terms from api
   * @param attributeId @type {number} : attribute's id
   */
  getAttributeTerms: async (attributeId: number, params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/attributes/${attributeId}/terms?per_page=100`, { params });
  },
};

export default product;
