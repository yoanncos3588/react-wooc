import { snakeCase } from "change-case/keys";
import { Customer } from "../../types/user";
import { axiosInstanceWoo } from "./api";

const customer = {
  /**
   * Créer un compte client via l'api woocommerce
   * https://woocommerce.github.io/woocommerce-rest-api-docs/#create-a-customer
   */
  create: async (customer: Customer) => {
    return await axiosInstanceWoo.post("/customers", snakeCase(customer, 2));
  },
  /**
   * Get user's infos not formatted from api
   * https://developer.wordpress.org/rest-api/reference/users/#definition-example-request-2
   */
  get: async (customerId: number) => {
    return await axiosInstanceWoo.get(`/customers/${customerId}`);
  },
};

export default customer;
