import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { PrimaryButton } from "../CustomButton";
import {
  MAX_REWARD_TITLE_LENGTH,
  MAX_REWARD_DESCRIPTION_LENGTH,
} from "../../utils/constants";
import "./styles.css";

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
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const CreateRewardDialog = (props) => {
  const {
    open,
    handleClose,
    handleSave,
    isEditMode = false,
    selectedReward = {},
  } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [descriptionCharCount, setDescriptionCharCount] = useState(
  //   MAX_REWARD_DESCRIPTION_LENGTH
  // );
  const [titleValidationError, setTitleValidationError] = useState(false);
  const [descriptionValidationError, setDescriptionValidationError] =
    useState(false);
  const [priceValidationError, setPriceValidationError] = useState(false);

  const handleTitle = (event) => {
    if (titleValidationError) {
      setTitleValidationError(false);
    }

    if (event.target.value.length > MAX_REWARD_TITLE_LENGTH) {
      return;
    }

    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    if (descriptionValidationError) {
      setDescriptionValidationError(false);
    }

    if (event.target.value.length > MAX_REWARD_DESCRIPTION_LENGTH) {
      return;
    }

    setDescription(event.target.value);
    // setDescriptionCharCount(
    //   MAX_REWARD_DESCRIPTION_LENGTH - event.target.value.length
    // );
  };

  const handlePrice = (event) => {
    if (priceValidationError) {
      setPriceValidationError(false);
    }

    setPrice(event.target.value);
  };

  const isInputValid = () => {
    let isValid = true;

    if (!title) {
      setTitleValidationError(true);
      isValid = false;
    }

    if (!description) {
      setDescriptionValidationError(true);
      isValid = false;
    }

    if (!price) {
      setPriceValidationError(true);
      isValid = false;
    }

    return isValid;
  };

  const saveReward = () => {
    if (!isInputValid()) {
      return;
    }

    const payload = { title, description, price };

    if (isEditMode) {
      payload.id = selectedReward.id;
    }

    handleSave(payload);
  };

  useEffect(() => {
    if (isEditMode) {
      const {
        title: newTitle,
        description: newDescription,
        price: newPrice,
      } = selectedReward;

      if (!title || title !== newTitle) {
        setTitle(newTitle);
      }

      if (!description || description !== newDescription) {
        setDescription(newDescription);
        // setDescriptionCharCount(
        //   MAX_REWARD_DESCRIPTION_LENGTH - newDescription.length
        // );
      }

      if (!price || price !== newPrice) {
        setPrice(newPrice);
      }
    }
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        disableBackdropClick
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>
          {isEditMode ? "Edit" : "Create New"} Reward
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <TextField
              placeholder="Title"
              variant="outlined"
              error={titleValidationError}
              required
              value={title}
              onChange={handleTitle}
              autoComplete="new-password"
              className="input-text-field"
              style={{ width: "100%", height: 45 }}
            />
          </div>

          <div style={{ marginTop: 20, marginBottom: 25 }}>
            <TextField
              placeholder="Description"
              variant="outlined"
              multiline
              rows={5}
              error={descriptionValidationError}
              required
              value={description}
              onChange={handleDescription}
              autoComplete="new-password"
              className="input-text-field"
              style={{ width: "100%", height: 100 }}
              inputProps={{
                style: {
                  height: 100,
                },
              }}
            />

            {/* <div className="create-reward-description-count-container">
              <div className="create-reward-description-count">
                {descriptionCharCount} characters remaining
              </div>
            </div> */}
          </div>

          <div style={{ marginTop: 50 }}>
            <TextField
              placeholder="Price in Cheers"
              variant="outlined"
              error={priceValidationError}
              required
              value={price}
              onChange={handlePrice}
              autoComplete="new-password"
              className="input-text-field"
              style={{ width: "100%", height: 45 }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={saveReward}>Save</PrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateRewardDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  selectedReward: PropTypes.object,
};

export default CreateRewardDialog;
