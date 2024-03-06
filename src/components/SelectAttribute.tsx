import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { ProductAttributes } from "../types/products";
import { useQuery } from "@tanstack/react-query";
import { productAttributeQuery } from "../queries";
import Loading from "./Loading";
import { Attribute } from "../types/attributes";
import { SetStateAction } from "react";

interface Props {
  productAttribute: ProductAttributes;
  setSelectedAttributes: React.Dispatch<SetStateAction<SelectedAttributes>>;
  selectedAttributes: SelectedAttributes;
}

export interface SelectedAttributes {
  [key: string]: string;
}

const SelectAttribute = ({ productAttribute, setSelectedAttributes, selectedAttributes }: Props) => {
  // load attribute model complete infos
  const { data: dataAttribute, isLoading } = useQuery(productAttributeQuery(String(productAttribute.id)));

  const attributeObj = dataAttribute?.data as Attribute;

  const value = selectedAttributes[attributeObj?.id];

  function handleChange(e: SelectChangeEvent) {
    setSelectedAttributes((prev) => {
      return { ...prev, [attributeObj.id]: e.target.value };
    });
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FormControl fullWidth>
          <InputLabel>{productAttribute.name}</InputLabel>
          <Select value={value ? value : ""} label={productAttribute.name} onChange={handleChange}>
            {productAttribute.options.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default SelectAttribute;
