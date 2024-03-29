import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

type Props = {
  message: string;
};

export default function ErrorMessage(props: Props) {
  const { message } = props;

  return (
    <Typography variant="subtitle2" color="#d32f2f" mt={0.2}>
      {message}
    </Typography>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
