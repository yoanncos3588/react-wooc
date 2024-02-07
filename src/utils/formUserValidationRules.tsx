import { LocationInfos } from "../types/billingShipping";
import { CustomerBasicInfos } from "../types/user";
import { InputStatus, Rule, isEmailValid, isRequired, minMaxLength, validate } from "./validateInputs";

interface Type {
  rules: {
    [key: string]: Rule[];
  };
  validBasicInput: (basicData: CustomerBasicInfos) => {
    [key: string]: InputStatus;
  };
  validLocationInput: (locationData: LocationInfos) => {
    [key: string]: InputStatus;
  };
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
    email: [isRequired, isEmailValid],
    firstName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    lastName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    locationFirstName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    locationLastName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    locationAddress_1: [isRequired, minMaxLength({ min: 1, max: 50 })],
    locationCity: [isRequired, minMaxLength({ min: 1, max: 50 })],
    locationPostcode: [isRequired, minMaxLength({ min: 1, max: 10 })],
    locationCountry: [isRequired],
  },
  validBasicInput: (basicData: CustomerBasicInfos) => {
    return {
      email: validate(basicData.email, formUserValidationRules.rules.email),
      firstName: validate(basicData.firstName, formUserValidationRules.rules.firstName),
      lastName: validate(basicData.lastName, formUserValidationRules.rules.lastName),
    };
  },
  validLocationInput: (locationData: LocationInfos) => {
    return {
      firstName: validate(locationData.firstName, formUserValidationRules.rules.locationFirstName),
      lastName: validate(locationData.lastName, formUserValidationRules.rules.locationLastName),
      address_1: validate(locationData.address_1, formUserValidationRules.rules.locationAddress_1),
      city: validate(locationData.city, formUserValidationRules.rules.locationCity),
      postcode: validate(locationData.postcode, formUserValidationRules.rules.locationPostcode),
      country: validate(locationData.country, formUserValidationRules.rules.locationCountry),
    };
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
