import type { DonationTaxGroup, DeedType, NotarialFeeBreakdown, NotarialFeeInput } from "./notarial-fee";

export type NotarialBaseFeeCase = {
  name: string;
  value: number;
  expected: number;
};

export type NotarialBreakdownCase = {
  name: string;
  input: NotarialFeeInput;
  expected: NotarialFeeBreakdown;
};

export const createNotarialInput = (
  overrides: Partial<NotarialFeeInput> = {},
  deedType: DeedType = "sale"
): NotarialFeeInput => ({
  value: 3000,
  deedType,
  copyCount: 3,
  copyPages: 6,
  includeVat: true,
  includeLandRegister: true,
  includePcc: true,
  donationTaxGroup: null,
  ...overrides
});

export const NOTARIAL_BASE_FEE_CASES: NotarialBaseFeeCase[] = [
  { name: "prog do 3 tys.", value: 3000, expected: 100 },
  { name: "prog do 10 tys.", value: 10000, expected: 310 },
  { name: "prog do 30 tys.", value: 30000, expected: 710 },
  { name: "prog do 60 tys.", value: 60000, expected: 1010 },
  { name: "prog do 1 mln", value: 1000000, expected: 4770 },
  { name: "prog do 2 mln", value: 2000000, expected: 6770 },
  { name: "limit maksymalny 10 tys.", value: 12000000, expected: 10000 }
];

export const NOTARIAL_BREAKDOWN_CASES: NotarialBreakdownCase[] = [
  {
    name: "kupno-sprzedaż z VAT, KW i PCC",
    input: createNotarialInput(),
    expected: {
      baseNet: 100,
      baseVat: 23,
      copiesNet: 108,
      copiesVat: 24.84,
      landRegisterFee: 246,
      courtFee: 200,
      mortgageEntryFee: 0,
      pccTax: 60,
      donationTax: 0,
      total: 761.84
    }
  },
  {
    name: "umowa przedwstępna bez PCC",
    input: createNotarialInput({ value: 680000 }, "preliminary"),
    expected: {
      baseNet: 1745,
      baseVat: 401.35,
      copiesNet: 108,
      copiesVat: 24.84,
      landRegisterFee: 246,
      courtFee: 200,
      mortgageEntryFee: 0,
      pccTax: 0,
      donationTax: 0,
      total: 2725.19
    }
  },
  {
    name: "ustanowienie hipoteki bez VAT i bez KW",
    input: createNotarialInput({
      value: 350000,
      deedType: "mortgage",
      copyCount: 2,
      copyPages: 8,
      includeVat: false,
      includeLandRegister: false,
      includePcc: false
    }),
    expected: {
      baseNet: 1085,
      baseVat: 0,
      copiesNet: 96,
      copiesVat: 0,
      landRegisterFee: 0,
      courtFee: 0,
      mortgageEntryFee: 200,
      pccTax: 0,
      donationTax: 0,
      total: 1381
    }
  },
  {
    name: "kupno-sprzedaż powyżej 2 mln bez PCC",
    input: createNotarialInput(
      {
        value: 2500000,
        copyCount: 4,
        copyPages: 10,
        includePcc: false
      },
      "sale"
    ),
    expected: {
      baseNet: 8020,
      baseVat: 1844.6,
      copiesNet: 240,
      copiesVat: 55.2,
      landRegisterFee: 246,
      courtFee: 200,
      mortgageEntryFee: 0,
      pccTax: 0,
      donationTax: 0,
      total: 10605.8
    }
  },
  {
    name: "maksymalna taksa z PCC",
    input: createNotarialInput(
      {
        value: 12000000,
        copyCount: 1,
        copyPages: 2,
        includeLandRegister: false
      },
      "sale"
    ),
    expected: {
      baseNet: 10000,
      baseVat: 2300,
      copiesNet: 12,
      copiesVat: 2.76,
      landRegisterFee: 0,
      courtFee: 0,
      mortgageEntryFee: 0,
      pccTax: 240000,
      donationTax: 0,
      total: 252314.76
    }
  },
  {
    name: "darowizna pełna taksa z VAT i KW",
    input: createNotarialInput({ value: 600000 }, "donation"),
    expected: {
      // pełny mnożnik (1), prog 60 tys.+ = 1010 + (600000-60000)*0.004 = 1010 + 2160 = 3170
      baseNet: 3170,
      baseVat: 729.1,
      copiesNet: 108,
      copiesVat: 24.84,
      landRegisterFee: 246,
      courtFee: 200,
      mortgageEntryFee: 0,
      pccTax: 0,
      donationTax: 0,
      total: 4477.94
    }
  }
  ,
  {
    name: "odrębna własność lokalu z KW (opłata sądowa 260 zł)",
    input: createNotarialInput({ value: 120000, copyCount: 2, copyPages: 4, includePcc: false }, "ownership"),
    expected: {
      // 1010 + (120000-60000)*0.004 = 1010 + 240 = 1250; * 0.5 = 625
      baseNet: 625,
      baseVat: 143.75,
      copiesNet: 48,
      copiesVat: 11.04,
      landRegisterFee: 246,
      courtFee: 260,
      mortgageEntryFee: 0,
      pccTax: 0,
      donationTax: 0,
      total: 1333.79
    }
  }
  ,
  {
    name: "darowizna Grupa I, 50 000 zł (nadwyżka 13 880 → II próg)",
    input: createNotarialInput({ value: 50000, donationTaxGroup: "I", includeLandRegister: false }, "donation"),
    expected: {
      // 710 + (50000-30000)*0.01 = 710 + 200 = 910
      baseNet: 910,
      baseVat: 209.3,
      copiesNet: 108,
      copiesVat: 24.84,
      landRegisterFee: 0,
      courtFee: 0,
      mortgageEntryFee: 0,
      pccTax: 0,
      // excess 50000-36120=13880; 355 + 5%*(13880-11833)=355+102.35=457.35
      donationTax: 457.35,
      total: 1709.49
    }
  }
];

