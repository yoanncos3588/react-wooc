import { AxiosRequestHeaders } from "axios";
import OAuth from "oauth-1.0a";
import { axiosInstanceWp, axiosInstanceWoo, UserStored } from "./api";

/** WP - Create or delete local token on server response status */
axiosInstanceWp.interceptors.response.use(
  (res) => {
    if (res.config.url === "/jwt-auth/v1/token/" && res.data.token) {
      const user: UserStored = { username: res.data.user_display_name, token: res.data.token };
      localStorage.setItem("user", JSON.stringify(user));
    }
    return res;
  },
  (error) => {
    const code = error.response.data.code;
    if (code === "jwt_auth_invalid_token" || code === "jwt_auth_invalid_token") {
      localStorage.removeItem("user");
    }
  }
);

/**  WOOC - add OAUTH for woocommerce api */
axiosInstanceWoo.interceptors.request.use(
  (config) => {
    if (!config.method) {
      throw Error("Missing method type for api request");
    }
    const queryParameters = new URLSearchParams(config.params).toString();
    const completeUrl = `${config.baseURL}${config.url}${queryParameters ? "?" + queryParameters : ""}`;

    // Create REST API credentials for WC
    // info : https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication-over-http
    const oauth = new OAuth({
      consumer: { key: import.meta.env.VITE_CONSUMER_KEY, secret: import.meta.env.VITE_CONSUMER_SECRET },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
      },
    });

    config.headers = oauth.toHeader(oauth.authorize({ url: completeUrl, method: config.method })) as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    console.log(error.request);
  }
);
