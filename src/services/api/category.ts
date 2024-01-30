import { UrlParams } from "../../types/apiParams";
import { axiosInstanceWoo } from "./api";

const category = {
  /**
   * Fetch products categories
   * https://woocommerce.github.io/woocommerce-rest-api-docs/#product-categories
   */
  get: async (params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/categories`, params);
  },
};

export default category;
