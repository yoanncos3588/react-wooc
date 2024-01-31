import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BillingInfos, ShippingInfos } from "../types/billingShipping";
import { Country } from "../types/locations";
import { countriesQuery } from "../queries";

interface Props {
  id: string;
  setData: React.Dispatch<React.SetStateAction<ShippingInfos | BillingInfos>>;
  selectedCountry: string;
}

const SelectCountry = ({ id, setData, selectedCountry }: Props) => {
  const { data } = useQuery(countriesQuery());
  const countries: Country[] = data?.data;

  const [inputValue, setInputValue] = useState<string>(getCountryByCode(selectedCountry)?.name ?? "");

  function getCountryByCode(countryCode: string): Country | null {
    return countries.find((country) => country.code === countryCode) ?? null;
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
        onChange={(e, value) => setData((prev) => ({ ...prev, country: value ? value.code : "" }))}
        renderInput={(params) => <TextField {...params} label="Pays" />}
      />
    </>
  );
};

export default SelectCountry;
