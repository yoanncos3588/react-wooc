import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Country } from "../types/locations";
import { countriesQuery } from "../queries";
import { LocationInfos } from "../types/billingShipping";
import { InputStatus } from "../utils/validateInputs";
import TextFieldWithValidation from "./TextFieldWithValidation";

interface Props {
  id: string;
  setData: React.Dispatch<React.SetStateAction<LocationInfos>>;
  selectedCountry: string;
  inputStatus?: InputStatus;
}

const SelectCountry = ({ id, setData, selectedCountry, inputStatus }: Props) => {
  const { data } = useQuery(countriesQuery());
  const countries: Country[] = data?.data;

  const [inputValue, setInputValue] = useState<string>(getCountryByCode(selectedCountry)?.name ?? "");

  function getCountryByCode(countryCode: string): Country | null {
    return countries.find((country) => country.code === countryCode) ?? null;
  }

  function handleOnChange(value: Country | null) {
    setData((prev) => ({ ...prev, country: value ? value.code : "" }));
  }

  function renderInput(params: AutocompleteRenderInputParams) {
    if (inputStatus !== undefined) {
      return <TextFieldWithValidation {...params} label="Pays" inputStatus={inputStatus} />;
    } else {
      return <TextField {...params} label="Pays" />;
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
        renderInput={(params) => renderInput(params)}
      />
    </>
  );
};

export default SelectCountry;
