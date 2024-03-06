export interface LocationInfos {
  firstName: string;
  lastName: string;
  company: string | "";
  address_1: string;
  address_2: string | "";
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingInfos extends Omit<LocationInfos, "email" | "phone"> {}
