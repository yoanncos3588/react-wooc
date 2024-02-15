import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { findFilterByParams, findFilterByKey, queriesAvailable, selectFilterDefaultValue, selectFilterValues } from "../services/filters/products";
import { useEffect } from "react";

const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSale = queriesAvailable.onSale.key;

  const activFilter = findFilterByParams(searchParams.get(queriesAvailable.orderBy.key), searchParams.get(queriesAvailable.order.key));

  const handleChange = (e: SelectChangeEvent) => {
    const selected = findFilterByKey(e.target.value);

    setSearchParams(
      (searchParams) => {
        if (selected) {
          if (selected.label === selectFilterDefaultValue.label) {
            searchParams.delete(queriesAvailable.orderBy.key);
            searchParams.delete(queriesAvailable.order.key);
          } else {
            searchParams.set(queriesAvailable.orderBy.key, selected.orderby);
            searchParams.set(queriesAvailable.order.key, selected.order);
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

  useEffect(() => {
    // reset page param when updating filter
    if (searchParams.get("page")) {
      searchParams.delete("page");
    }
  }, [searchParams]);

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
