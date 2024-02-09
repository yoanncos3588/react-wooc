import { Rule, isEmailValid, isRequired } from "../../utils/validateInputs";

interface Type {
  [key: string]: Rule[];
}

const user: Type = {
  email: [isRequired, isEmailValid],
  password: [isRequired],
};

export default user;
