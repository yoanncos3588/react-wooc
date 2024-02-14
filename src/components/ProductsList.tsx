import Grid from "@mui/material/Grid";
import { Product } from "../types/products";
import ProductCard from "./ProductCard";
import { ComponentType } from "react";
import { PropsPaginationBasic } from "./PaginationBasic";

interface Props {
  data: Product[];
  paginationComponent?: ComponentType<PropsPaginationBasic>;
  filtersComponent?: ComponentType;
}

const ProductsList = ({ data, paginationComponent, filtersComponent }: Props) => {
  return (
    <>
      {filtersComponent && filtersComponent}
      <Grid container spacing={4}>
        {data.map((product) => (
          <Grid item xs={12} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {paginationComponent && paginationComponent}
    </>
  );
};

export default ProductsList;
