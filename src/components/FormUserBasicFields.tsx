import { Grid } from "@mui/material";
import formUserValidationRules from "../utils/formUserValidationRules";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { validate } from "../utils/validateInputs";
import { useState } from "react";
import { FormFieldsStatus } from "../types/FormFieldsStatus";
import { CustomerBasicInfos } from "../types/user";

interface Props {
  setIsBasicDataValid: React.Dispatch<React.SetStateAction<boolean>>;
  setBasicData: React.Dispatch<React.SetStateAction<CustomerBasicInfos>>;
  basicData: CustomerBasicInfos;
}
const FormUserBasicFields = ({ setIsBasicDataValid, setBasicData, basicData }: Props) => {
  const [validFields, setValidFields] = useState<FormFieldsStatus>({
    email: validate(basicData.email, formUserValidationRules.rules.email),
    firstName: validate(basicData.firstName, formUserValidationRules.rules.firstName),
    lastName: validate(basicData.lastName, formUserValidationRules.rules.lastName),
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
          validationRules={formUserValidationRules.rules.firstName}
          setValidFields={setValidFields}
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
          validationRules={formUserValidationRules.rules.lastName}
          setValidFields={setValidFields}
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
          validationRules={formUserValidationRules.rules.email}
          setValidFields={setValidFields}
        />
      </Grid>
    </>
  );
};

export default FormUserBasicFields;
