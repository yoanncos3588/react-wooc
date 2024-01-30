import { BillingInfos, ShippingInfos } from "./billingShipping";

export interface User {
  id: number;
  username: string;
}

export interface Customer extends Omit<User, "id"> {
  email: string;
  firstName: string;
  lastName: string;
  billing: BillingInfos;
  shipping: ShippingInfos;
}
