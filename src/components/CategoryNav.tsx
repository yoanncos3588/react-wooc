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

  let tabs: Array<JSX.Element> = [];

  const lastAncestor = getLastAncestorCategory(activCategory);

  const parentCategories = dataCategories.data.filter((c) => lastAncestor && activCategory.parent === c.id && lastAncestor.id !== c.id);
  const siblingsCategories = dataCategories.data.filter((c) => activCategory.parent === c.parent);
  const childsCategories = dataCategories.data.filter((c) => activCategory.id === c.parent);

  const activCategoryTab = generateMuiTabs([activCategory], true);
  const lastAncestorTab = lastAncestor ? generateMuiTabs([lastAncestor], true) : null;
  const parentTabs = generateMuiTabs(parentCategories, siblingsCategories.length > 0 ? true : false);
  const siblingsTabs = generateMuiTabs(siblingsCategories, childsCategories.length > 0 ? true : false);
  const childsTabs = generateMuiTabs(childsCategories);

  /**
   * generate jsx Tab element for products categories
   * @param categoriesArray list of categories
   * @param addChevron add a chevron ">" a the end of the last item to show parent/sub category
   * @returns {Array<JSX.Element>} Tab MUI JSX.elements
   */
  function generateMuiTabs(categories: Array<ProductCategorie>, addChevron: boolean = false): Array<JSX.Element> {
    return categories.map((c, index) => {
      return <Tab label={`${c.name} ${addChevron && index === categories.length - 1 ? ">" : ""} `} value={c.id} key={c.id} />;
    });
  }

  // merge all tabs because MUI Tabs dont want fragment as child
  if (activCategory.parent === 0) {
    tabs = [...activCategoryTab, ...childsTabs];
  } else {
    if (lastAncestorTab) {
      tabs = [...lastAncestorTab, ...parentTabs, ...siblingsTabs, ...childsTabs];
    } else {
      tabs = [...parentTabs, ...siblingsTabs, ...childsTabs];
    }
  }

  /**
   * Recursively find the oldest parent of a category
   */
  function getLastAncestorCategory(category: ProductCategorie) {
    if (category.parent !== 0) {
      const parent = dataCategories.data.find((c) => c.id === category.parent);
      if (parent) {
        return getLastAncestorCategory(parent);
      } else {
        return;
      }
    } else {
      return category;
    }
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
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        aria-label="Dans cette même catégorie"
        value={activCategory.id}
        onChange={handleChange}
        scrollButtons={true}
        allowScrollButtonsMobile
        variant="scrollable"
      >
        {tabs.map((t) => t)}
      </Tabs>
    </Box>
  );
};

export default CategoryNav;
