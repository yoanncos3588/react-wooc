import { Button, Grid, Paper } from "@mui/material";
import CartDetail from "../components/CartDetail";
import PageTitle from "../components/PageTitle";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useDialog } from "../hooks/useDialog";

const CartPage = () => {
  const { cart, emptyCart } = useCart();
  const { user } = useAuth();
  const { dialog } = useDialog();
  const navigate = useNavigate();

  async function handleClickEmpty() {
    if (await dialog({ type: "confirm", title: "Vider mon panier", content: "Confirmer cette action supprimera tous les articles de votre panier" })) {
      emptyCart();
    }
  }

  async function handleClickOrder() {
    if (!user) {
      if (!(await dialog({ type: "login", title: "Vous devez vous connecter pour commander" }))) {
        return;
      }
    }
    console.log("ready to create order");
    navigate("/order");
  }

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
            <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} disabled={!(cart.lineItemsLS.length >= 1)} onClick={handleClickOrder}>
              Commander
            </Button>
            <Button variant="outlined" color="error" fullWidth sx={{ mt: 3 }} disabled={!(cart.lineItemsLS.length >= 1)} onClick={handleClickEmpty}>
              Vider mon panier
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CartPage;
