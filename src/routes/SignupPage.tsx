import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { BillingInfos, ShippingInfos } from "../types/billingShipping";
import FormUserFields from "../components/FormUserFields";
import { Customer } from "../types/user";

const SignupPage = () => {
  const theme = useTheme();

  const [billingData, setBillingData] = useState<BillingInfos>({
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

  const [shippingData, setShippingData] = useState<ShippingInfos>({
    firstName: "",
    lastName: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const [customerData, setCustomerData] = useState<Customer>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    billing: billingData,
    shipping: shippingData,
  });

  return (
    <>
      <Box>
        <Typography component="h1" variant="h2">
          Créer un compte
        </Typography>
        <Divider sx={{ my: theme.spacing(2) }} />
      </Box>
      <Box component="form" sx={{ mt: theme.spacing(8) }}>
        <FormUserFields
          setBillingData={setBillingData}
          billingData={billingData}
          setShippingData={setShippingData}
          shippingData={shippingData}
          setCustomerData={setCustomerData}
          customerData={customerData}
        />
        <Button variant="contained" color="success" sx={{ mt: theme.spacing(4) }}>
          Créer mon compte
        </Button>
      </Box>
    </>
  );
};

export default SignupPage;
