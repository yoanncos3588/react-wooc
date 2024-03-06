import { Card, CardMedia, CardContent, Typography, Divider, Box, CardActionArea } from "@mui/material";
import { Product } from "../types/products";
import OnSale from "./OnSale";
import DOMPurify from "dompurify";
import ProductPrice from "./ProductPrice";
import { useNavigate } from "react-router-dom";
import ProductImages from "./ProductImages";

interface Props {
  product: Product;
  mini: boolean;
}

const ProductCard = ({ product, mini = false }: Props) => {
  const navigate = useNavigate();
  const descriptionSanitized = DOMPurify.sanitize(product.shortDescription);

  const spacing = mini ? 1 : 2;

  return (
    <>
      <Card sx={{ position: "relative" }}>
        <CardActionArea onClick={() => navigate(`/product/${product.slug}/${product.id}`)}>
          {product.onSale && <OnSale sx={{ position: "absolute", right: 8, top: 8 }} />}
          <CardMedia>
            <ProductImages productImages={product.images} />
          </CardMedia>
          <CardContent>
            <Typography component="h2" variant={mini ? "subtitle2" : "h6"} mb={spacing}>
              {product.name}
            </Typography>
            {!mini && (
              <Box sx={{ position: "relative", height: 100, overflow: "hidden" }}>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: descriptionSanitized }} />
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: 40,
                    background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, #1F1F1F 60%)`,
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Box>
            )}
            <Divider />
            <Box component={"div"} sx={{ display: "flex", justifyContent: "flex-end", mt: spacing }}>
              <Typography variant={mini ? "subtitle2" : "h6"}>
                <ProductPrice product={product} />
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ProductCard;
