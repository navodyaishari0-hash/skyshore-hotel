import { Room } from "@/types";
import { rooms } from "./index";

export { rooms };

export const currencyRates: Record<string, number> = {
  LKR: 1,
  USD: 0.0031,
  EUR: 0.0029,
  GBP: 0.0024,
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  LKR: "Rs.",
  USD: "$",
  EUR: "\u20AC",
  GBP: "\u00A3",
};
