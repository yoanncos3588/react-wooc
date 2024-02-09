import axios from "axios";

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
