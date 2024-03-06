import { Alert, Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import { FormEvent } from "react";
import FormUserLocationFields from "./FormUserLocationFields";
import FormUserBasicFields from "./FormUserBasicFields";
import { LocationInfos } from "../types/billingShipping";
import { Customer } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api/api";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import validation from "../services/validation/validation";

const FormUser = () => {
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
    const formData = new FormData(e.currentTarget);

    const regex = /^(shipping|billing)(.*)/i;

    const basicData = {} as { [key: string]: string };
    const billingData = {} as { [key: string]: string };
    const shippingData = {} as { [key: string]: string };

    // sort keys and create data objects
    for (const pair of formData.entries()) {
      // pair[0] is the name of the field, pair[1] is the value
      const key = pair[0];
      const matches = regex.exec(key); // output ex ['billingphone', 'billing', 'phone'];

      if (matches) {
        // key start with billing or shipping
        const prefix = matches[1];
        const remaining = matches[2];
        if (prefix.toLowerCase() === "shipping") {
          shippingData[remaining as keyof LocationInfos] = pair[1] as string;
        } else {
          billingData[remaining as keyof LocationInfos] = pair[1] as string;
        }
      } else {
        // key dont start with billing or shipping, so it's basic data
        basicData[key] = pair[1] as string;
      }
    }

    // carreful with type
    const isBasicValid = validation.validData(basicData, validation.rules.user.basic);
    const isBillingValid = validation.validData(billingData, validation.rules.user.location);
    const isShippingValid = validation.validData(shippingData, validation.rules.user.location);

    if (isBasicValid && isBillingValid && isShippingValid) {
      mutation.mutate({ ...basicData, billing: billingData, shipping: shippingData } as unknown as Customer);
    }
  }

  return (
    <>
      {mutation.isPending && <Loading />}
      <Box component="form" onSubmit={handleOnSubmit} data-test-id="form-user">
        <Grid container spacing={2}>
          <FormUserBasicFields />
          <FormUserLocationFields isBilling={false} key={"shippingFields"} />
          <FormUserLocationFields isBilling={true} key={"billingFields"} />
        </Grid>
        {mutation.isSuccess && (
          <Alert severity="success" variant="filled" sx={{ mt: theme.spacing(1) }} data-test-id="alert-success">
            Votre compte a bien été créé, vous allez être redirigé…
          </Alert>
        )}
        {mutation.isError && (
          <Alert severity="error" variant="filled" sx={{ mt: theme.spacing(1) }} data-test-id="alert-error">
            Une erreur est survenue : {mutation.error.message}
          </Alert>
        )}
        <Button
          variant="contained"
          color="success"
          sx={{ mt: theme.spacing(4) }}
          disabled={mutation.isPending || mutation.isSuccess}
          type="submit"
          data-test-id="btn-send-data"
        >
          Créer mon compte
        </Button>
      </Box>
    </>
  );
};

export default FormUser;
