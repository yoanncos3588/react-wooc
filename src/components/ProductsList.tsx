import Grid from "@mui/material/Grid";
import { Product } from "../types/products";
import ProductCard from "./ProductCard";

interface Props {
  data: Product[];
}

const ProductsList = ({ data }: Props) => {
  return (
    <Grid container spacing={4}>
      {data.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
