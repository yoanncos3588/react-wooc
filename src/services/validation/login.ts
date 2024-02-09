import { isRequired, isEmailValid } from "./rules";
import { Rule } from "./validation";

interface Type {
  [key: string]: Rule[];
}

const user: Type = {
  email: [isRequired, isEmailValid],
  password: [isRequired],
};

export default user;
