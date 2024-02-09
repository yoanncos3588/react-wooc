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
  /**
   * Valid a string base on a set of rules, end on first error found
   * @param {string} value string to validate
   * @param {Rule[]} rules array of rules function
   * @returns {InputStatus}
   */
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
  /**
   * validate data object key based on the equivalent rules object key instruction
   * ex : data.firstname exec rule.firstname validation rules
   * @param data data to validate
   * @param rules set of rules
   * @returns {boolean}
   */
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
