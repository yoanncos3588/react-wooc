import { Alert, Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import { FormEvent, useState } from "react";
import FormUserLocationFields from "./FormUserLocationFields";
import FormUserBasicFields from "./FormUserBasicFields";
import { LocationInfos } from "../types/billingShipping";
import { Customer, CustomerBasicInfos } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api/api";
import Loading from "./Loading";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const FormUser = () => {
  const [isBasicDataValid, setIsBasicDataValid] = useState(false);
  const [isShippingDataValid, setIsShippingDataValid] = useState(false);
  const [isBillingDataValid, setIsBillingDataValid] = useState(false);

  const allValid = Boolean(isBasicDataValid && isShippingDataValid && isBillingDataValid);

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

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (customer: Customer) => api.customer.create(customer),
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (allValid) {
      const customer: Customer = { ...basicData, username: basicData.firstName + " " + basicData.lastName, billing: billingData, shipping: shippingData };
      mutation.mutate(customer);
    }
  }

  return (
    <>
      {mutation.isPending && <Loading />}
      <Box component="form" sx={{ mt: theme.spacing(8) }} onSubmit={handleOnSubmit}>
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
        {mutation.isSuccess && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" variant="filled" sx={{ mt: theme.spacing(1) }}>
            Votre compte a bien été créé, vous allez être redirigé…
          </Alert>
        )}
        {mutation.isError && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error" variant="filled" sx={{ mt: theme.spacing(1) }}>
            Une erreur est survenue : {mutation.error.message}
          </Alert>
        )}
        <Button
          variant="contained"
          color="success"
          sx={{ mt: theme.spacing(4) }}
          disabled={!allValid || mutation.isPending || mutation.isSuccess}
          type="submit"
        >
          Créer mon compte
        </Button>
      </Box>
    </>
  );
};

export default FormUser;
