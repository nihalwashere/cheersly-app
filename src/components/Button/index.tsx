import React from "react";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  label: string;
  onClick: any;
  type?: any;
  variant?: any;
  color?: any;
  disabled?: boolean;
  startIcon?: any;
  loading?: boolean;
  loadingPosition?: "start" | "end" | "center" | undefined;
  loaderButton?: boolean;
  fullWidth?: boolean;
};

const StyledButton = styled(MuiButton)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary,
  textTransform: "none",
  fontSize: 16,
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary,
  textTransform: "none",
  fontSize: 16,
}));

export default function Button(props: Props) {
  const {
    onClick,
    label,
    type,
    variant = "contained",
    color,
    disabled = false,
    startIcon = null,
    loading,
    loadingPosition,
    loaderButton = false,
    fullWidth = false,
  } = props;

  return (
    <div>
      {!loaderButton ? (
        <StyledButton
          variant={variant}
          onClick={onClick}
          type={type}
          color={color}
          disableElevation
          disabled={disabled}
          startIcon={startIcon}
          fullWidth={fullWidth}
        >
          <span className={`${!color ? "text-white" : ""}`}>{label}</span>
        </StyledButton>
      ) : (
        <StyledLoadingButton
          variant={variant}
          onClick={onClick}
          type={type}
          color={color}
          disableElevation
          disabled={disabled}
          startIcon={startIcon}
          loading={loading}
          loadingPosition={loadingPosition}
          fullWidth={fullWidth}
        >
          <span className={`${!color ? "text-white" : ""}`}>{label}</span>
        </StyledLoadingButton>
      )}
    </div>
  );
}
