import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import validation, { InputStatus, Rule } from "../services/validation/validation";

type Props = TextFieldProps & {
  validationRules?: Rule[];
};

const TextFieldWithValidation = ({ validationRules, ...props }: Props) => {
  const [inputValue, setInputValue] = useState(props.value ? props.value : "");
  const [wasFocused, setWasFocused] = useState(false);
  const [errorLabel, setErrorLabel] = useState<InputStatus | null>(null);

  const isRequired = validationRules !== undefined;

  useEffect(() => {
    setErrorLabel(isRequired ? validation.validInput(inputValue as string, validationRules) : null);
  }, [inputValue, isRequired, validationRules]);

  useEffect(() => {
    setInputValue(props.value ? props.value : "");
  }, [props.value]);

  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      error={wasFocused && errorLabel?.error ? true : false}
      helperText={wasFocused && errorLabel?.error ? errorLabel.error : false}
      onBlur={() => setWasFocused(true)}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      required={isRequired}
    />
  );
};

export default TextFieldWithValidation;
