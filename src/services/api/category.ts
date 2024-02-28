import { AxiosResponse } from "axios";
import { UrlParams } from "../../types/apiParams";
import { axiosInstanceWoo } from "./api";
import { ProductCategorie } from "../../types/categories";

const category = {
  /**
   * Fetch top categories (exclude empty ones)
   * https://woocommerce.github.io/woocommerce-rest-api-docs/#product-categories
   */
  getTopLevel: async (params?: UrlParams): Promise<AxiosResponse<ProductCategorie[], unknown>> => {
    return await axiosInstanceWoo.get(`/products/categories?per_page=99&parent=0&hide_empty=true`, { params });
  },
  getAll: async (params?: UrlParams): Promise<AxiosResponse<ProductCategorie[], unknown>> => {
    return await axiosInstanceWoo.get(`/products/categories?per_page=99&hide_empty=true`, { params });
  },
  getById: async (id: string, params?: UrlParams): Promise<AxiosResponse<ProductCategorie[], unknown>> => {
    return await axiosInstanceWoo.get(`/products/categories/${id}`, { params });
  },
};

export default category;
