import StyledProductPrice from "../styled/ProductPrice";
import { Product } from "../types/products";

interface Props {
  product: Product;
}

const ProductPrice = ({ product }: Props) => {
  return product.onSale ? (
    <StyledProductPrice>
      <span className="price price--old">
        <s>{product.regularPrice} €</s>
      </span>
      <span className="price price--sale">
        <b>{product.salePrice} €</b>
      </span>
    </StyledProductPrice>
  ) : (
    <>
      <StyledProductPrice>
        <span className="price">{product.regularPrice} €</span>
      </StyledProductPrice>
    </>
  );
};

export default ProductPrice;
