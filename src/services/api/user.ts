import { axiosInstanceWp } from "./api";

const user = {
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
    return await axiosInstanceWp.get("/wp/v2/users/me");
  },
};

export default user;
