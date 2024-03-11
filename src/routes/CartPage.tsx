import { Paper } from "@mui/material";
import CartDetail from "../components/CartDetail";
import PageTitle from "../components/PageTitle";

const CartPage = () => {
  return (
    <>
      <PageTitle title="Mon panier" />
      <Paper>
        <CartDetail />
      </Paper>
    </>
  );
};

export default CartPage;
