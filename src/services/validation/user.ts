import { isRequired, isEmailValid, minMaxLength } from "./rules";
import { Rule } from "./validation";

interface Type {
  basic: {
    [key: string]: Rule[];
  };
  location: {
    [key: string]: Rule[];
  };
}

const user: Type = {
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
};

export default user;
