import { Typography, Box, Divider, Button } from "@mui/material";
import { useCart } from "../hooks/useCart";

const CartTotal = () => {
  const { cart, getTotalPrice, emptyCart } = useCart();

  return (
    <>
      <Typography variant="h5" mb={3}>
        Total
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <Typography>Sous-total :</Typography>
        <Typography>{getTotalPrice()} € </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <Typography>Livraison :</Typography>
        <Typography>0, 00 €</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <Typography fontWeight={"700"}>Total :</Typography>
        <Typography fontWeight={"700"}>{getTotalPrice()} €</Typography>
      </Box>

      <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} disabled={!(cart.length >= 1)}>
        Commander
      </Button>
      <Button variant="outlined" color="error" fullWidth sx={{ mt: 3 }} disabled={!(cart.length >= 1)} onClick={() => emptyCart()}>
        Vider mon panier
      </Button>
    </>
  );
};

export default CartTotal;
