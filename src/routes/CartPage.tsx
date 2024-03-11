import { Grid, Paper } from "@mui/material";
import CartDetail from "../components/CartDetail";
import PageTitle from "../components/PageTitle";
import CartTotal from "../components/CartTotal";

const CartPage = () => {
  return (
    <>
      <PageTitle title="Mon panier" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper>
            <CartDetail />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4 }}>
            <CartTotal />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CartPage;
