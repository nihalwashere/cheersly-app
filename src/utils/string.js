export const truncateString = (input, maxAllowedLength) =>
  input.length > maxAllowedLength
    ? `${input.substring(0, maxAllowedLength)}...`
    : input;
