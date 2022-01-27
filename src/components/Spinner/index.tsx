import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

type Props = {
  loading: boolean;
};

export default function Spinner(props: Props) {
  const { loading } = props;

  return <BeatLoader color="#5f6caf" loading={loading} />;
}
