import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Skeleton } from "@mui/material";
import LineItemsList from "./LineItemsList";
import OrderSummary from "./OrderSummary";
import { useQuery } from "@tanstack/react-query";
import { getOrder, FormatedDataResponseType } from "../queries";
import { Order } from "../types/order";
import { useCart } from "../hooks/useCart";

const steps = ["Récapitulatif", "Vos informations", "Livraison", "Paiement"];

const OrderSteps = () => {
  const { cart } = useCart();

  const [activeStep, setActiveStep] = React.useState(0);

  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id)) as FormatedDataResponseType<{ data: Order }>;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 8 }}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : !isPendingOrder && dataOrder.data ? (
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Paper>{activeStep === 0 && <LineItemsList lineItems={dataOrder.data.lineItems} />}</Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4 }}>
                <OrderSummary toBePayedTotal={dataOrder.data.total} lineItemsPrice={dataOrder.data.total} shippingPrice={dataOrder.data.shippingTotal} />
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
          </Box>
        </React.Fragment>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default OrderSteps;
