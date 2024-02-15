import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { filtersProductsQueryKeys } from "../services/filters/products";

const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderKey = filtersProductsQueryKeys.order;
  const orderByKey = filtersProductsQueryKeys.orderBy;
  const onSaleKey = filtersProductsQueryKeys.onSale;

  const defaultOrder = { label: "Plus récents", value: `${orderKey}=date&${orderByKey}=asc`, orderby: "asc", order: "date" };

  const orderByValues = [
    defaultOrder,
    { label: "Plus anciens ", value: `${orderKey}=date&${orderByKey}=desc`, orderby: "desc", order: "date" },
    { label: "Nom (A-z)", value: `${orderKey}=title&${orderByKey}=asc`, orderby: "asc", order: "title" },
    { label: "Nom (Z-a)", value: `${orderKey}=title&${orderByKey}=desc`, orderby: "desc", order: "title" },
    { label: "Plus chers", value: `${orderKey}=price&${orderByKey}=asc`, orderby: "asc", order: "price" },
    { label: "Moins chers", value: `${orderKey}=price&${orderByKey}=desc`, orderby: "desc", order: "price" },
  ];

  const orderBySelectValue = orderByValues.find(
    (item) => item.value === `${orderKey}=${searchParams.get(orderKey)}&${orderByKey}=${searchParams.get(orderByKey)}`
  );

  const handleChange = (e: SelectChangeEvent) => {
    const selected = orderByValues.find((item) => e.target.value === `${orderKey}=${item.order}&${orderByKey}=${item.orderby}`);

    setSearchParams(
      (searchParams) => {
        if (selected) {
          if (selected.value === defaultOrder.value) {
            searchParams.delete(orderByKey);
            searchParams.delete(orderKey);
          } else {
            searchParams.set(orderByKey, selected.orderby);
            searchParams.set(orderKey, selected.order);
          }
        }
        return searchParams;
      },
      { preventScrollReset: true }
    );
  };

  const handleChangeSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((searchParams) => {
      e.target.checked ? searchParams.set(onSaleKey, "true") : searchParams.delete(onSaleKey);
      return searchParams;
    });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="products-orderby">Trier</InputLabel>
            <Select
              labelId="products-orderby"
              id="products-orderby-select"
              value={orderBySelectValue ? orderBySelectValue.value : defaultOrder.value}
              label="Trier par"
              onChange={handleChange}
            >
              {orderByValues.map((item) => (
                <MenuItem value={item.value} key={uuidv4()}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel control={<Switch color="warning" onChange={handleChangeSale} checked={!!searchParams.get(onSaleKey)} />} label="Promo" />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterProducts;
