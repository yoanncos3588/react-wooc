import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { BillingInfos, ShippingInfos } from "../types/billingShipping";
import { useTheme } from "@mui/material/styles";
import SelectCountry from "./SelectCountry";

interface Props {
  isBilling: boolean;
  data: ShippingInfos | BillingInfos;
  setData: React.Dispatch<React.SetStateAction<ShippingInfos | BillingInfos>>;
}
const FormUserInfosFields = ({ isBilling, data, setData }: Props) => {
  const theme = useTheme();
  const formType = isBilling ? "billing" : "shipping";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name.replace(`${formType}-`, "");
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const generateFormTextInputs = (label: string, key: string, xs = 12, md = 6) =>
    key in data && (
      <Grid item mb={theme.spacing(2)} xs={xs} md={md}>
        <TextField
          id={`${formType}-${key}`}
          name={key}
          label={label}
          variant="outlined"
          required
          fullWidth
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={(data as any)[key]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
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
      {generateFormTextInputs("Prénom", "firstName")}
      {generateFormTextInputs("Nom", "lastName")}
      {generateFormTextInputs("Adresse", "address_1", 12, 6)}
      {generateFormTextInputs("Complément d'adresse", "address_2", 12, 6)}
      {generateFormTextInputs("CP", "postcode", undefined, 2)}
      {generateFormTextInputs("Ville", "city", undefined, 5)}
      <Grid item md={5} xs={12}>
        <SelectCountry id={`${formType}-country`} setData={setData} selectedCountry={data.country} />
      </Grid>
      {generateFormTextInputs("Email", "email", 12, 6)}
      {generateFormTextInputs("Téléphone", "phone", 12, 6)}
    </>
  );
};

export default FormUserInfosFields;
