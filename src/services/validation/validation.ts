import { Rule, validate } from "../../utils/validateInputs";
import user from "./user";
import login from "./login";

const validation = {
  rules: {
    user,
    login,
  },
  validData: (data: { [key: string]: string }, rules: { [key: string]: Rule[] }) => {
    for (const key in data) {
      if (key in rules) {
        const inputStatus = validate(data[key], rules[key]);
        if (!inputStatus.valid) {
          return false;
        }
      }
    }
    return true;
  },
};

export default validation;
