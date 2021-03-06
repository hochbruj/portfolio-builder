import { Token } from "../sharedTypes/eth.types";

export const formatPercentage = (value: number, absolute: boolean): string => {
  if (absolute) {
    return Math.abs(value * 100).toFixed(1) + "%";
  } else {
    return (value * 100).toFixed(1) + "%";
  }
};

export const formatAmount = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value === -(-0) ? 0 : value);
};

export const capitalize = (value: string): string => {
  return value[0].toUpperCase() + value.substring(1);
};

export const abbreviateAddress = (address: string): string => {
  if (!address) return address;
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 3,
    address.length
  )}`;
};

export const formatToUsd = (
  value: number,
  signDisplay = "auto",
  maximumFractionDigits = 2
): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits,
    signDisplay,
  }).format(value);

export const native = (token: Token): Token => {
  const tokenString: string = token;
  if (tokenString.charAt(0) === "a") return tokenString.substring(1) as Token;
  return token;
};
