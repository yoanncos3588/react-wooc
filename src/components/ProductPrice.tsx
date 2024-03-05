import { SxProps } from "@mui/material";
import StyledProductPrice from "../styled/ProductPrice";
import { Product } from "../types/products";

interface Props {
  product: Product;
  sx?: SxProps;
}

const ProductPrice = ({ product, sx }: Props) => {
  return product.onSale ? (
    <StyledProductPrice sx={sx}>
      <span className="price price--old">
        <s>{product.regularPrice} €</s>
      </span>
      <span className="price price--sale">
        <b>{product.salePrice} €</b>
      </span>
    </StyledProductPrice>
  ) : (
    <>
      <StyledProductPrice sx={sx}>
        <span className="price">{product.regularPrice} €</span>
      </StyledProductPrice>
    </>
  );
};

export default ProductPrice;
