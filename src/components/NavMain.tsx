import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import StyledNavMain from "../styled/NavMain";
import { useQuery } from "@tanstack/react-query";
import { categoriesQuery, FormatedDataResponseType } from "../queries";
import { ProductCategorie } from "../types/categories";

const NavMain = () => {
  const { data } = useQuery(categoriesQuery()) as { data: FormatedDataResponseType<ProductCategorie[]> };

  return (
    <>
      {data &&
        data.data.map((category) => (
          <StyledNavMain key={category.id}>
            <Button component={RouterLink} variant="text" sx={{ color: "white" }} to={`/category/${category.slug}/${category.id}`}>
              {category.name}
            </Button>
          </StyledNavMain>
        ))}
    </>
  );
};

export default NavMain;
