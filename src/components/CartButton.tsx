import { Badge, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";

function CartButton() {
  const { cart } = useCart();

  useEffect(() => {
    console.log("cart");
  }, [cart]);
  return (
    <IconButton component={RouterLink} to="#" aria-label="mon panier" size="large" sx={{ px: 2 }} edge="end">
      <Badge badgeContent={cart.length} color="warning">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartButton;
