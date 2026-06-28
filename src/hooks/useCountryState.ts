import { useEffect, useMemo } from "react";
import { Country, State } from "country-state-city";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormSetValue,
  type PathValue, 
  useWatch,
} from "react-hook-form";

interface UseCountryStateProps<T extends FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  countryField?: FieldPath<T>;
  stateField?: FieldPath<T>;
}

export function useCountryState<T extends FieldValues>({
  control,
  setValue,
  countryField = "Address.Country" as FieldPath<T>,
  stateField = "Address.State" as FieldPath<T>,
}: UseCountryStateProps<T>) {
  const selectedCountry = useWatch({
    control,
    name: countryField,
  });

  const selectedState = useWatch({
    control,
    name: stateField,
  });

  const countries = useMemo(() => Country.getAllCountries(), []);

  const states = useMemo(() => {
    if (!selectedCountry?.Code) return [];
    return State.getStatesOfCountry(selectedCountry.Code);
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry) {
      setValue(stateField, undefined as PathValue<T, typeof stateField>);
    }
  }, [selectedCountry, setValue, stateField]);

  return {
    countries,
    states,
    selectedCountry,
    selectedState,
  };
}