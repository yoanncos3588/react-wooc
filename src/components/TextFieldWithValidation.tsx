import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import validation, { Rule } from "../services/validation/validation";

type Props = TextFieldProps & {
  validationRules?: Rule[];
};

const TextFieldWithValidation = ({ validationRules, ...props }: Props) => {
  const [inputValue, setInputValue] = useState(props.value ? props.value : "");
  const [wasFocused, setWasFocused] = useState(false);

  const isRequired = validationRules !== undefined;
  const errorLabel = isRequired ? validation.validInput(props.value ? (props.value as string) : (inputValue as string), validationRules) : null;
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
