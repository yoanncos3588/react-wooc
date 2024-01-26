import { axiosInstanceWoo } from "./api";

const category = {
  /**
   * fetch 100 first categories (100 is the max limit with wc api). Check pagination if categories could be > 100
   */
  getAll: async () => {
    return await axiosInstanceWoo.get(`/products/categories?per_page=100`);
  },
  /**
   * fetch categories by page
   */
  getByPage: async (page: string) => {
    return await axiosInstanceWoo.get(`/products/categories?page=${page}`);
  },
};

export default category;