export type DonationTaxCase = {
  name: string;
  value: number;
  group: DonationTaxGroup;
  expected: number;
};

export const DONATION_TAX_CASES: DonationTaxCase[] = [
  { name: "zerowa – dowolna kwota, brak podatku", value: 1000000, group: "zerowa", expected: 0 },
  { name: "I – poniżej limitu (30 000)", value: 30000, group: "I", expected: 0 },
  { name: "I – na limicie (36 120)", value: 36120, group: "I", expected: 0 },
  // excess = 41120-36120=5000; 3%×5000=150
  { name: "I – 1. próg, nadwyżka 5 000", value: 41120, group: "I", expected: 150 },
  // excess = 47953-36120=11833; 3%×11833=354.99
  { name: "I – na granicy 1. i 2. progu", value: 47953, group: "I", expected: 354.99 },
  // excess = 50000-36120=13880; 355 + 5%*(13880-11833)=355+102.35=457.35
  { name: "I – 2. próg, value 50 000", value: 50000, group: "I", expected: 457.35 },
  // excess = 100000-36120=63880; 946 + 7%*(63880-23665)=946+2815.05=3761.05
  { name: "I – 3. próg, value 100 000", value: 100000, group: "I", expected: 3761.05 },
  // excess = 35090-27090=8000; 7%×8000=560
  { name: "II – 1. próg, nadwyżka 8 000", value: 35090, group: "II", expected: 560 },
  // excess = 50000-27090=22910; 828 + 9%*(22910-11833)=828+996.93=1824.93
  { name: "II – 2. próg, value 50 000", value: 50000, group: "II", expected: 1824.93 },
  // excess = 100000-27090=72910; 1893 + 12%*(72910-23665)=1893+5909.4=7802.4
  { name: "II – 3. próg, value 100 000", value: 100000, group: "II", expected: 7802.4 },
  // excess = 20000-5733=14267; 1420 + 16%*(14267-11833)=1420+389.44=1809.44
  { name: "III – 2. próg, value 20 000", value: 20000, group: "III", expected: 1809.44 },
  // excess = 40000-5733=34267; 2877 + 20%*(34267-23665)=2877+2120.4=4997.4
  { name: "III – 3. próg, value 40 000", value: 40000, group: "III", expected: 4997.4 }
];