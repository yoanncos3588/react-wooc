import { Button } from "@mui/material";
import { useCart } from "../hooks/useCart";
import { Product, ProductVariation } from "../types/products";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  product: Product;
  productVariation: ProductVariation | undefined;
  disabled: boolean;
}

const AddToCart = ({ product, productVariation, disabled }: Props) => {
  const { add, remove, findItemInCart } = useCart();

  const isAlreadyInCart = !!findItemInCart(product.id, productVariation?.id);

  return (
    <>
      <Button variant={"contained"} color="success" onClick={() => add(product, productVariation)} disabled={disabled || isAlreadyInCart}>
        {isAlreadyInCart ? "Produit dans votre panier" : "Ajouter au panier"}
      </Button>
      {isAlreadyInCart && (
        <Button aria-label="Retirer du panier" variant="outlined" startIcon={<DeleteIcon />} onClick={() => remove(product.id, productVariation?.id)}>
          Retirer
        </Button>
      )}
    </>
  );
};

export default AddToCart;
