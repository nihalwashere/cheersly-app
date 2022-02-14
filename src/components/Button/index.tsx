import React from "react";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

type Props = {
  label: string;
  onClick: any;
  type?: any;
  variant?: any;
  color?: any;
};

const StyledButton = styled(MuiButton)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary,
  textTransform: "none",
  fontSize: 16,
}));

export default function Button(props: Props) {
  const { onClick, label, type, variant = "contained", color } = props;

  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      type={type}
      color={color}
      disableElevation
    >
      <span className={`${!color ? "text-white" : ""}`}>{label}</span>
    </StyledButton>
  );
}
