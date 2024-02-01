import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Country } from "../types/locations";
import { countriesQuery } from "../queries";
import { Customer } from "../types/user";

interface Props {
  id: string;
  setData: React.Dispatch<React.SetStateAction<Customer>>;
  selectedCountry: string;
  isBilling: boolean;
}

const SelectCountry = ({ id, setData, selectedCountry, isBilling }: Props) => {
  const { data } = useQuery(countriesQuery());
  const countries: Country[] = data?.data;

  const [inputValue, setInputValue] = useState<string>(getCountryByCode(selectedCountry)?.name ?? "");

  function getCountryByCode(countryCode: string): Country | null {
    return countries.find((country) => country.code === countryCode) ?? null;
  }

  function handleOnChange(value: Country | null) {
    if (isBilling) {
      setData((prev) => ({ ...prev, billing: { ...prev.billing, country: value ? value.code : "" }, shipping: { ...prev.shipping } }));
    } else {
      setData((prev) => ({ ...prev, shipping: { ...prev.shipping, country: value ? value.code : "" }, billing: { ...prev.billing } }));
    }
  }

  return (
    <>
      <Autocomplete
        id={id}
        value={getCountryByCode(selectedCountry)}
        inputValue={inputValue}
        options={countries}
        getOptionLabel={(option) => option.name}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(e, value) => handleOnChange(value)}
        renderInput={(params) => <TextField {...params} label="Pays" />}
      />
    </>
  );
};

export default SelectCountry;
