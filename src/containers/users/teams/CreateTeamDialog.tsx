import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  CustomDialog,
  CustomDialogTitle,
} from "../../../components/CustomDialog";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMergeState } from "../../../utils/custom-hooks";
import CustomButton from "../../../components/CustomButton";
// import { debounce } from "../../../utils/common";

type Props = {
  open: boolean;
  onClose: any;
  onSave: any;
};

export default function CreateTeamDialog(props: Props) {
  const { open, onClose, onSave } = props;

  const [state, setState] = useMergeState({
    name: "",
    members: [],
    managers: [],
    userSearch: "",
    errors: {},
  });

  const handleChange = (event: any) => {
    console.log("HERE");
    setState({
      [event.target.name]: event.target.value,
      errors: {
        [event.target.name]: false,
      },
    });
  };

  const debounce = (func: any, wait: any) => {
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

  const handleSearch = (event: any) => {
    console.log("value : ", event.target.value);
    setState({ userSearch: event.target.value });
  };

  const debounceOnChange = useCallback(debounce(handleSearch, 500), []);

  const isFormValid = () => {
    let isValid = true;

    let payload = {};

    if (!state.name) {
      payload = { name: true };
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

    onSave(payload);
  };

  return (
    <CustomDialog
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
      <CustomDialogTitle onClose={onClose}>Create Team</CustomDialogTitle>

      <DialogContent dividers>
        <div className="w-3/4 mt-2 mb-2">
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={state.name}
            onChange={debounceOnChange}
            required
            error={state?.errors?.name}
          />

          {state?.errors?.name && <ErrorMessage message="Name is required" />}
        </div>
      </DialogContent>

      <DialogActions>
        <CustomButton label="Create team" onClick={handleSave} />
      </DialogActions>
    </CustomDialog>
  );
}
