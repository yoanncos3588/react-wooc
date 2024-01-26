import { axiosInstanceWoo } from "./api";

const country = {
  get: async () => {
    return await axiosInstanceWoo.get("/data/countries");
  },
};

export default country;
