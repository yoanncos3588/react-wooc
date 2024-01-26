import axios, { AxiosRequestHeaders } from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import { category } from "./category";

export const api = {
  category,
};

export const axiosInstanceWoo = axios.create({
  baseURL: import.meta.env.VITE_API_URL_WOO,
});

export const axiosInstanceWp = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `${localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : ``}`,
  },
});

// add OAUTH for woocommerce api
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
