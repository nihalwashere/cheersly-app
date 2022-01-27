export const truncateString = (input: string, maxAllowedLength: number) =>
  input.length > maxAllowedLength
    ? `${input.substring(0, maxAllowedLength)}...`
    : input;
