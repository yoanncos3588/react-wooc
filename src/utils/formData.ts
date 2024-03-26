import { LocationInfos, ShippingInfos } from "../types/billingShipping";

/**
 * Extract formdata fields by concerns (user/shipping/billing)
 * @param formData : forms data containing user infos
 * @returns {object} : Obj with basicData, billingData, shippingData
 */
export function extractDataFromFormDataUserForm(formData: FormData) {
  const regex = /^(shipping|billing)(.*)/i;

  const basicData = {} as { [key: string]: string };
  const billingData = {} as { [key in keyof LocationInfos]: LocationInfos[key] };
  const shippingData = {} as { [key in keyof ShippingInfos]: ShippingInfos[key] };

  // sort keys and create data objects
  for (const pair of formData.entries()) {
    // pair[0] is the name of the field, pair[1] is the value
    const key = pair[0];
    const matches = regex.exec(key); // output ex ['billingphone', 'billing', 'phone'];

    if (matches) {
      // key start with billing or shipping
      const prefix = matches[1];
      const remaining = matches[2];
      if (prefix.toLowerCase() === "shipping") {
        shippingData[remaining as keyof ShippingInfos] = pair[1] as string;
      } else {
        billingData[remaining as keyof LocationInfos] = pair[1] as string;
      }
    } else {
      // key dont start with billing or shipping, so it's basic data
      basicData[key] = pair[1] as string;
    }
  }

  return { basicData, billingData, shippingData };
}
