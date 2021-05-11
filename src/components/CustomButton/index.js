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
