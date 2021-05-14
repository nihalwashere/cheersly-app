import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const PrimaryButton = withStyles(() => ({
  root: {
    color: "#ffffff",
    fontFamily: "Product Sans",
    backgroundColor: "#ff8c00",
    "&:hover": {
      backgroundColor: "#ff8c00c2",
    },
  },
}))(Button);

export const SecondaryButton = withStyles(() => ({
  root: {
    color: "#ffffff",
    fontFamily: "Product Sans",
    backgroundColor: "#6A5ACD",
    "&:hover": {
      backgroundColor: "#6a5acdd4",
    },
  },
}))(Button);

export const DangerButton = withStyles(() => ({
  root: {
    color: "#ffffff",
    fontFamily: "Product Sans",
    backgroundColor: "#EE3B3B",
    "&:hover": {
      backgroundColor: "#ee3b3bcc",
    },
  },
}))(Button);
