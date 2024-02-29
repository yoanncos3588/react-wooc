import { useQuery } from "@tanstack/react-query";
import { categoriesQuery, formatedDataResponseType } from "../queries";
import { ProductCategorie } from "../types/categories";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  activCategory: ProductCategorie;
}

const CategoryNav = ({ activCategory }: Props) => {
  const navigate = useNavigate();
  const { data: dataCategories } = useQuery(categoriesQuery()) as { data: formatedDataResponseType<ProductCategorie[]> };

  const categoryIsParent = dataCategories.data.some((category) => category.id === activCategory.id && category.parent === 0);

  let tabs: Array<ProductCategorie> = [];

  if (categoryIsParent) {
    // if cat is parent then add this item to the tabs and find items where current category is parent cat
    tabs = [activCategory, ...dataCategories.data.filter((category) => category.parent === activCategory.id)];
  } else {
    // if cat is child then add parent to the tabs and find siblings who share the same parent
    const parentCat = dataCategories.data.find((category) => category.id === activCategory.parent);
    tabs = [...(parentCat ? [parentCat] : []), ...dataCategories.data.filter((category) => category.parent === activCategory.parent)];
  }

  /**
   * navigate to selected category on click on tabs
   */
  function handleChange(_e: React.SyntheticEvent, id: string) {
    const selectedCategory = dataCategories.data.find((c) => c.id === Number(id));
    if (selectedCategory) {
      navigate(`/category/${selectedCategory.slug}/${id}`);
    }
  }

  return (
    tabs.length > 1 && (
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="Dans cette même catégorie" value={activCategory.id} onChange={handleChange}>
          {tabs.map((c, index) => (
            <Tab label={`${c.name} ${index === 0 ? " >" : ""}`} value={c.id} key={c.id} />
          ))}
        </Tabs>
      </Box>
    )
  );
};

export default CategoryNav;
