import { axiosInstanceWoo } from "./api";

/**
 * fetch list of countries from WC api
 */
const country = {
  get: async () => {
    return await axiosInstanceWoo.get("/data/countries");
  },
};

export default country;
