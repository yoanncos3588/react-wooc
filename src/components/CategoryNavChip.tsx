import { useQuery } from "@tanstack/react-query";
import { categoriesQuery, FormatedDataResponseType } from "../queries";
import { ProductCategorie } from "../types/categories";
import { Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  activCategory: ProductCategorie;
}

const CategoryNavChip = ({ activCategory }: Props) => {
  const { data: dataCategories } = useQuery(categoriesQuery()) as { data: FormatedDataResponseType<ProductCategorie[]> };

  let tabs: Array<JSX.Element> = [];

  const lastAncestor = getLastAncestorCategory(activCategory);

  const parentCategories = dataCategories.data.filter((c) => lastAncestor && activCategory.parent === c.id && lastAncestor.id !== c.id);
  const siblingsCategories = dataCategories.data.filter((c) => activCategory.parent === c.parent);
  const childsCategories = dataCategories.data.filter((c) => activCategory.id === c.parent);

  const childsTabs = generateChips(childsCategories);
  const activCategoryTab = generateChips([activCategory], true);
  const lastAncestorTab = lastAncestor ? generateChips([lastAncestor], true) : null;
  const parentTabs = generateChips(parentCategories, true);
  const siblingsTabs = generateChips(siblingsCategories, !!(childsTabs.length > 0));

  function generateChips(
    categories: Array<ProductCategorie>,
    // color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" = "primary"
    withDelimiter: boolean = false
  ): Array<JSX.Element> {
    return categories.map((c, index) => {
      const isActiv = c.id === activCategory.id;
      const props = {
        label: c.name,
        key: c.id,
        component: "span",
      };
      const propsLink = {
        component: Link,
        to: `/category/${c.slug}/${c.id}`,
        clickable: true,
      };
      return (
        <>
          <Chip {...props} {...(!isActiv && propsLink)} variant={isActiv ? "outlined" : "filled"} sx={{ opacity: isActiv ? 0.3 : 1 }} />
          {index === categories.length - 1 && withDelimiter && (
            <Typography mx={2} sx={{ display: "flex", alignItems: "center", opacity: 0.2 }}>
              /
            </Typography>
          )}
        </>
      );
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

  return (
    <Stack aria-label="Dans cette même catégorie" direction="row" spacing={1}>
      {tabs.map((t) => t)}
    </Stack>
  );
};

export default CategoryNavChip;
