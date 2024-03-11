import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import ListLineItemsStyled from "../styled/ListLineItems";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { LineItemLS } from "../types/order";

const CartDetail = () => {
  const { cart, updateQuantity, remove } = useCart();

  function generateSecondaryText(lineItem: LineItemLS) {
    const price = `prix unitaire : ${Number(lineItem.price).toFixed(2)} €`;
    const attributesText = lineItem.attributes ? lineItem.attributes.map((a) => `${a.name.toLowerCase()} : ${a.option.toLowerCase()}`) : undefined;
    const attributes = attributesText ? attributesText?.join(" | ") : undefined;
    return `${price} ${attributes ? " | " + attributes : ""}`;
  }

  return cart.length >= 1 ? (
    <ListLineItemsStyled>
      {cart.map((lineItem) => (
        <ListItem key={lineItem.variationId ? lineItem.variationId : lineItem.productId}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <Box className="ListLineItemsStyled__link">
            <Link to={`/product/${lineItem.slug}/${lineItem.productId}`}>
              <ListItemText primary={lineItem.name} secondary={generateSecondaryText(lineItem)} />
            </Link>
          </Box>
          <Stack direction={"row"} spacing={3}>
            <Select value={lineItem.quantity} onChange={(e) => updateQuantity(lineItem, Number(e.target.value))} className="ListLineItemsStyled__qty">
              {[...Array(10)].map((_, i) => (
                <MenuItem value={i + 1} key={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
            <Box className="ListLineItemsStyled__price">
              <Typography>{lineItem.total} €</Typography>
            </Box>
            <Box className="ListLineItemsStyled__delete">
              <IconButton aria-label="delete" onClick={() => remove(lineItem.productId, lineItem.variationId)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </ListItem>
      ))}
    </ListLineItemsStyled>
  ) : (
    <Typography variant="h5" p={4}>
      Aucun article dans votre panier
    </Typography>
  );
};

export default CartDetail;
