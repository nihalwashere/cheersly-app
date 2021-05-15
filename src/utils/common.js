import { CHEERSLY_TOKEN } from "./constants";

export const getDefaultHeaders = () => {
  const token = localStorage.getItem(CHEERSLY_TOKEN);

  return {
    "x-access-token": token,
  };
};

export const getDaysOld = (date) =>
  new Date().getDay() - new Date(date).getDay();

export const resolveRedemptionCreatedDaysOld = (date) => {
  const days = getDaysOld(date);

  if (days === 0) {
    return "redeemed today";
  }

  const dayOrDays = days === 1 ? "day" : "days";

  return `redeemed ${days} ${dayOrDays} ago`;
};

export const resolveRedemptionUpdatedDaysOld = (date, status) => {
  const days = getDaysOld(date);

  if (days === 0) {
    return `${String(status).toLowerCase()} today`;
  }

  const dayOrDays = days === 1 ? "day" : "days";

  return `${String(status).toLowerCase()} ${days} ${dayOrDays} ago`;
};
