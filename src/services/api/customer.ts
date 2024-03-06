import { snakeCase } from "change-case/keys";
import { Customer } from "../../types/user";
import { axiosInstanceWoo, axiosInstanceWp } from "./api";

const customer = {
  /**
   * Créer un compte client via l'api woocommerce
   * https://woocommerce.github.io/woocommerce-rest-api-docs/#create-a-customer
   */
  create: async (customer: Customer) => {
    return await axiosInstanceWoo.post("/customers", snakeCase(customer, 2));
  },
  /**
   * Retrieve jwt
   * https://fr.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
   */
  login: async ({ username, password }: { username: string; password: string }) => {
    return await axiosInstanceWp.post("/jwt-auth/v1/token/", { username, password });
  },
  /**
   * Get user's infos not formatted from api
   * https://developer.wordpress.org/rest-api/reference/users/#definition-example-request-2
   */
  get: async () => {
    return await axiosInstanceWp.post("/wp/v2/users/me");
  },
};

export default customer;
