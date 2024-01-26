import React from "react";
import { useQuery } from "react-query";
import { api } from "./services/api/api";

export const Test = () => {
  const query = useQuery("test", api.category.get);
  const query2 = useQuery("test2", api.product.getAll);

  console.log(query);
  console.log(query2);
  return <div>Test</div>;
};
