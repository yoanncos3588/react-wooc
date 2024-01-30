import { Grid, TextField } from "@mui/material";
import { Customer } from "../types/user";
import React from "react";
import { BillingInfos, ShippingInfos } from "../types/billingShipping";
import FormUserInfosFields from "./FormUserInfosFields";

interface Props {
  customerData: Customer;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
  billingData: BillingInfos;
  setBillingData: React.Dispatch<React.SetStateAction<BillingInfos>>;
  shippingData: ShippingInfos;
  setShippingData: React.Dispatch<React.SetStateAction<ShippingInfos>>;
}

const FormUserFields = ({ customerData, setCustomerData, billingData, setBillingData, shippingData, setShippingData }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          id="first-name"
          name="firstName"
          label="Prénom"
          variant="outlined"
          required
          fullWidth
          value={customerData.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="last-name"
          name="lastName"
          label="Nom"
          variant="outlined"
          required
          fullWidth
          value={customerData.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
          value={customerData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
      </Grid>
      <FormUserInfosFields isBilling={false} data={shippingData} setData={setShippingData} />
      <FormUserInfosFields isBilling={true} data={billingData} setData={setBillingData as React.Dispatch<React.SetStateAction<ShippingInfos | BillingInfos>>} />
    </Grid>
  );
};

export default FormUserFields;
