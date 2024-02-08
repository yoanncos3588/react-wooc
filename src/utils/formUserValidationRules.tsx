import { LocationInfos } from "../types/billingShipping";
import { CustomerBasicInfos } from "../types/user";
import { Rule, isEmailValid, isRequired, minMaxLength, validate } from "./validateInputs";

interface Type {
  rules: {
    basic: {
      [key: string]: Rule[];
    };
    location: {
      [key: string]: Rule[];
    };
  };
  validBasicData: (basicData: CustomerBasicInfos) => boolean;
  validLocationData: (locationData: LocationInfos) => boolean;
  mockedData: mockedDataFormUser;
}

export type mockedDataFormUser = {
  basicemail: string;
  basicfirstName: string;
  basiclastName: string;
  billingfirstName: string;
  billinglastName: string;
  billingaddress_1: string;
  billingaddress_2: string;
  billingcity: string;
  billingpostcode: string;
  billingcountry: string;
  billingemail: string;
  billingphone: string;
  shippingfirstName: string;
  shippinglastName: string;
  shippingaddress_1: string;
  shippingaddress_2: string;
  shippingcity: string;
  shippingpostcode: string;
  shippingcountry: string;
};

const formUserValidationRules: Type = {
  rules: {
    basic: {
      email: [isRequired, isEmailValid],
      firstName: [isRequired, minMaxLength({ min: 1, max: 25 })],
      lastName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    },
    location: {
      firstName: [isRequired, minMaxLength({ min: 1, max: 25 })],
      lastName: [isRequired, minMaxLength({ min: 1, max: 25 })],
      address_1: [isRequired, minMaxLength({ min: 1, max: 50 })],
      city: [isRequired, minMaxLength({ min: 1, max: 50 })],
      postcode: [isRequired, minMaxLength({ min: 1, max: 10 })],
      country: [isRequired],
    },
  },
  /**
   * valid basic value based on validations rules
   * @param basicData
   * @returns {boolean}
   */
  validBasicData: (basicData: CustomerBasicInfos): boolean => {
    let isValid = true;
    for (const key in basicData) {
      if (key in formUserValidationRules.rules.location) {
        const inputStatus = validate(basicData[key as keyof CustomerBasicInfos], formUserValidationRules.rules.basic[key]);
        if (!inputStatus.valid) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  },

  /**
   * valid location value based on validations rules
   * @param locationData
   * @returns {boolean}
   */
  validLocationData: (locationData: LocationInfos): boolean => {
    let isValid = true;
    for (const key in locationData) {
      if (key in formUserValidationRules.rules.location) {
        const inputStatus = validate(locationData[key as keyof LocationInfos], formUserValidationRules.rules.location[key]);
        if (!inputStatus.valid) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  },

  mockedData: {
    basicemail: "cy@test.fr",
    basicfirstName: "cypress",
    basiclastName: "testing",
    billingfirstName: "cypress",
    billinglastName: "testing",
    billingaddress_1: "5 CyStreet",
    billingaddress_2: "Big blue shop",
    billingcity: "Los Angeles",
    billingpostcode: "222",
    billingcountry: "FR",
    billingemail: "cy@billing.fr",
    billingphone: "0202020202",
    shippingfirstName: "cypress",
    shippinglastName: "testing",
    shippingaddress_1: "5 CyStreet",
    shippingaddress_2: "Big blue shop",
    shippingcity: "Los Angeles",
    shippingpostcode: "222",
    shippingcountry: "FR",
  },
};

export default formUserValidationRules;
