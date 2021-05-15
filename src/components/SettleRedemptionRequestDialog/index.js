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

const SettleRedemptionRequestDialog = (props) => {
  const { open, handleClose, handleSave } = props;

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
          Settle Redemption Request
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{ fontFamily: "Product Sans" }}>
            By marking this redemption request as settled, you confirm that it
            was delivered to the member.
          </Typography>

          <Typography
            gutterBottom
            style={{ fontFamily: "Product Sans", fontSize: 12 }}
          >
            Member would be notified in Slack.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <PrimaryButton onClick={handleSave}>Settle</PrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SettleRedemptionRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default SettleRedemptionRequestDialog;
