import moment from "moment-timezone";

export const formatDate = (date: Date, format: string) =>
  moment(date).format(format);
