import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { InputStatus } from "../utils/validateInputs";
import { FormErrors } from "../types/formErrors";

type Props = TextFieldProps & {
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  validationRules: InputStatus;
};

const TextFieldWithValidation = ({ setFormErrors, validationRules, ...props }: Props) => {
  const [wasFocused, setWasFocused] = useState(false);
  const [errorLabel, setErrorLabel] = useState<undefined | string>(undefined);

  /**
   * use validationRules to determine if input content is correct,
   */
  function handleOnBlur() {
    if (validationRules && setFormErrors) {
      setWasFocused(true);
      if (!validationRules.valid && props.name) {
        setErrorLabel(validationRules.error);
        setFormErrors((prev) => {
          return { ...prev, [props.name!]: validationRules.error };
        });
      } else {
        setErrorLabel(undefined);
        if (!validationRules.valid && props.name) {
          setFormErrors((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [props.name!]: _, ...rest } = prev;
            return rest;
          });
        }
      }
    }
  }

  return (
    <TextField
      {...props}
      error={wasFocused && errorLabel ? true : false}
      helperText={wasFocused && errorLabel ? errorLabel : false}
      onBlur={() => handleOnBlur()}
    />
  );
};

export default TextFieldWithValidation;
