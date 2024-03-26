import { Paper, Grid, Box, Button, Alert } from "@mui/material";
import FormUserLocationFields from "./FormUserLocationFields";
import { useQuery } from "@tanstack/react-query";
import { getOrder, FormatedDataResponseType } from "../queries";
import { Order } from "../types/order";
import { useCart } from "../hooks/useCart";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import OrderStepsNav from "./OrderStepsNav";
import { extractDataFromFormDataUserForm } from "../utils/formData";
import validation from "../services/validation/validation";
import { useUpdateOrder } from "../hooks/useUpdateOrder";

interface Props {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  stepsTotal: number;
}

const OrderStepsShipping = ({ activeStep, setActiveStep, stepsTotal }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const { cart } = useCart();
  const { editOrderMutation, isPendingEditingOrder, isErrorEditingOrder, isSuccessEditingOrder } = useUpdateOrder();

  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id!)) as FormatedDataResponseType<{ data: Order }>;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlert(false);
    const formData = new FormData(e.currentTarget);

    const { shippingData, billingData } = extractDataFromFormDataUserForm(formData);

    const isBillingValid = validation.validData(billingData, validation.rules.user.location);
    const isShippingValid = validation.validData(shippingData, validation.rules.user.location);

    if (isBillingValid && isShippingValid) {
      editOrderMutation({ orderId: dataOrder.data.id, params: { shipping: { ...shippingData }, billing: { ...billingData } } });
    } else {
      setShowAlert(true);
    }
  }

  if (isSuccessEditingOrder) {
    setActiveStep((prev) => prev + 1);
  }

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Paper sx={{ p: 4, mb: 2 }}>
        <Grid container spacing={2}>
          <FormUserLocationFields isBilling defaultInfos={dataOrder.data.billing} />
        </Grid>
      </Paper>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <FormUserLocationFields defaultInfos={dataOrder.data.shipping} />
        </Grid>
      </Paper>
      {showAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          Impossible d'envoyer vos informations, veuillez vérifier qu'aucune erreur soit présente.
        </Alert>
      )}
      <OrderStepsNav setActiveStep={setActiveStep} activeStep={activeStep}>
        <Button disabled={isPendingOrder || isPendingEditingOrder || isErrorEditingOrder} type="submit">
          {activeStep === stepsTotal - 1 ? "Finish" : "Next"}
        </Button>
      </OrderStepsNav>
    </Box>
  );
};

export default OrderStepsShipping;
