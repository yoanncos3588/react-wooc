import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { categoriesQuery, FormatedDataResponseType, productsQuery } from "../queries";
import ProductsList from "../components/ProductsList";
import PaginationBasic from "../components/PaginationBasic";
import Loading from "../components/Loading";
import { Typography, useTheme } from "@mui/material";
import FilterProducts from "../components/FilterProducts";
import { buildApiParams } from "../services/filters/products";
import { ProductCategorie } from "../types/categories";
import { Product } from "../types/products";
import CategoryNav from "../components/CategoryNav";

export interface CategoryPageUrlParams {
  id: string;
}
const CategoryPage = () => {
  const [urlSearchParams] = useSearchParams();
  const theme = useTheme();

  const currentPage = (urlSearchParams.get("page") ? urlSearchParams.get("page") : "1")!;
  const { id } = useParams() as { id: string }; // error should happens in router

  const { data: dataProducts, isPending: isPendingProducts } = useQuery(productsQuery(buildApiParams(id, urlSearchParams))) as {
    data: FormatedDataResponseType<Product[]>;
    isPending: boolean;
  };

  const { data: dataCategories } = useQuery(categoriesQuery()) as { data: FormatedDataResponseType<ProductCategorie[]> };

  const products = dataProducts.data;
  const category = dataCategories.data.find((item) => item.id === Number(id));
  const totalPages = Number(dataProducts.headers?.totalPages);
  const totalProducts = Number(dataProducts.headers?.total);

  return (
    <>
      {products && category && (
        <>
          <PageTitle title={category.name}>
            <CategoryNav activCategory={category} />
          </PageTitle>

          <Typography component="div" variant="caption" sx={{ mb: theme.spacing(4) }}>
            {totalProducts} articles
          </Typography>

          {isPendingProducts ? (
            <Loading />
          ) : (
            <ProductsList
              data={products}
              // @ts-expect-error shouldnt be an error
              paginationComponent={totalPages > 1 && <PaginationBasic currentPage={currentPage} totalPages={totalPages} />}
              // @ts-expect-error shouldnt be an error
              filtersComponent={<FilterProducts />}
            />
          )}
        </>
      )}
    </>
  );
};

export default CategoryPage;
