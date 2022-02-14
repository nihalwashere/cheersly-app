import React from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props = {
  severity: any;
  message: string;
  open: boolean;
  onClose: any;
};

export default function Alert(props: Props) {
  const { open, onClose, severity, message } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert severity={severity} onClose={onClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
