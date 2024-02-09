import axios from "axios";
import { AxiosRequestHeaders } from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import category from "./category";
import product from "./product";
import country from "./country";
import customer from "./customer";

export const api = {
  category,
  product,
  country,
  customer,
};

export interface UserStored {
  username: string;
  token: string;
}

/**
 * Determine AuthHeader if token is locally stored
 * @returns
 */
function getAuthHeader() {
  const user: UserStored | undefined = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : undefined;
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

export const axiosInstanceWoo = axios.create({
  baseURL: import.meta.env.VITE_API_URL_WOO,
});

export const axiosInstanceWp = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: getAuthHeader(),
});

/** WP - Create or delete local token on server response status */
axiosInstanceWp.interceptors.response.use(
  (res) => res,
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
    console.log("intercept");
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
