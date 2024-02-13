import { Card, CardMedia, CardContent, Typography, Divider, CardActions, IconButton } from "@mui/material";
import { Product } from "../types/products";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardMedia image={product.images[0] ? product.images[0].src : "/placeholder.png"} title={product.name} sx={{ height: 400 }} />
      <CardContent>
        <Typography component="h2" variant="h6">
          {product.name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <IconButton aria-label="Ajouter au panier">
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
