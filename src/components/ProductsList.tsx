import Grid from "@mui/material/Grid";
import { Product } from "../types/products";
import ProductCard from "./ProductCard";
import { ComponentType } from "react";
import { PropsPaginationBasic } from "./PaginationBasic";
import { Box, Button, Typography, useTheme } from "@mui/material";
import category from "../services/api/category";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  data: Product[];
  paginationComponent?: ComponentType<PropsPaginationBasic>;
  filtersComponent?: ComponentType;
}

const ProductsList = ({ data, paginationComponent, filtersComponent }: Props) => {
  const theme = useTheme();
  return (
    <>
      {filtersComponent && (
        <Box sx={{ mb: theme.spacing(4) }}>
          <>{filtersComponent}</>
        </Box>
      )}
      <Grid container spacing={4}>
        {data.length ? (
          data.map((product) => (
            <Grid item xs={12} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <>
            <Grid item>
              <Typography variant="h5" my={3}>
                Aucun résultat trouvé pour votre recherche
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
      {paginationComponent && (
        <Box sx={{ mt: theme.spacing(4) }}>
          <>{paginationComponent}</>
        </Box>
      )}
    </>
  );
};

export default ProductsList;
