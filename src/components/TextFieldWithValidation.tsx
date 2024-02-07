import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { InputStatus } from "../utils/validateInputs";

type Props = TextFieldProps & {
  inputStatus: InputStatus;
};

const TextFieldWithValidation = ({ inputStatus, ...props }: Props) => {
  const [wasFocused, setWasFocused] = useState(false);

  function handleOnBlur() {
    setWasFocused(true);
  }

  return (
    <TextField
      {...props}
      error={wasFocused && inputStatus.error ? true : false}
      helperText={wasFocused && inputStatus.error ? inputStatus.error : false}
      onBlur={() => handleOnBlur()}
      required
    />
  );
};

export default TextFieldWithValidation;
