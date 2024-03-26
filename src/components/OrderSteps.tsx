import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Skeleton } from "@mui/material";
import OrderSummary from "./OrderSummary";
import { useQuery } from "@tanstack/react-query";
import { getOrder, FormatedDataResponseType } from "../queries";
import { Order } from "../types/order";
import { useCart } from "../hooks/useCart";
import OrderStepsShipping from "./OrderStepsShipping";
import OrderStepSummary from "./OrderStepSummary";

const steps = ["Récapitulatif", "Vos informations", "Livraison", "Paiement"];

const OrderSteps = () => {
  const { cart } = useCart();

  const [activeStep, setActiveStep] = React.useState(0);

  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id!)) as FormatedDataResponseType<{ data: Order }>;
  console.log(dataOrder?.data);

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
              {activeStep === 0 && <OrderStepSummary setActiveStep={setActiveStep} activeStep={activeStep} stepsTotal={steps.length} />}
              {activeStep === 1 && <OrderStepsShipping setActiveStep={setActiveStep} activeStep={activeStep} stepsTotal={steps.length} />}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4 }}>
                <OrderSummary toBePayedTotal={dataOrder.data.total} lineItemsPrice={dataOrder.data.total} shippingPrice={dataOrder.data.shippingTotal} />
              </Paper>
            </Grid>
          </Grid>
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
