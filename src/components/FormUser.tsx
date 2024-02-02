import { Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import { useState } from "react";
import { FormErrors } from "../types/formErrors";
import { Customer } from "../types/user";
import { validate } from "../utils/validateInputs";
import FormUserInfosFields from "./FormUserInfosFields";
import TextFieldWithValidation from "./TextFieldWithValidation";
import formUserValidationRules from "../utils/formUserValidationRules";

const FormUser = () => {
  const [data, setData] = useState<Customer>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    billing: {
      firstName: "",
      lastName: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: "",
    },
    shipping: {
      firstName: "",
      lastName: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, billing: { ...prev.billing }, shipping: { ...prev.shipping }, [name]: value }));
  };

  return (
    <Box component="form" sx={{ mt: theme.spacing(8) }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextFieldWithValidation
            id="first-name"
            name="firstName"
            label="Prénom"
            variant="outlined"
            fullWidth
            value={data.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            validationRules={validate(data.firstName, formUserValidationRules.rules.firstName)}
            setFormErrors={setFormErrors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextFieldWithValidation
            id="last-name"
            name="lastName"
            label="Nom"
            variant="outlined"
            fullWidth
            value={data.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            validationRules={validate(data.lastName, formUserValidationRules.rules.lastName)}
            setFormErrors={setFormErrors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextFieldWithValidation
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            validationRules={validate(data.email, formUserValidationRules.rules.email)}
            setFormErrors={setFormErrors}
          />
        </Grid>
        <FormUserInfosFields isBilling={false} data={data} setData={setData} setFormErrors={setFormErrors} />
        <FormUserInfosFields isBilling={true} data={data} setData={setData} setFormErrors={setFormErrors} />
      </Grid>
      <Button variant="contained" color="success" sx={{ mt: theme.spacing(4) }} disabled={Object.keys(formErrors).length !== 0}>
        Créer mon compte
      </Button>
    </Box>
  );
};

export default FormUser;
