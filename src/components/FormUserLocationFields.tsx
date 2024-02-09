import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { LocationInfos } from "../types/billingShipping";
import { Rule } from "../utils/validateInputs";
import SelectCountry from "./SelectCountry";
import validation from "../services/validation/validation";

interface Props {
  isBilling: boolean;
}
const FormUserLocationFields = ({ isBilling }: Props) => {
  const theme = useTheme();
  const formType = isBilling ? "billing" : "shipping";

  const generateFormTextInputs = (label: string, key: keyof LocationInfos, xs = 12, md = 6, validationRules?: Rule[]) => (
    <Grid item mb={theme.spacing(2)} xs={xs} md={md}>
      <TextFieldWithValidation
        id={`${formType}-${key}`}
        name={`${formType}${key}`}
        label={label}
        data-test-id={`${formType}${key}`}
        validationRules={validationRules}
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
      {generateFormTextInputs("Prénom", "firstName", undefined, undefined, validation.rules.user.location.firstName)}
      {generateFormTextInputs("Nom", "lastName", undefined, undefined, validation.rules.user.location.lastName)}
      {generateFormTextInputs("Adresse", "address_1", 12, 6, validation.rules.user.location.address_1)}
      {generateFormTextInputs("Complément d'adresse", "address_2", 12, 6)}
      {generateFormTextInputs("CP", "postcode", undefined, 2, validation.rules.user.location.postcode)}
      {generateFormTextInputs("Ville", "city", undefined, 5, validation.rules.user.location.city)}
      <Grid item md={5} xs={12}>
        <SelectCountry
          id={`${formType}-country`}
          data-test-id={`${formType}country`}
          validationRules={validation.rules.user.location.country}
          name={`${formType}country`}
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
