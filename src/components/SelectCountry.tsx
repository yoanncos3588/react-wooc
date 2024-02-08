import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Country } from "../types/locations";
import { countriesQuery } from "../queries";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { Rule } from "../utils/validateInputs";

type Props = TextFieldProps & {
  validationRules: Rule[];
};

const SelectCountry = ({ validationRules, ...props }: Props) => {
  const { data } = useQuery(countriesQuery());
  const countries: Country[] = data?.data;

  const [dataValue, setDataValue] = useState<Country | null>(null);
  const [countryCode, setCountryCode] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <Autocomplete
        value={dataValue}
        inputValue={inputValue}
        options={countries}
        getOptionLabel={(option) => option.name}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(e, value) => {
          setDataValue(value);
          setCountryCode(value ? value?.code : "");
        }}
        renderInput={(params) => <TextFieldWithValidation {...params} label="Pays" value={inputValue} validationRules={validationRules} />}
      />
      <TextField sx={{ display: "none" }} value={countryCode} name={props.name} />
    </>
  );
};

export default SelectCountry;
