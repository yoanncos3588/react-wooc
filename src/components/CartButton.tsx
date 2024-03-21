import { Badge, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../hooks/useCart";

function CartButton() {
  const { cart } = useCart();

  return (
    <IconButton component={RouterLink} to="/cart" aria-label="mon panier" size="large" sx={{ px: 2 }} edge="end">
      <Badge badgeContent={cart.lineItemsLS.length} color="warning">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartButton;
