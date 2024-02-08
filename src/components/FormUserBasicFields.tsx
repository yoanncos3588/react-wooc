import { Grid } from "@mui/material";
import formUserValidationRules from "../utils/formUserValidationRules";
import TextFieldWithValidation from "./TextFieldWithValidation";

const FormUserBasicFields = () => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="first-name"
          name="firstName"
          label="Prénom"
          data-test-id="basicfirstName"
          validationRules={formUserValidationRules.rules.basic.firstName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="last-name"
          name="lastName"
          label="Nom"
          data-test-id="basiclastName"
          validationRules={formUserValidationRules.rules.basic.lastName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          data-test-id="basicemail"
          validationRules={formUserValidationRules.rules.basic.email}
        />
      </Grid>
    </>
  );
};

export default FormUserBasicFields;
