import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { categoriesQuery, productsQuery } from "../queries";
import ProductsList from "../components/ProductsList";
import PaginationBasic from "../components/PaginationBasic";
import Loading from "../components/Loading";
import { Typography, useTheme } from "@mui/material";
import FilterProducts from "../components/FilterProducts";
import { buildApiParams } from "../services/filters/products";

export interface CategoryPageUrlParams {
  id: string;
}
const CategoryPage = () => {
  const [urlSearchParams] = useSearchParams();
  const theme = useTheme();

  const currentPage = (urlSearchParams.get("page") ? urlSearchParams.get("page") : "1")!;
  const { id } = useParams() as { id: string }; // error should happens in router

  const { data: dataProducts, isPending: isPendingProducts } = useQuery(productsQuery(buildApiParams(id, urlSearchParams)));

  const { data: dataCategories } = useQuery(categoriesQuery());

  const category = dataCategories?.data.find((item) => item.id === Number(id));
  const products = dataProducts?.data;
  const totalPages = dataProducts?.headers["x-wp-totalpages"];
  const totalProducts = dataProducts?.headers["x-wp-total"];

  return (
    <>
      {products && category && (
        <>
          <PageTitle title={category?.name} />
          <Typography component="div" variant="caption" sx={{ mb: theme.spacing(4) }}>
            {totalProducts} articles
          </Typography>
          {isPendingProducts ? (
            <Loading />
          ) : (
            <ProductsList
              data={products}
              // @ts-expect-error shouldnt be an error
              paginationComponent={<PaginationBasic currentPage={currentPage} totalPages={totalPages} />}
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
