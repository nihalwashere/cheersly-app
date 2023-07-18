import React, { useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMergeState } from "../../../utils/custom-hooks";
import Button from "../../../components/Button";

type Props = {
  open: boolean;
  onClose: any;
  onSave: any;
  shouldUpdate: boolean;
  companyValue: any;
};

export default function CompanyValuesDialog(props: Props) {
  const { open, onClose, onSave, shouldUpdate, companyValue } = props;

  const [state, setState] = useMergeState({
    title: "",
    description: "",
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

    if (!state.title) {
      payload = { ...payload, title: true };
      isValid = false;
    }

    if (!state.description) {
      payload = { ...payload, description: true };
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
    if (Object.keys(companyValue).length) {
      setState({
        title: companyValue.title,
        description: companyValue.description,
      });
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
        <span className="text-xl font-semibold">
          {shouldUpdate ? "Update" : "Create"} Company Value
        </span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="w-3/4 mt-2 mb-2">
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={state.title}
            onChange={handleChange}
            required
            error={state?.errors?.title}
          />

          {state?.errors?.title && <ErrorMessage message="Title is required" />}
        </div>

        <div className="w-3/4 mt-8 mb-2">
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            value={state.description}
            onChange={handleChange}
            required
            error={state?.errors?.description}
            multiline
            minRows={4}
          />

          {state?.errors?.description && (
            <ErrorMessage message="Description is required" />
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button label="Save" onClick={handleSave} />
      </DialogActions>
    </Dialog>
  );
}
