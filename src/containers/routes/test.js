import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useMergeState } from "../../utils/custom-hooks";
import { getAllUsers } from "../../api";

export default function ComboBox() {
  const [state, setState] = useMergeState({
    value: "",
    inputValue: "",
    options: [],
    loading: false,
  });

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      const context = this;

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  const handleValueChange = async (value) => {
    setState({ value });
  };

  const handleInputChange = (inputValue) => {
    console.log("inputValue : ", inputValue);

    setState({ inputValue });
  };

  const handleSearch = async (inputValue) => {
    const response = await getAllUsers({ name: inputValue });

    console.log("response : ", response);

    setState({ loading: false, options: response.data.data });
  };

  const debounceOnChange = useCallback(debounce(handleSearch, 500), []);

  return (
    <div>
      <Autocomplete
        disablePortal
        value={state.value}
        onChange={(event, newValue) => {
          handleValueChange(newValue);
        }}
        inputValue={state.inputValue}
        onInputChange={(event, newInputValue) => {
          setState({ loading: true });
          handleInputChange(newInputValue);
          debounceOnChange(newInputValue);
        }}
        isOptionEqualToValue={(option, value) =>
          option?.slackUserData?.profile?.real_name ===
          value?.slackUserData?.profile?.real_name
        }
        options={state.options}
        getOptionLabel={(option) =>
          option?.slackUserData?.profile?.real_name || ""
        }
        loading={state.loading}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Users"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {state.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
