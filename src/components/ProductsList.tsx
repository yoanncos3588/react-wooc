import Grid from "@mui/material/Grid";
import { Product } from "../types/products";
import ProductCard from "./ProductCard";
import { ComponentType } from "react";
import { PropsPaginationBasic } from "./PaginationBasic";
import { Box, Typography, useTheme } from "@mui/material";

interface Props {
  data: Product[];
  paginationComponent?: ComponentType<PropsPaginationBasic>;
  filtersComponent?: ComponentType;
  colMd: number;
  colXs: number;
  mini: boolean;
}

const ProductsList = ({ data, paginationComponent, filtersComponent, colMd = 4, colXs = 12, mini = false }: Props) => {
  const theme = useTheme();
  return (
    <>
      {filtersComponent && (
        <Box sx={{ mb: theme.spacing(4) }}>
          <>{filtersComponent}</>
        </Box>
      )}
      <Grid container spacing={mini ? 2 : 4}>
        {data.length ? (
          data.map((product) => (
            <Grid item xs={colXs} md={colMd} key={product.id}>
              <ProductCard product={product} mini={mini} />
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
