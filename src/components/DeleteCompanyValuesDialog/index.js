import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { PrimaryButton } from "../CustomButton";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{ fontFamily: "Product Sans", fontWeight: "bold" }}
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DeleteCompanyValuesDialog = (props) => {
  const { open, handleClose, handleSave } = props;

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>Delete Company Value</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{ fontFamily: "Product Sans" }}>
            Are you sure you want to permanently remove this company value?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Yes</Button>
          <PrimaryButton onClick={handleClose}>No</PrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteCompanyValuesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default DeleteCompanyValuesDialog;
