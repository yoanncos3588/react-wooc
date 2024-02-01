import { Grid } from "@mui/material";
import { Customer } from "../types/user";
import React, { useState } from "react";
import FormUserInfosFields from "./FormUserInfosFields";
import InputText from "./InputText";
import { isEmailValid, isRequired, minMaxLength, validate } from "../utils/validateInputs";
import { FormErrors } from "../types/formErrors";

const FormUserFields = () => {
  const [customerData, setCustomerData] = useState<Customer>({
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
    setCustomerData((prev) => ({ ...prev, billing: { ...prev.billing }, shipping: { ...prev.shipping }, [name]: value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <InputText
          id="first-name"
          name="firstName"
          label="Prénom"
          variant="outlined"
          fullWidth
          value={customerData.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={validate(customerData.firstName, [isRequired, minMaxLength({ min: 1, max: 25 })])}
          setFormErrors={setFormErrors}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InputText
          id="last-name"
          name="lastName"
          label="Nom"
          variant="outlined"
          fullWidth
          value={customerData.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={validate(customerData.lastName, [isRequired, minMaxLength({ min: 1, max: 25 })])}
          setFormErrors={setFormErrors}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InputText
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={customerData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={validate(customerData.email, [isRequired, isEmailValid])}
          setFormErrors={setFormErrors}
        />
      </Grid>
      <FormUserInfosFields isBilling={false} customerData={customerData} setData={setCustomerData} setFormErrors={setFormErrors} />
      <FormUserInfosFields isBilling={true} customerData={customerData} setData={setCustomerData} setFormErrors={setFormErrors} />
    </Grid>
  );
};

export default FormUserFields;
