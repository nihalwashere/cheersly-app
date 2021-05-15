import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
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

const DeclineRedemptionRequestDialog = (props) => {
  const { open, handleClose, handleSave } = props;

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
          Decline Redemption Request
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{ fontFamily: "Product Sans" }}>
            Are you sure you want to decline this redemption request?
          </Typography>
          <Typography
            gutterBottom
            style={{ fontFamily: "Product Sans", fontSize: 12 }}
          >
            Member would be notified in Slack.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Decline</Button>
          <PrimaryButton onClick={handleClose}>Cancel</PrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeclineRedemptionRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default DeclineRedemptionRequestDialog;
