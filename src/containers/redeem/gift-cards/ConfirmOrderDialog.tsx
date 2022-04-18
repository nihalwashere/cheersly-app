import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMergeState } from "../../../utils/custom-hooks";
import Button from "../../../components/Button";
import { VALUE_TYPE } from "../../../utils/constants";
import { validateEmail } from "../../../utils/common";

type Props = {
  open: boolean;
  onClose: any;
  onSave: any;
  data: any;
};

export default function ConfirmOrderDialog(props: Props) {
  const { open, onClose, onSave, data } = props;

  const [state, setState] = useMergeState({
    recipientName: "",
    recipientEmail: "",
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

    if (!state.recipientName) {
      payload = { ...payload, recipientName: true };
      isValid = false;
    }

    if (!validateEmail(state.recipientEmail)) {
      payload = { ...payload, recipientEmail: true };
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
    if (Object.keys(data).length) {
      setState({
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
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
        <span className="text-xl font-semibold">Confirm gift card order</span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="flex text-base mt-2 mb-2">
          <div className="w-1/4">Reward:</div>

          <div className="font-semibold">{data.selectedItem.rewardName}</div>
        </div>

        <div className="flex text-base mt-2 mb-2">
          <div className="w-1/4">Amount:</div>

          <div className="font-semibold">
            {data.valueType === VALUE_TYPE.FIXED_VALUE
              ? data.selectedItem.faceValue
              : data.selectedFaceValue}{" "}
            {data.selectedItem.currencyCode}
          </div>
        </div>

        <div className="flex text-base mt-2 mb-2">
          <div className="w-1/4">Points:</div>{" "}
          <div className="font-semibold">{data.points}</div>
        </div>

        <div className="mt-5 mb-5">
          <Divider />
        </div>

        <div className="text-sm">
          Please confirm the following details, the gift card would be delivered
          on the below email. Feel free to update it.
        </div>

        <div className="w-3/4 mt-10 mb-2">
          <TextField
            fullWidth
            label="Recipient name"
            variant="outlined"
            name="recipientName"
            value={state.recipientName}
            onChange={handleChange}
            required
            error={state?.errors?.recipientName}
          />

          {state?.errors?.recipientName && (
            <ErrorMessage message="Recipient name is required" />
          )}
        </div>

        <div className="w-3/4 mt-8 mb-2">
          <TextField
            fullWidth
            label="Recipient email"
            variant="outlined"
            name="recipientEmail"
            value={state.recipientEmail}
            onChange={handleChange}
            required
            error={state?.errors?.recipientEmail}
          />

          {state?.errors?.recipientEmail && (
            <ErrorMessage message="Recipient email is invalid" />
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button label="Confirm and place order" onClick={handleSave} />
      </DialogActions>
    </Dialog>
  );
}
