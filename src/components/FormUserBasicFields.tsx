import { Grid } from "@mui/material";
import formUserValidationRules from "../utils/formUserValidationRules";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { validate } from "../utils/validateInputs";
import { useState } from "react";
import { FormFieldsStatus } from "../types/FormFieldsStatus";

const FormUserBasicFields = ({ setBasicFieldsValid }) => {
  const [customerData, setCustomerData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const [customerDataStatus, setCustomerDataStatus] = useState<FormFieldsStatus>({
    email: validate(customerData.email, formUserValidationRules.rules.email),
    firstName: validate(customerData.firstName, formUserValidationRules.rules.firstName),
    lastName: validate(customerData.lastName, formUserValidationRules.rules.lastName),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
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
          value={customerData.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={formUserValidationRules.rules.firstName}
          setFormFieldsStatus={setCustomerDataStatus}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="last-name"
          name="lastName"
          label="Nom"
          variant="outlined"
          fullWidth
          value={customerData.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={formUserValidationRules.rules.lastName}
          setFormFieldsStatus={setCustomerDataStatus}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={customerData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={formUserValidationRules.rules.email}
          setFormFieldsStatus={setCustomerDataStatus}
        />
      </Grid>
    </>
  );
};

export default FormUserBasicFields;
