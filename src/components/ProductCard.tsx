import { Card, CardMedia, CardContent, Typography, Divider, Box } from "@mui/material";
import { Product } from "../types/products";
import OnSale from "./OnSale";
import DOMPurify from "dompurify";
import ProductPrice from "./ProductPrice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const descriptionSanitized = DOMPurify.sanitize(product.shortDescription);

  return (
    <>
      <Card sx={{ position: "relative" }}>
        {product.onSale && <OnSale sx={{ position: "absolute", right: 8, top: 8 }} />}
        <CardMedia image={product.images[0] ? product.images[0].src : "/placeholder.png"} title={product.name} sx={{ height: 400 }} />
        <CardContent>
          <Typography component="h2" variant="h6">
            {product.name}
          </Typography>
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
          <Divider />
          <Typography component={"div"} variant="h6" mt={2} textAlign={"right"}>
            {product.type !== "variable" ? (
              <ProductPrice product={product} />
            ) : (
              <>
                <span>
                  <Typography component={"span"} variant="subtitle2" sx={{ opacity: 0.3 }}>
                    à partir de
                  </Typography>{" "}
                  {product.price} €
                </span>
              </>
            )}
          </Typography>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};

export default ProductCard;
