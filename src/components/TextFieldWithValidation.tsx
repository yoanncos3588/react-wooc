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
    console.log("handleOnBlur");
    if (validationRules && setFormErrors) {
      setWasFocused(true);
      if (!validationRules.valid && props.name) {
        console.log("shit happened");
        setErrorLabel(validationRules.error);
        setFormErrors((prev) => {
          return { ...prev, [props.name!]: validationRules.error };
        });
      } else {
        setErrorLabel(undefined);
        console.log("all good");
        if (validationRules.valid && props.name) {
          console.log("set form error for good");
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
      required
    />
  );
};

export default TextFieldWithValidation;
