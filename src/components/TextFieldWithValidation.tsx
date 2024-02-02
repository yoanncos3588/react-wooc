import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Rule, validate } from "../utils/validateInputs";
import { FormFieldsStatus } from "../types/FormFieldsStatus";

type Props = TextFieldProps & {
  setFormFieldsStatus: React.Dispatch<React.SetStateAction<FormFieldsStatus>>;
  validationRules: Rule[];
};

const TextFieldWithValidation = ({ setFormFieldsStatus, validationRules, ...props }: Props) => {
  const [wasFocused, setWasFocused] = useState(false);
  const [errorLabel, setErrorLabel] = useState<undefined | string>(undefined);

  /**
   * validate input value on focus out
   */
  function handleOnBlur() {
    const inputStatus = validate(props.value as string, validationRules);
    if (!inputStatus.valid && inputStatus.error) {
      setErrorLabel(inputStatus.error);
    } else {
      setErrorLabel(undefined);
    }
    setWasFocused(true);
    setFormFieldsStatus((prev) => {
      return { ...prev, [props.name!]: inputStatus };
    });
  }

  return (
    <TextField
      {...props}
      error={wasFocused && errorLabel ? true : false}
      helperText={wasFocused && errorLabel ? errorLabel : false}
      onBlur={() => handleOnBlur()}
      required
    />
  );
};

export default TextFieldWithValidation;
