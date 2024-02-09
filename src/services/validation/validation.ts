import user from "./user";
import login from "./login";

export interface InputStatus {
  valid: boolean;
  error?: string;
}

export type Rule = (value: string) => InputStatus;

const validation = {
  rules: {
    user,
    login,
  },
  validInput(value: string, rules: Rule[]): InputStatus {
    for (const rule of rules) {
      const result = rule(value);
      if (!result.valid) {
        return result;
      }
    }
    return {
      valid: true,
    };
  },
  validData: (data: { [key: string]: string }, rules: { [key: string]: Rule[] }) => {
    for (const key in data) {
      if (key in rules) {
        const inputStatus = validation.validInput(data[key], rules[key]);
        if (!inputStatus.valid) {
          return false;
        }
      }
    }
    return true;
  },
};

export default validation;
