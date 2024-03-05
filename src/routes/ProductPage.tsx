import { useQuery } from "@tanstack/react-query";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import { formatedDataResponseType, productQuery } from "../queries";
import { Product } from "../types/products";
import { Box, Button, Divider, Grid, Link, Typography, useTheme } from "@mui/material";
import DOMPurify from "dompurify";
import { Link as RouterLink } from "react-router-dom";
import ProductPrice from "../components/ProductPrice";
import ProductImages from "../components/ProductImages";

const ProductPage = () => {
  const { id } = useParams() as { id: string }; // error should happens in router
  const theme = useTheme();

  const { data } = useQuery(productQuery(id)) as {
    data: formatedDataResponseType<Product>;
    isPending: boolean;
  };

  const product = data.data;
  console.log(product);
  const descriptionSanitized = DOMPurify.sanitize(product.description);

  return (
    <>
      <PageTitle title={product.name} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImages productImages={product.images} withThumbnails />
        </Grid>
        <Grid item xs={12} md={6}>
          {product.categories.map((c, index) => (
            <Link component={RouterLink} to={`/category/${c.slug}/${c.id}`} sx={{ mr: index === product.categories.length - 1 ? 0 : 1 }} key={c.id}>
              {c.name}
            </Link>
          ))}
          <Typography component="div" dangerouslySetInnerHTML={{ __html: descriptionSanitized }} />
          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 2 }}>
            <ProductPrice product={product} sx={{ fontSize: theme.typography.h4 }} />
            <Button variant={"contained"} color="success">
              Ajouter au panier
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
