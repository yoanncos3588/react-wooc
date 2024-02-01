import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SelectCountry from "./SelectCountry";
import { Customer } from "../types/user";
import InputText from "./InputText";
import { InputStatus, validate } from "../utils/validateInputs";
import userValidationRules from "../utils/formUserValidationRules";
import { LocationInfos } from "../types/billingShipping";
import { FormErrors } from "../types/formErrors";

interface Props {
  isBilling: boolean;
  customerData: Customer;
  setData: React.Dispatch<React.SetStateAction<Customer>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}
const FormUserInfosFields = ({ isBilling, customerData, setData, setFormErrors }: Props) => {
  const theme = useTheme();
  const formType = isBilling ? "billing" : "shipping";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name.replace(`${formType}-`, "");
    if (isBilling) {
      setData((prev) => ({ ...prev, billing: { ...prev.billing, [key]: value } }));
    } else {
      setData((prev) => ({ ...prev, shipping: { ...prev.shipping, [key]: value } }));
    }
  };

  const generateFormTextInputs = (label: string, key: keyof LocationInfos, xs = 12, md = 6, validationRules?: ((value: string) => InputStatus)[]) =>
    key in customerData[formType] && (
      <Grid item mb={theme.spacing(2)} xs={xs} md={md}>
        <InputText
          id={`${formType}-${key}`}
          name={key}
          label={label}
          variant="outlined"
          fullWidth
          value={customerData[formType][key]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          validationRules={validationRules ? validate(customerData[formType][key], validationRules) : undefined}
          setFormErrors={setFormErrors}
        />
      </Grid>
    );

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" component={"h2"} my={theme.spacing(2)}>
          Informations de {isBilling ? "facturation" : "livraison"}
        </Typography>
      </Grid>
      {generateFormTextInputs("Prénom", "firstName", undefined, undefined, userValidationRules.rules.firstName)}
      {generateFormTextInputs("Nom", "lastName", undefined, undefined, userValidationRules.rules.billingLastName)}
      {generateFormTextInputs("Adresse", "address_1", 12, 6, userValidationRules.rules.billingAddress_1)}
      {generateFormTextInputs("Complément d'adresse", "address_2", 12, 6)}
      {generateFormTextInputs("CP", "postcode", undefined, 2, userValidationRules.rules.billingPostcode)}
      {generateFormTextInputs("Ville", "city", undefined, 5, userValidationRules.rules.billingCity)}
      <Grid item md={5} xs={12}>
        <SelectCountry id={`${formType}-country`} setData={setData} selectedCountry={customerData[formType].country} isBilling={isBilling} />
      </Grid>
      {isBilling && (
        <>
          {generateFormTextInputs("Email", "email", 12, 6)}
          {generateFormTextInputs("Téléphone", "phone", 12, 6)}
        </>
      )}
    </>
  );
};

export default FormUserInfosFields;
