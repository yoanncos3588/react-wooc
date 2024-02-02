import { Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import { useState } from "react";
import { FormFieldsStatus } from "../types/FormFieldsStatus";
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

  const [formFieldsStatus, setFormFieldsStatus] = useState<FormFieldsStatus>({
    email: validate(data.email, formUserValidationRules.rules.email),
    firstName: validate(data.firstName, formUserValidationRules.rules.firstName),
    lastName: validate(data.lastName, formUserValidationRules.rules.lastName),
    billingFirstname: validate(data.billing.firstName, formUserValidationRules.rules.locationFirstName),
    billingLastName: validate(data.billing.lastName, formUserValidationRules.rules.locationLastName),
    billingAddress_1: validate(data.billing.address_1, formUserValidationRules.rules.locationAddress_1),
    billingCity: validate(data.billing.city, formUserValidationRules.rules.locationCity),
    billingPostcode: validate(data.billing.postcode, formUserValidationRules.rules.locationPostcode),
    billingCountry: validate(data.billing.country, formUserValidationRules.rules.locationCountry),
    shippingFirstname: validate(data.shipping.firstName, formUserValidationRules.rules.locationFirstName),
    shippingLastName: validate(data.shipping.lastName, formUserValidationRules.rules.locationCity),
    shippingAddress_1: validate(data.shipping.address_1, formUserValidationRules.rules.locationAddress_1),
    shippingCity: validate(data.shipping.city, formUserValidationRules.rules.locationCity),
    shippingPostcode: validate(data.shipping.postcode, formUserValidationRules.rules.locationPostcode),
    shippingCountry: validate(data.shipping.country, formUserValidationRules.rules.locationCountry),
  });

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
            validationRules={formUserValidationRules.rules.firstName}
            setFormFieldsStatus={setFormFieldsStatus}
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
            validationRules={formUserValidationRules.rules.lastName}
            setFormFieldsStatus={setFormFieldsStatus}
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
            validationRules={formUserValidationRules.rules.email}
            setFormFieldsStatus={setFormFieldsStatus}
          />
        </Grid>
        <FormUserInfosFields isBilling={false} data={data} setData={setData} setFormFieldsStatus={setFormFieldsStatus} />
        <FormUserInfosFields isBilling={true} data={data} setData={setData} setFormFieldsStatus={setFormFieldsStatus} />
      </Grid>
      <Button variant="contained" color="success" sx={{ mt: theme.spacing(4) }}>
        Créer mon compte
      </Button>
    </Box>
  );
};

export default FormUser;
