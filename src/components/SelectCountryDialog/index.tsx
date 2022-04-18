import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Dialog, DialogTitle } from "../Dialog";
import Select from "../Select";
import ErrorMessage from "../ErrorMessage";
import { useMergeState } from "../../utils/custom-hooks";
import Button from "../Button";
import { COUNTRIES } from "../../utils/countries";

type Props = {
  selectedCountry: string;
  open: boolean;
  onClose: any;
  onSave: any;
};

export default function SelectCountryDialog(props: Props) {
  const { selectedCountry, open, onClose, onSave } = props;

  const [state, setState] = useMergeState({
    country: "",
    errors: {},
  });

  const handleChange = (event: any) => {
    setState({
      [event.target.name]: event.target.value,
      errors: {
        [event.target.name]: false,
      },
    });
  };

  const isFormValid = () => {
    let isValid = true;

    let payload = {};

    if (!state.country) {
      payload = { country: true };
      isValid = false;
    }

    setState({ errors: { ...payload } });

    return isValid;
  };

  const handleSave = () => {
    if (!isFormValid()) {
      return;
    }

    const payload = { ...state };

    delete payload.errors;

    onSave(payload);
  };

  useEffect(() => {
    if (selectedCountry) {
      setState({ country: selectedCountry });
    }
  }, []);

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(event);
        }
      }}
      open={open}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle onClose={onClose}>
        <span className="text-xl font-semibold">Select country</span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="text-base mt-2 mb-4">
          Please select your residential country to see available reward
          options.
        </div>

        <div className="w-3/4 mt-2 mb-2">
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              fullWidth
              variant="outlined"
              label="Country"
              name="country"
              value={state.country}
              onChange={handleChange}
            >
              {COUNTRIES.map((item: any) => (
                <MenuItem key={item.iso2Code} value={item.iso2Code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {state?.errors?.country && (
            <ErrorMessage message="Country is required" />
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button label="Save" onClick={handleSave} />
      </DialogActions>
    </Dialog>
  );
}
