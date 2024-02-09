import { Grid } from "@mui/material";
import TextFieldWithValidation from "./TextFieldWithValidation";
import validation from "../services/validation/validation";

const FormUserBasicFields = () => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="first-name"
          name="firstName"
          label="Prénom"
          data-test-id="basicfirstName"
          validationRules={validation.rules.user.basic.firstName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="last-name"
          name="lastName"
          label="Nom"
          data-test-id="basiclastName"
          validationRules={validation.rules.user.basic.lastName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFieldWithValidation
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          data-test-id="basicemail"
          validationRules={validation.rules.user.basic.email}
        />
      </Grid>
    </>
  );
};

export default FormUserBasicFields;
