import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultOrder = { label: "Plus récents", value: "order=date&orderby=asc", orderby: "asc", order: "date" };

  const orderByValues = [
    defaultOrder,
    { label: "Plus anciens ", value: "order=date&orderby=desc", orderby: "desc", order: "date" },
    { label: "Nom (A-z)", value: "order=title&orderby=asc", orderby: "asc", order: "title" },
    { label: "Nom (Z-a)", value: "order=title&orderby=desc", orderby: "desc", order: "title" },
    { label: "Plus chers", value: "order=price&orderby=asc", orderby: "asc", order: "price" },
    { label: "Moins chers", value: "order=price&orderby=desc", orderby: "desc", order: "price" },
  ];

  const order = searchParams.get("order");
  const orderBy = searchParams.get("orderby");
  const onSale = searchParams.get("on_sale");
  const orderByActivValue = orderByValues.find((item) => item.value === `order=${order}&orderby=${orderBy}`);

  const handleChange = (e: SelectChangeEvent) => {
    const selected = orderByValues.find((item) => e.target.value === `order=${item.order}&orderby=${item.orderby}`);

    setSearchParams((searchParams) => {
      if (selected) {
        if (selected.value === defaultOrder.value) {
          searchParams.delete("orderby");
          searchParams.delete("order");
        } else {
          searchParams.set("orderby", selected.orderby);
          searchParams.set("order", selected.order);
        }
      }
      return searchParams;
    });
  };

  const handleChangeSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSearchParams((searchParams) => {
        searchParams.set("on_sale", "true");
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.delete("on_sale");
        return searchParams;
      });
    }
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
              value={orderByActivValue ? orderByActivValue.value : defaultOrder.value}
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
          <FormControlLabel control={<Switch color="warning" onChange={handleChangeSale} checked={!!onSale} />} label="Promo" />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterProducts;
