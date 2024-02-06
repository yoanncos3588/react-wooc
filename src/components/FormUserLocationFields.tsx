import React, { ChangeEvent, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SelectCountry from "./SelectCountry";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { Rule, validate } from "../utils/validateInputs";
import formUserValidationRules from "../utils/formUserValidationRules";
import { LocationInfos } from "../types/billingShipping";
import { FormFieldsStatus } from "../types/FormFieldsStatus";

interface Props {
  isBilling: boolean;
  setLocationFieldsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationData: React.Dispatch<React.SetStateAction<LocationInfos>>;
  locationData: LocationInfos;
}
const FormUserLocationFields = ({ isBilling, setLocationFieldsValid, setLocationData, locationData }: Props) => {
  const [locationDataStatus, setLocationDataStatus] = useState<FormFieldsStatus>({
    locationFirstname: validate(locationData.firstName, formUserValidationRules.rules.locationFirstName),
    locationLastName: validate(locationData.lastName, formUserValidationRules.rules.locationLastName),
    locationAddress_1: validate(locationData.address_1, formUserValidationRules.rules.locationAddress_1),
    locationCity: validate(locationData.city, formUserValidationRules.rules.locationCity),
    locationPostcode: validate(locationData.postcode, formUserValidationRules.rules.locationPostcode),
    locationCountry: validate(locationData.country, formUserValidationRules.rules.locationCountry),
  });

  const theme = useTheme();
  const formType = isBilling ? "billing" : "shipping";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const generateFormTextInputs = (label: string, key: keyof LocationInfos, xs = 12, md = 6, validationRules?: Rule[]) =>
    key in locationData && (
      <Grid item mb={theme.spacing(2)} xs={xs} md={md}>
        {validationRules ? (
          <TextFieldWithValidation
            id={`${formType}-${key}`}
            name={key}
            label={label}
            variant="outlined"
            fullWidth
            value={locationData[key]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            validationRules={validationRules}
            setFormFieldsStatus={setLocationDataStatus}
          />
        ) : (
          <TextField
            id={`${formType}-${key}`}
            name={key}
            label={label}
            variant="outlined"
            fullWidth
            value={locationData[key]}
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
      {generateFormTextInputs("Nom", "lastName", undefined, undefined, formUserValidationRules.rules.locationLastName)}
      {generateFormTextInputs("Adresse", "address_1", 12, 6, formUserValidationRules.rules.locationAddress_1)}
      {generateFormTextInputs("Complément d'adresse", "address_2", 12, 6)}
      {generateFormTextInputs("CP", "postcode", undefined, 2, formUserValidationRules.rules.locationPostcode)}
      {generateFormTextInputs("Ville", "city", undefined, 5, formUserValidationRules.rules.locationCity)}
      <Grid item md={5} xs={12}>
        <SelectCountry id={`${formType}-country`} setData={setLocationData} selectedCountry={locationData.country} />
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

export default FormUserLocationFields;
