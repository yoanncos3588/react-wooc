export interface BillingInfos {
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

export interface ShippingInfos extends Omit<BillingInfos, "email" | "phone"> {}

//TODO Keep this function up to date if obj structure change
export function isBilling(obj: BillingInfos | ShippingInfos): obj is BillingInfos {
  return (obj as BillingInfos).email !== undefined;
}
