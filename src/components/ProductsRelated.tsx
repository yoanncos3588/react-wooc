import { useQuery } from "@tanstack/react-query";
import { formatedDataResponseType, productsQuery } from "../queries";
import { Product } from "../types/products";
import { Divider, Typography } from "@mui/material";
import ProductsList from "./ProductsList";

interface Props {
  product: Product;
}
const ProductsRelated = ({ product }: Props) => {
  const { data, isLoading, isSuccess } = useQuery(productsQuery({ include: product.relatedIds.toString() }, { enabled: product.relatedIds.length > 0 })) as {
    data: formatedDataResponseType<Product[]>;
    isLoading: boolean;
    isSuccess: boolean;
  };

  return (
    !isLoading &&
    isSuccess && (
      <>
        <Typography variant="h5" component={"h2"}>
          Vous aimerez aussi ces produits{" "}
        </Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <ProductsList data={data.data} colMd={2} colXs={4} mini />
      </>
    )
  );
};

export default ProductsRelated;
