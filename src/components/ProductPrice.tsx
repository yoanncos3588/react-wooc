import { Box, SxProps, Typography } from "@mui/material";
import StyledProductPrice from "../styled/ProductPrice";
import { Product, ProductVariation } from "../types/products";

interface Props {
  product: Product | ProductVariation;
  sx?: SxProps;
}

const ProductPrice = ({ product, sx }: Props) => {
  const isVariable = "type" in product && product.type === "variable" ? true : false; // product variation dont have type props

  return isVariable ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="subtitle2" sx={{ opacity: 0.5, mr: 1 }}>
        À partir de{" "}
      </Typography>
      <StyledProductPrice sx={sx}>
        <span className="price">
          <b>{product.price} €</b>
        </span>
      </StyledProductPrice>
    </Box>
  ) : product.onSale ? (
    <>
      <StyledProductPrice sx={sx}>
        <span className="price price--old">
          <s>{product.regularPrice} €</s>
        </span>
        <span className="price price--sale">
          <b>{product.salePrice} €</b>
        </span>
      </StyledProductPrice>
    </>
  ) : (
    <StyledProductPrice sx={sx}>
      <span className="price">{product.regularPrice} €</span>
    </StyledProductPrice>
  );
};

export default ProductPrice;
