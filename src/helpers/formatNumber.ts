import BigNumber from "bignumber.js";
import { round } from "lodash";
import { numericFormatter } from "react-number-format";

export const convertNumberHidden = (number: string | number) => {
  const numberStr = number.toString();
  const maskedPart = "*".repeat(numberStr.length - 4);
  return maskedPart;
};

export const cutNumber = (number: string | number) => {
  const numberStr = number.toString();
  const lastFourDigits = numberStr.slice(-4);
  return lastFourDigits;
};

export const number2USD = (number?: string | number | null) => {
  let num = Number(number);

  if (isNaN(num)) {
    console.error("Invalid input: The input must be a number.");
    return 0;
  }

  let unit = "";

  if (num >= 1e12) {
    num /= 1e12;

    unit = "tn";
  } else if (num >= 1e9) {
    num /= 1e9;

    unit = "bn";
  } else if (num >= 1e6) {
    num /= 1e6;

    unit = "mn";
  } else if (num >= 1e3) {
    num /= 1e3;

    unit = "k";
  }

  const formattedNumber = numericFormatter(num.toString(), {
    decimalScale: Math.floor(num) === num ? 0 : 2,
    thousandSeparator: true,
  });

  return formattedNumber + unit;
};

export const number2Demand = (number?: string | number | null, unit = "x") => {
  const num = Number(number);

  if (isNaN(num)) {
    console.error("Invalid input: The input must be a number.");
    return 0;
  }

  const formattedNumber = numericFormatter(num.toString(), {
    decimalScale: Math.floor(num) === num ? 0 : 2,
    thousandSeparator: true,
  });

  return formattedNumber + unit;
};

export const number2Percentage = (number?: string | number | null) => {
  const num = Number(number);
  return `${round(num || 0, 1)}%`;
};

// Use number2USD for format USD
export const formatNumber = (
  number: number,
  roundedDown: boolean = false,
  decimal: number = 2
): string => {
  let formattedNumber = number;

  if (roundedDown) {
    formattedNumber = new BigNumber(number)
      .decimalPlaces(decimal, BigNumber.ROUND_FLOOR)
      .toNumber();
  }

  if (Number.isInteger(formattedNumber)) {
    return new Intl.NumberFormat("en-US").format(formattedNumber);
  }

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: roundedDown ? decimal : 0,
    maximumFractionDigits: decimal,
  }).format(formattedNumber);

  return formatted.replace(/\.?0+$/, "");
};

export const formatNumberWithComa = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
