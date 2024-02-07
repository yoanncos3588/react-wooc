import { Grid, debounce } from "@mui/material";
import formUserValidationRules from "../utils/formUserValidationRules";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { useEffect, useMemo, useState } from "react";
import { FormFieldsStatus } from "../types/FormFieldsStatus";
import { CustomerBasicInfos } from "../types/user";

interface Props {
  setIsBasicDataValid: React.Dispatch<React.SetStateAction<boolean>>;
  setBasicData: React.Dispatch<React.SetStateAction<CustomerBasicInfos>>;
  basicData: CustomerBasicInfos;
}
const FormUserBasicFields = ({ setIsBasicDataValid, setBasicData, basicData }: Props) => {
  const [basicDataInputStatus, setBasicDataInputStatus] = useState<FormFieldsStatus>(formUserValidationRules.validBasicInput(basicData));

  /** use useMemo (as useCallback) to keep debounce ref during re-rendering   */
  /** https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass */
  const updateInputStatus = useMemo(
    () =>
      debounce((basicData) => {
        setBasicDataInputStatus(formUserValidationRules.validBasicInput(basicData));
      }, 200),
    []
  );

  /** update input status when data change */
  useEffect(() => {
    updateInputStatus(basicData);
  }, [basicData, updateInputStatus]);

  /** global validation for parent */
  useEffect(() => {
    setIsBasicDataValid(() => {
      if (Object.values(basicDataInputStatus).every((obj) => obj.valid === true)) {
        return true;
      } else {
        return false;
      }
    });
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="first-name"
          name="firstName"
          label="Prénom"
          variant="outlined"
          fullWidth
          value={basicData.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          inputStatus={basicDataInputStatus.firstName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="last-name"
          name="lastName"
          label="Nom"
          variant="outlined"
          fullWidth
          value={basicData.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          inputStatus={basicDataInputStatus.lastName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={basicData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          inputStatus={basicDataInputStatus.email}
        />
      </Grid>
    </>
  );
};

export default FormUserBasicFields;
