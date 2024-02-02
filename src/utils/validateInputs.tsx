import * as EmailValidator from "email-validator";

export interface InputStatus {
  valid: boolean;
  error?: string;
}

export type Rule = (value: string) => InputStatus;

export function isRequired(value: string): InputStatus {
  const valid = Boolean(value);
  return {
    valid,
    error: valid ? undefined : "Obligatoire",
  };
}

export function isEmailValid(value: string): InputStatus {
  const valid = EmailValidator.validate(value);
  return {
    valid,
    error: valid ? undefined : "Email invalide",
  };
}

export function minMaxLength({ min, max }: { min: number; max: number }): Rule {
  return function (value: string): InputStatus {
    const valid = Boolean(value.length >= min && value.length <= max);
    return {
      valid,
      error: valid ? undefined : `${min} caractères min / ${max} caractères max`,
    };
  };
}

export function validate(value: string, rules: Rule[]): InputStatus {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.valid) {
      return result;
    }
  }
  return {
    valid: true,
  };
}
