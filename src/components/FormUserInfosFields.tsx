import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SelectCountry from "./SelectCountry";
import { Customer } from "../types/user";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { InputStatus, validate } from "../utils/validateInputs";
import formUserValidationRules from "../utils/formUserValidationRules";
import { LocationInfos } from "../types/billingShipping";
import { FormErrors } from "../types/formErrors";

interface Props {
  isBilling: boolean;
  data: Customer;
  setData: React.Dispatch<React.SetStateAction<Customer>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}
const FormUserInfosFields = ({ isBilling, data, setData, setFormErrors }: Props) => {
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
    key in data[formType] && (
      <Grid item mb={theme.spacing(2)} xs={xs} md={md}>
        {validationRules ? (
          <TextFieldWithValidation
            id={`${formType}-${key}`}
            name={key}
            label={label}
            variant="outlined"
            fullWidth
            value={data[formType][key]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            validationRules={validate(data[formType][key], validationRules)}
            setFormErrors={setFormErrors}
          />
        ) : (
          <TextField
            id={`${formType}-${key}`}
            name={key}
            label={label}
            variant="outlined"
            fullWidth
            value={data[formType][key]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          />
        )}
      </Grid>
    );

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" component={"h2"} my={theme.spacing(2)}>
          Informations de {isBilling ? "facturation" : "livraison"}
        </Typography>
      </Grid>
      {generateFormTextInputs("Prénom", "firstName", undefined, undefined, formUserValidationRules.rules.firstName)}
      {generateFormTextInputs("Nom", "lastName", undefined, undefined, formUserValidationRules.rules.billingLastName)}
      {generateFormTextInputs("Adresse", "address_1", 12, 6, formUserValidationRules.rules.billingAddress_1)}
      {generateFormTextInputs("Complément d'adresse", "address_2", 12, 6)}
      {generateFormTextInputs("CP", "postcode", undefined, 2, formUserValidationRules.rules.billingPostcode)}
      {generateFormTextInputs("Ville", "city", undefined, 5, formUserValidationRules.rules.billingCity)}
      <Grid item md={5} xs={12}>
        <SelectCountry id={`${formType}-country`} setData={setData} selectedCountry={data[formType].country} isBilling={isBilling} />
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
