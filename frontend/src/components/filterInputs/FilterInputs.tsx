import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField/TextField";
import { flagTypes, directionTypes } from "../../components/";

export interface SortValues {
  [x: string]: string[];
}
interface SetSortValuesProps {
  setSortValues: (event: SortValues) => void;
}

export const FilterInputs: FunctionComponent<SetSortValuesProps> = ({
  setSortValues,
}): ReactElement => {
  const [flag, setFlag] = useState<string[]>(flagTypes);
  const [direction, setDirection] = useState<string[]>(directionTypes);
  useEffect(() => {
    setSortValues({ flag, direction });
  }, [flag, direction, setSortValues]);
  const AutocompleteOptions = [
    { value: flag, onChangeFunc: setFlag, options: flagTypes, label: "Flag" },
    {
      value: direction,
      onChangeFunc: setDirection,
      options: directionTypes,
      label: "Direction",
    },
  ];
  return (
    <>
      <div className="form--item">
        {AutocompleteOptions.map((option) => {
          return (
            <Autocomplete
              style={{
                marginBottom: "30px",
                marginLeft: "20px",
                width: "300px",
              }}
              multiple
              value={option.value}
              onChange={(_event, newValue: string[]) =>
                option.onChangeFunc(newValue)
              }
              options={option.options}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label={option.label} />
              )}
            />
          );
        })}
      </div>
    </>
  );
};
