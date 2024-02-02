import { isEmailValid, isRequired, minMaxLength } from "./validateInputs";

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
};

export default formUserValidationRules;
