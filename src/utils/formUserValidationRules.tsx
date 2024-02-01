import { isEmailValid, isRequired, minMaxLength } from "./validateInputs";

const userValidationRules = {
  rules: {
    email: [isRequired, isEmailValid],
    firstName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    lastName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    billingFirstName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    billingLastName: [isRequired, minMaxLength({ min: 1, max: 25 })],
    billingAddress_1: [isRequired, minMaxLength({ min: 1, max: 50 })],
    billingCity: [isRequired, minMaxLength({ min: 1, max: 50 })],
    billingPostcode: [isRequired, minMaxLength({ min: 1, max: 10 })],
    billingCountry: [isRequired],
  },
};

export default userValidationRules;
