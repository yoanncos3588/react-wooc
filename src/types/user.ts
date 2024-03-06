import { LocationInfos } from "./billingShipping";

export interface User {
  id: number;
  username: string;
}

export interface Customer extends Omit<User, "id"> {
  email: string;
  firstName: string;
  lastName: string;
  billing: LocationInfos;
  shipping: LocationInfos;
}

export interface CustomerBasicInfos extends Omit<Customer, "billing" | "shipping"> {}
