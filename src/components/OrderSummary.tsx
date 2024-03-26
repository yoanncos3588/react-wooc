import { Typography, Box, Divider } from "@mui/material";

interface Props {
  lineItemsPrice: string;
  shippingPrice?: string;
  toBePayedTotal: string;
}

const OrderSummary = ({ lineItemsPrice, shippingPrice, toBePayedTotal }: Props) => {
  return (
    <>
      <Typography variant="h5" mb={3}>
        Total
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <Typography>Sous-total :</Typography>
        <Typography>{lineItemsPrice} € </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <Typography>Livraison :</Typography>
        <Typography>{shippingPrice ? shippingPrice : "0,00 €"}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <Typography fontWeight={"700"}>Total :</Typography>
        <Typography fontWeight={"700"}>{toBePayedTotal} €</Typography>
      </Box>
    </>
  );
};

export default OrderSummary;
