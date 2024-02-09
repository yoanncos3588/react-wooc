import { InputStatus, Rule } from "./validation";
import * as EmailValidator from "email-validator";

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
