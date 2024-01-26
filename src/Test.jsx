import React from "react";
import { useQuery } from "react-query";
import { api } from "./services/api/api";

export const Test = () => {
  const query = useQuery("test", api.category.getAll);

  console.log(query);
  return <div>Test</div>;
};
