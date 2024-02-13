import { UrlParams } from "../../types/apiParams";
import { axiosInstanceWoo } from "./api";

const category = {
  /**
   * Fetch products categories
   * https://woocommerce.github.io/woocommerce-rest-api-docs/#product-categories
   */
  getParent0: async (params?: UrlParams) => {
    return await axiosInstanceWoo.get(`/products/categories?per_page=99&parent=0`, params);
  },
};

export default category;
