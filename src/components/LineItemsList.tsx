import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import ListLineItemsStyled from "../styled/ListLineItems";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { LineItem, LineItemLS } from "../types/order";

interface Props {
  lineItems: LineItemLS[] | LineItem[];
  editable?: boolean;
}

const LineItemsList = ({ lineItems, editable = false }: Props) => {
  const { updateQuantity } = useCart();

  function generateSecondaryText(lineItem: LineItemLS) {
    const price = `prix unitaire : ${Number(lineItem.price).toFixed(2)} €`;
    const attributesText = lineItem.attributes ? lineItem.attributes.map((a) => `${a.name.toLowerCase()} : ${a.option.toLowerCase()}`) : undefined;
    const attributes = attributesText ? attributesText?.join(" | ") : undefined;
    return `${price} ${attributes ? " | " + attributes : ""}`;
  }

  return lineItems.length >= 1 ? (
    <ListLineItemsStyled>
      {lineItems.map(
        (lineItem) =>
          lineItem.quantity > 0 && (
            <ListItem key={lineItem.variationId ? lineItem.variationId : lineItem.productId}>
              <ListItemAvatar>
                {lineItem.image && lineItem.image.src !== "" ? (
                  <Avatar src={lineItem.image.src} />
                ) : (
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <Box className="ListLineItemsStyled__link">
                {editable ? (
                  <Link to={`/product/${lineItem.slug}/${lineItem.productId}`}>
                    <ListItemText primary={lineItem.name} secondary={generateSecondaryText(lineItem)} />
                  </Link>
                ) : (
                  <ListItemText primary={lineItem.name} secondary={generateSecondaryText(lineItem)} />
                )}
              </Box>
              <Stack direction={"row"} spacing={3}>
                <Select
                  value={lineItem.quantity}
                  disabled={!editable}
                  onChange={editable ? (e) => updateQuantity(lineItem, Number(e.target.value)) : undefined}
                  className="ListLineItemsStyled__qty"
                >
                  {[...Array(10)].map((_, i) => (
                    <MenuItem value={i + 1} key={i}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>

                <Box className="ListLineItemsStyled__price">
                  <Typography>{lineItem.total} €</Typography>
                </Box>
                {editable && (
                  <Box className="ListLineItemsStyled__delete">
                    <IconButton aria-label="delete" onClick={() => updateQuantity(lineItem, 0)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Stack>
            </ListItem>
          )
      )}
    </ListLineItemsStyled>
  ) : (
    <Typography variant="h5" p={4}>
      Aucun article dans votre panier
    </Typography>
  );
};

export default LineItemsList;
