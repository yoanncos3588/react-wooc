import { Badge, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../hooks/useCart";

function CartButton() {
  const { getTotalProducts } = useCart();

  return (
    <IconButton component={RouterLink} to="/cart" aria-label="mon panier" size="large" sx={{ px: 2 }} edge="end">
      <Badge badgeContent={getTotalProducts()} color="warning">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartButton;
