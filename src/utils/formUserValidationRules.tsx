import { LocationInfos } from "../types/billingShipping";
import { CustomerBasicInfos } from "../types/user";
import { isEmailValid, isRequired, minMaxLength, validate } from "./validateInputs";

const formUserValidationRules = {
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
};

export default formUserValidationRules;
