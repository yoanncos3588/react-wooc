import { Paper, Button } from "@mui/material";
import LineItemsList from "./LineItemsList";
import OrderStepsNav from "./OrderStepsNav";
import { useQuery } from "@tanstack/react-query";
import { getOrder, FormatedDataResponseType } from "../queries";
import { Order } from "../types/order";
import { useCart } from "../hooks/useCart";
import React, { SetStateAction } from "react";

interface Props {
  setActiveStep: React.Dispatch<SetStateAction<number>>;
  activeStep: number;
  stepsTotal: number;
}

const OrderStepSummary = ({ setActiveStep, activeStep, stepsTotal }: Props) => {
  const { cart } = useCart();
  const { data: dataOrder } = useQuery(getOrder(cart.id)) as FormatedDataResponseType<{ data: Order }>;

  return (
    <>
      <Paper sx={{ p: 4 }}>
        <LineItemsList lineItems={dataOrder.data.lineItems} />
      </Paper>
      <OrderStepsNav setActiveStep={setActiveStep} activeStep={activeStep}>
        <Button onClick={() => setActiveStep((prev) => prev + 1)}>{activeStep === stepsTotal - 1 ? "Finish" : "Next"}</Button>
      </OrderStepsNav>
    </>
  );
};

export default OrderStepSummary;
