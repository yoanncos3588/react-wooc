import { Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import { useState } from "react";
import FormUserLocationFields from "./FormUserLocationFields";
import FormUserBasicFields from "./FormUserBasicFields";
import { LocationInfos } from "../types/billingShipping";
import { CustomerBasicInfos } from "../types/user";

const FormUser = () => {
  const [isBasicDataValid, setIsBasicDataValid] = useState(false);
  const [isShippingDataValid, setIsShippingDataValid] = useState(false);
  const [isBillingDataValid, setIsBillingDataValid] = useState(false);

  const [basicData, setBasicData] = useState<CustomerBasicInfos>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const [billingData, setBillingData] = useState<LocationInfos>({
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
  });

  const [shippingData, setShippingData] = useState<LocationInfos>({
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
  });

  return (
    <Box component="form" sx={{ mt: theme.spacing(8) }}>
      <Grid container spacing={2}>
        <FormUserBasicFields setIsBasicDataValid={setIsBasicDataValid} setBasicData={setBasicData} basicData={basicData} />
        <FormUserLocationFields
          isBilling={false}
          setLocationFieldsValid={setIsShippingDataValid}
          locationData={shippingData}
          setLocationData={setShippingData}
          key={"shippingFields"}
        />
        <FormUserLocationFields
          isBilling={true}
          setLocationFieldsValid={setIsBillingDataValid}
          setLocationData={setBillingData}
          locationData={billingData}
          key={"billingFields"}
        />
      </Grid>
      <Button variant="contained" color="success" sx={{ mt: theme.spacing(4) }}>
        Créer mon compte
      </Button>
    </Box>
  );
};

export default FormUser;
