import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

type Props = {
  label: string;
  type: any;
  onClick: any;
};

const StyledButton = styled(Button)(({ theme }: any) => ({
  backgroundColor: theme.palette.purple,
  textTransform: "none",
  fontSize: 16,
}));

export default function CustomButton(props: Props) {
  const { onClick, label, type } = props;

  return (
    <StyledButton
      variant="contained"
      disableElevation
      onClick={onClick}
      type={type}
    >
      {label}
    </StyledButton>
  );
}

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
