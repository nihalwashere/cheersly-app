import { CHEERSLY_TOKEN } from "./constants";

export const getDefaultHeaders = () => {
  const token = localStorage.getItem(CHEERSLY_TOKEN);

  return {
    "x-access-token": token,
  };
};
