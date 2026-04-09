import { describe, expect, it } from "vitest";
import { DONATION_TAX_CASES, NOTARIAL_BASE_FEE_CASES, NOTARIAL_BREAKDOWN_CASES } from "./notarial-fee.test-cases";
import { calculateDonationTax, calculateNotarialBaseFee, calculateNotarialFeeBreakdown } from "./notarial-fee";

describe("calculateNotarialBaseFee", () => {
  it.each(NOTARIAL_BASE_FEE_CASES)("$name", ({ value, expected }) => {
    expect(calculateNotarialBaseFee(value)).toBe(expected);
  });
});

describe("calculateNotarialFeeBreakdown", () => {
  it.each(NOTARIAL_BREAKDOWN_CASES)("$name", ({ input, expected }) => {
    expect(calculateNotarialFeeBreakdown(input)).toEqual(expected);
  });
});

describe("calculateDonationTax", () => {
  it.each(DONATION_TAX_CASES)("$name", ({ value, group, expected }) => {
    expect(calculateDonationTax(value, group)).toBe(expected);
  });
});