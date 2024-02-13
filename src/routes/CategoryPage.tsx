import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { categoriesQuery, productsQueryByCategory } from "../queries";
import ProductsList from "../components/ProductsList";

export interface CategoryPageUrlParams {
  id: string;
}

const CategoryPage = () => {
  const { id } = useParams();

  const { data: dataProducts, isPending: isPendingProducts, isError: isErrorProducts } = useQuery(productsQueryByCategory(id));
  const { data: dataCategories, isError: isErrorCategories } = useQuery(categoriesQuery());

  const category = dataCategories?.data.find((item) => item.id === Number(id));
  const products = dataProducts?.data;

  return (
    <>
      {products && category && (
        <>
          <PageTitle title={category?.name} />
          <ProductsList data={products} />
        </>
      )}
    </>
  );
};

export default CategoryPage;
