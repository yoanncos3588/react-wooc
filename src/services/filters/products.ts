interface Filter {
  key: string;
  label: string;
  orderby: string;
  order: string;
}

export const queryValues = {
  orderBy: { key: "orderby", values: { title: "title", price: "price", date: "date" } },
  order: { key: "order", values: { asc: "asc", desc: "desc" } },
  onSale: { key: "on_sale", values: { true: "true", false: "false" } },
};

const date = queryValues.orderBy.values.date;
const title = queryValues.orderBy.values.title;
const price = queryValues.orderBy.values.price;

const desc = queryValues.order.values.desc;
const asc = queryValues.order.values.asc;

export const selectFilterDefaultValue = { key: "default", label: "Plus récents", orderby: date, order: asc };

export const selectFilterValues: Array<Filter> = [
  selectFilterDefaultValue,
  { key: "older", label: "Plus anciens ", orderby: date, order: desc },
  { key: "name", label: "Nom (A-z)", orderby: title, order: asc },
  { key: "nameReverse", label: "Nom (Z-a)", orderby: title, order: desc },
  { key: "price", label: "Plus chers", orderby: price, order: asc },
  { key: "priceReverse", label: "Moins chers", orderby: price, order: desc },
];

export function findFilterByParams(orderBy: string | null, order: string | null) {
  if (!orderBy || !order) {
    return undefined;
  }
  return selectFilterValues.find((filter) => filter.orderby === orderBy && filter.order === order);
}

export function findFilterByKey(key: string) {
  return selectFilterValues.find((filter) => filter.key === key);
}
