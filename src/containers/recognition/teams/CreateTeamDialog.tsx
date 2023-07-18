import React from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMergeState } from "../../../utils/custom-hooks";
import Button from "../../../components/Button";

type Props = {
  open: boolean;
  onClose: any;
  onSave: any;
};

export default function CreateTeamDialog(props: Props) {
  const { open, onClose, onSave } = props;

  const [state, setState] = useMergeState({
    name: "",
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

    delete payload.errors;

    onSave(payload);
  };

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
        <span className="text-xl font-semibold">Create Team</span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="w-3/4 mt-2 mb-2">
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
            error={state?.errors?.name}
          />

          {state?.errors?.name && <ErrorMessage message="Name is required" />}
        </div>
      </DialogContent>

      <DialogActions>
        <Button label="Save" onClick={handleSave} />
      </DialogActions>
    </Dialog>
  );
}
