import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "../Button";
import { Dialog, DialogTitle } from "../Dialog";

type Props = {
  title: string;
  message: string;
  open: boolean;
  onClose: any;
  onConfirm: any;
};

export default function ConfirmationDialog(props: Props) {
  const { title, message, open, onClose, onConfirm } = props;

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(event);
        }
      }}
      open={open}
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle onClose={onClose}>{title}</DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          label="Yes"
          onClick={onConfirm}
        />

        <Button label="No" onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
}
