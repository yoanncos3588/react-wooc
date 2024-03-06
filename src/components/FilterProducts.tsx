import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Switch, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { findFilterByParams, findFilterByKey, queriesAvailable, selectFilterDefaultValue, selectFilterValues } from "../services/filters/products";
import { useEffect, useState } from "react";

const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSaleKey = queriesAvailable.onSale.key;
  const minPriceKey = queriesAvailable.minPrice.key;
  const maxPriceKey = queriesAvailable.maxPrice.key;
  const orderByKey = queriesAvailable.orderBy.key;
  const orderKey = queriesAvailable.order.key;

  const priceRangeDefaultMin = 1;
  const priceRangeDefaultMax = 999;
  const [priceRange, setPriceRange] = useState<number[]>([
    searchParams.get(minPriceKey) ? Number(searchParams.get(minPriceKey)) : priceRangeDefaultMin,
    searchParams.get(maxPriceKey) ? Number(searchParams.get(maxPriceKey)) : priceRangeDefaultMax,
  ]);

  const activFilter = findFilterByParams(searchParams.get(orderByKey), searchParams.get(orderKey));

  const handleChange = (e: SelectChangeEvent) => {
    const selected = findFilterByKey(e.target.value);
    setSearchParams(
      (searchParams) => {
        if (selected) {
          if (selected.label === selectFilterDefaultValue.label) {
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

  const handlePriceRange = (e: Event, newValue: number[]) => {
    setPriceRange(newValue);
  };

  const handleValidPriceRange = () => {
    setSearchParams((searchParams) => {
      priceRange[0] === priceRangeDefaultMin ? searchParams.delete(minPriceKey) : searchParams.set(minPriceKey, String(priceRange[0]));
      priceRange[1] === priceRangeDefaultMax ? searchParams.delete(maxPriceKey) : searchParams.set(maxPriceKey, String(priceRange[1]));
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
          <FormControlLabel control={<Switch color="warning" onChange={handleChangeSale} checked={!!searchParams.get(onSaleKey)} />} label="Promo" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            getAriaLabel={() => "Tranche de prix"}
            value={priceRange}
            onChange={(e, value) => handlePriceRange(e, value as number[])}
            min={1}
            max={999}
            step={10}
            valueLabelDisplay="auto"
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>
              Entre {priceRange[0]} € et {priceRange[1]} €
            </Typography>
            <Button sx={{ marginLeft: 1 }} onClick={handleValidPriceRange}>
              Valider
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FilterProducts;
