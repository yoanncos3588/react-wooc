import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Country } from "../types/locations";
import { countriesQuery, FormatedDataResponseType } from "../queries";
import TextFieldWithValidation from "./TextFieldWithValidation";
import { Rule } from "../services/validation/validation";

type Props = TextFieldProps & {
  defaultCountryCode?: string;
  validationRules: Rule[];
};

const SelectCountry = ({ validationRules, defaultCountryCode, ...props }: Props) => {
  const { data } = useQuery(countriesQuery()) as { data: FormatedDataResponseType<Country[]> };
  const countries = data?.data;

  const [dataValue, setDataValue] = useState<Country | null>(null);
  const [countryCode, setCountryCode] = useState<string>(defaultCountryCode ? defaultCountryCode : "");
  const [inputValue, setInputValue] = useState<string>("");

  /** find country in data if a default code is defined */
  useEffect(() => {
    if (countries && defaultCountryCode) {
      const matchingCountry = countries.find((country) => country.code === defaultCountryCode);
      setDataValue(matchingCountry ? matchingCountry : null);
    }
  }, [countries, defaultCountryCode]);

  return (
    <>
      <Autocomplete
        value={dataValue}
        inputValue={inputValue}
        options={countries}
        getOptionLabel={(option) => option.name}
        onInputChange={(_e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(_e, value) => {
          setDataValue(value);
          setCountryCode(value ? value.code : "");
        }}
        renderInput={(params) => <TextFieldWithValidation {...params} label="Pays" value={inputValue} validationRules={validationRules} />}
      />
      {/** textfield use to send country code with formdata */}
      <TextField sx={{ display: "none" }} value={countryCode} name={props.name} />
    </>
  );
};

export default SelectCountry;
