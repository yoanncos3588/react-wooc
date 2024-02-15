import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { findFilterByParams, findFilterByKey, queryValues, selectFilterDefaultValue, selectFilterValues } from "../services/filters/products";

const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSale = queryValues.onSale.key;

  const activFilter = findFilterByParams(searchParams.get(queryValues.orderBy.key), searchParams.get(queryValues.order.key));

  const handleChange = (e: SelectChangeEvent) => {
    const selected = findFilterByKey(e.target.value);

    setSearchParams(
      (searchParams) => {
        if (selected) {
          if (selected.label === selectFilterDefaultValue.label) {
            searchParams.delete(queryValues.orderBy.key);
            searchParams.delete(queryValues.order.key);
          } else {
            searchParams.set(queryValues.orderBy.key, selected.orderby);
            searchParams.set(queryValues.order.key, selected.order);
          }
        }
        return searchParams;
      },
      { preventScrollReset: true }
    );
  };

  const handleChangeSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((searchParams) => {
      e.target.checked ? searchParams.set(onSale, "true") : searchParams.delete(onSale);
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
              value={activFilter ? activFilter.key : selectFilterDefaultValue.key}
              label="Trier par"
              onChange={handleChange}
            >
              {selectFilterValues.map((item) => (
                <MenuItem value={item.key} key={uuidv4()}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel control={<Switch color="warning" onChange={handleChangeSale} checked={!!searchParams.get(onSale)} />} label="Promo" />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterProducts;
