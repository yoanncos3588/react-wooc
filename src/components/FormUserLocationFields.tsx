import React, { useEffect, useMemo, useState } from "react";
import { Grid, TextField, Typography, debounce } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SelectCountry from "./SelectCountry";
import TextFieldWithValidation from "./TextFieldWithValidation";
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
  const [locationDataStatus, setLocationDataStatus] = useState<FormFieldsStatus>(formUserValidationRules.validLocationInput(locationData));

  const theme = useTheme();
  const formType = isBilling ? "billing" : "shipping";

  /* use useMemo (as useCallback) to keep debounce ref during re-rendering   */
  /* https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass */
  const updateInputStatus = useMemo(
    () =>
      debounce((locationData) => {
        setLocationDataStatus(formUserValidationRules.validLocationInput(locationData));
      }, 200),
    []
  );

  /* update input status when data change */
  useEffect(() => {
    updateInputStatus(locationData);
  }, [locationData, updateInputStatus]);

  /** global validation for parent */
  useEffect(() => {
    setLocationFieldsValid(() => {
      if (Object.values(locationDataStatus).every((obj) => obj.valid === true)) {
        return true;
      } else {
        return false;
      }
    });
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const generateFormTextInputs = (label: string, key: keyof LocationInfos, xs = 12, md = 6) =>
    key in locationData && (
      <Grid item mb={theme.spacing(2)} xs={xs} md={md}>
        {key in locationDataStatus ? (
          <TextFieldWithValidation
            id={`${formType}-${key}`}
            name={key}
            label={label}
            variant="outlined"
            fullWidth
            value={locationData[key]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            inputStatus={locationDataStatus[key]}
            data-test-id={`${formType}${key}`}
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
            data-test-id={`${formType}${key}`}
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
      {generateFormTextInputs("Prénom", "firstName", undefined, undefined)}
      {generateFormTextInputs("Nom", "lastName", undefined, undefined)}
      {generateFormTextInputs("Adresse", "address_1", 12, 6)}
      {generateFormTextInputs("Complément d'adresse", "address_2", 12, 6)}
      {generateFormTextInputs("CP", "postcode", undefined, 2)}
      {generateFormTextInputs("Ville", "city", undefined, 5)}
      <Grid item md={5} xs={12}>
        <SelectCountry
          id={`${formType}-country`}
          setData={setLocationData}
          selectedCountry={locationData.country}
          inputStatus={locationDataStatus.country}
          dataTestId={`${formType}country`}
        />
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
