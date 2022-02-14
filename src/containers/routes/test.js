import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "../../components/TextField";
import { useMergeState } from "../../utils/custom-hooks";

export default function Test() {
  const [state, setState] = useMergeState({
    value: [],
  });

  const handleValueChange = (value) => {
    setState({ value });
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        multiple
        disableClearable
        options={[].map((option) => option)}
        value={state.value}
        onChange={(event, newValue) => {
          handleValueChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </div>
  );
}
