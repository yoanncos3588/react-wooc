import { useQuery } from "@tanstack/react-query";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import { FormatedDataResponseType, productQuery, productVariationsQuery } from "../queries";
import { Product, ProductVariation } from "../types/products";
import { Box, Button, Divider, Grid, Link, Typography, useTheme } from "@mui/material";
import DOMPurify from "dompurify";
import { Link as RouterLink } from "react-router-dom";
import ProductPrice from "../components/ProductPrice";
import ProductImages from "../components/ProductImages";
import { useEffect, useState } from "react";
import SelectAttribute, { SelectedAttributes } from "../components/SelectAttribute";
import Loading from "../components/Loading";
import ProductsRelated from "../components/ProductsRelated";

const ProductPage = () => {
  const { id } = useParams() as { id: string }; // error should happens in router
  const theme = useTheme();

  const [selectedAttributes, setSelectedAttributes] = useState({}); // used for variable products
  const [currentVariationsPage, setCurrentVariationsPage] = useState(1);
  const [matchingVariation, setMatchingVariation] = useState<ProductVariation | undefined>(undefined);

  const { data: dataProduct } = useQuery(productQuery(id)) as {
    data: FormatedDataResponseType<Product>;
  };

  const product = dataProduct.data;
  const isProductVariable = product.type === "variable";

  // since wc rest api doesn't allow to query variations by attribute's value, we have to load all variations...
  // load variations only if product is variable and if an attributes has been chosen
  const {
    data: dataVariations,
    isFetched: isFetchedVariations,
    isLoading: isLoadingVariations,
  } = useQuery(
    productVariationsQuery(
      id,
      { per_page: 100, page: currentVariationsPage },
      { enabled: isProductVariable && Object.keys(selectedAttributes).length > 0, keepPreviousData: true }
    )
  ) as { data: FormatedDataResponseType<ProductVariation[]>; isFetched: boolean; isLoading: boolean };

  // if there is more than 1 page of variations, update state, query will keep previous data when rerender
  if (isFetchedVariations && dataVariations.headers && dataVariations.headers.totalPages) {
    if (Number(dataVariations.headers.totalPages) > currentVariationsPage) {
      setCurrentVariationsPage((prev) => prev + 1);
    }
  }

  const variations = dataVariations?.data;

  /**
   * find first variation matching selected attributes
   */
  function findVariationByAttributes(variations: ProductVariation[], selectedAttributes: SelectedAttributes) {
    if (variations && variations.length) {
      const matches = [];
      // loop all variations
      for (const variation of variations) {
        let match = true;
        // loop all variation attribute
        for (const attribute of variation.attributes) {
          // attribute of id 0 are custom product attribute, out of scope
          if (attribute.id !== 0) {
            if (selectedAttributes[attribute.id] !== attribute.option) {
              match = false;
              break;
            }
          }
        }
        if (match) {
          matches.push(variation);
        }
      }
      return matches[0];
    }
  }

  // keep matching variation up to date
  useEffect(() => {
    setMatchingVariation(findVariationByAttributes(variations, selectedAttributes));
  }, [variations, selectedAttributes]);

  const descriptionSanitized = DOMPurify.sanitize(product.description);
  const images = matchingVariation ? [matchingVariation.image] : product.images;
  const isAddToCartEnabled = !isProductVariable || (isProductVariable && typeof matchingVariation !== "undefined");

  return (
    <>
      <PageTitle title={product.name} />
      {isLoadingVariations ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ProductImages productImages={images} withThumbnails />
            </Grid>
            <Grid item xs={12} md={6}>
              {product.categories.map((c, index) => (
                <Link component={RouterLink} to={`/category/${c.slug}/${c.id}`} sx={{ mr: index === product.categories.length - 1 ? 0 : 1 }} key={c.id}>
                  {c.name}
                </Link>
              ))}
              <Typography component="div" dangerouslySetInnerHTML={{ __html: descriptionSanitized }} />
              <Divider sx={{ my: 2 }} />

              {isProductVariable &&
                product.attributes.map(
                  (productAttribute) =>
                    productAttribute.id !== 0 && (
                      <Box mb={theme.spacing(2)} key={productAttribute.id}>
                        <SelectAttribute
                          productAttribute={productAttribute}
                          setSelectedAttributes={setSelectedAttributes}
                          selectedAttributes={selectedAttributes}
                        />
                      </Box>
                    )
                )}

              <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 2 }}>
                <ProductPrice product={matchingVariation ? matchingVariation : product} sx={{ fontSize: theme.typography.h4 }} />
                <Button variant={"contained"} color="success" disabled={!isAddToCartEnabled}>
                  Ajouter au panier
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />
            </Grid>
          </Grid>

          {product.relatedIds.length > 0 && (
            <Box mt={5}>
              <ProductsRelated product={product} />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
