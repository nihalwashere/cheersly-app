import React, { useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "../TextField";
import { useMergeState } from "../../utils/custom-hooks";
import { getAllUsers } from "../../api";

type Props = {
  value: any;
  onChange: any;
};

export default function UserSearchBox(props: Props) {
  const { value, onChange } = props;

  const [state, setState] = useMergeState({
    inputValue: "",
    options: [],
    loading: false,
  });

  const debounce = (func: any, wait: number) => {
    let timeout: any;

    return (...args: any) => {
      // @ts-ignore
      const context = this;

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  const handleValueChange = async (newValue: any) => {
    onChange(newValue);
  };

  const handleInputChange = (inputValue: any) => {
    setState({ inputValue });
  };

  const handleSearch = async (inputValue: any) => {
    const response = await getAllUsers({ name: inputValue });
    setState({ loading: false, options: response.data });
  };

  const debounceOnChange = useCallback(debounce(handleSearch, 500), []);

  return (
    <Autocomplete
      disablePortal
      multiple
      fullWidth
      value={value}
      onChange={(event, newValue) => {
        handleValueChange(newValue);
      }}
      inputValue={state.inputValue}
      onInputChange={(event, newInputValue) => {
        setState({ loading: true });
        handleInputChange(newInputValue);
        debounceOnChange(newInputValue);
      }}
      isOptionEqualToValue={(option, newValue) => {
        return (
          option?.slackUserData?.profile?.real_name ===
          newValue?.slackUserData?.profile?.real_name
        );
      }}
      options={state.options}
      getOptionLabel={(option) =>
        option?.slackUserData?.profile?.real_name || ""
      }
      loading={state.loading}
      noOptionsText="Search by user name..."
      renderInput={(params) => (
        <TextField
          {...params}
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
  );
}
