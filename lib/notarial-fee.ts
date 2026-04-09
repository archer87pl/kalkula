export type DeedConfig = {
  label: string;
  feeMultiplier: number;
  allowsPcc: boolean;
  addsMortgageEntry: boolean;
  allowsLandRegister: boolean;
};

export const DEED_TYPES = {
  sale: {
    label: "Kupno-sprzedaż",
    feeMultiplier: 1,
    allowsPcc: true,
    addsMortgageEntry: false,
    allowsLandRegister: true
  },
  preliminary: {
    label: "Umowa przedwstępna",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false,
    allowsLandRegister: true
  },
  donation: {
    label: "Darowizna",
    feeMultiplier: 1,
    allowsPcc: false,
    addsMortgageEntry: false,
    allowsLandRegister: true
  },
  developer: {
    label: "Umowa deweloperska",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false,
    allowsLandRegister: true
  },
  ownership: {
    label: "Ustanowienie odrębnej własności lokalu",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false,
    allowsLandRegister: true
  },
  mortgage: {
    label: "Ustanowienie hipoteki",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: true,
    allowsLandRegister: true
  },
  enforcement: {
    label: "Poddanie się egzekucji",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false,
    allowsLandRegister: false
  }
} satisfies Record<string, DeedConfig>;

export type DeedType = keyof typeof DEED_TYPES;

export type DonationTaxGroup = "zerowa" | "I" | "II" | "III";

export type DonationGroupConfig = {
  label: string;
  members: string;
  exemptionLimit: number;
};

export const DONATION_TAX_GROUPS: Record<DonationTaxGroup, DonationGroupConfig> = {
  zerowa: {
    label: "Grupa zerowa",
    members: "Małżonek, zstępni, wstępni, pasierb, rodzeństwo, ojczym, macocha",
    exemptionLimit: Infinity
  },
  I: {
    label: "Grupa I",
    members: "Zięć, synowa, teściowie",
    exemptionLimit: 36120
  },
  II: {
    label: "Grupa II",
    members: "Zstępni rodzeństwa, rodzeństwo rodziców, zstępni i małżonkowie pasierbów, małżonkowie rodzeństwa i rodzeństwo małżonków, małżonkowie rodzeństwa małżonków, małżonkowie innych zstępnych",
    exemptionLimit: 27090
  },
  III: {
    label: "Grupa III",
    members: "Inni nabywcy",
    exemptionLimit: 5733
  }
};

export type NotarialFeeInput = {
  value: number;
  deedType: DeedType;
  copyCount: number;
  copyPages: number;
  includeVat: boolean;
  includeLandRegister: boolean;
  includePcc: boolean;
  donationTaxGroup?: DonationTaxGroup | null;
};

export type NotarialFeeBreakdown = {
  baseNet: number;
  baseVat: number;
  copiesNet: number;
  copiesVat: number;
  /** Opłata za wniosek wieczystoksięgowy (200 zł netto + 23% VAT, jeśli VAT włączony) */
  landRegisterFee: number;
  /** Opłata sądowa za wpis (200 zł), doliczana razem z wnioskiem KW */
  courtFee: number;
  mortgageEntryFee: number;
  pccTax: number;
  donationTax: number;
  total: number;
};

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateDonationTax(donationValue: number, group: DonationTaxGroup): number {
  if (group === "zerowa") return 0;
  const excess = Math.max(0, donationValue - DONATION_TAX_GROUPS[group].exemptionLimit);
  if (excess === 0) return 0;

  if (group === "I") {
    if (excess <= 11833) return roundMoney(excess * 0.03);
    if (excess <= 23665) return roundMoney(355 + (excess - 11833) * 0.05);
    return roundMoney(946 + (excess - 23665) * 0.07);
  }
  if (group === "II") {
    if (excess <= 11833) return roundMoney(excess * 0.07);
    if (excess <= 23665) return roundMoney(828 + (excess - 11833) * 0.09);
    return roundMoney(1893 + (excess - 23665) * 0.12);
  }
  // Grupa III
  if (excess <= 11833) return roundMoney(excess * 0.12);
  if (excess <= 23665) return roundMoney(1420 + (excess - 11833) * 0.16);
  return roundMoney(2877 + (excess - 23665) * 0.20);
}

export function calculateNotarialBaseFee(value: number): number {
  if (value <= 3000) return 100;
  if (value <= 10000) return 100 + (value - 3000) * 0.03;
  if (value <= 30000) return 310 + (value - 10000) * 0.02;
  if (value <= 60000) return 710 + (value - 30000) * 0.01;
  if (value <= 1000000) return 1010 + (value - 60000) * 0.004;
  if (value <= 2000000) return 4770 + (value - 1000000) * 0.002;
  return Math.min(10000, 6770 + (value - 2000000) * 0.0025);
}

export function calculateNotarialFeeBreakdown(input: NotarialFeeInput): NotarialFeeBreakdown {
  const deedConfig = DEED_TYPES[input.deedType];

  const baseNet = roundMoney(calculateNotarialBaseFee(input.value) * deedConfig.feeMultiplier);
  const baseVat = roundMoney(input.includeVat ? baseNet * 0.23 : 0);
  const copiesNet = roundMoney(input.copyCount * input.copyPages * 6);
  const copiesVat = roundMoney(input.includeVat ? copiesNet * 0.23 : 0);
  const landRegisterFee = input.includeLandRegister ? roundMoney(200 * (input.includeVat ? 1.23 : 1)) : 0;
  const courtFee = input.includeLandRegister ? (input.deedType === "ownership" ? 260 : 200) : 0;
  const mortgageEntryFee = deedConfig.addsMortgageEntry ? 200 : 0;
  const pccTax = roundMoney(input.includePcc && deedConfig.allowsPcc ? input.value * 0.02 : 0);
  const donationTax =
    input.deedType === "donation" && input.donationTaxGroup
      ? calculateDonationTax(input.value, input.donationTaxGroup)
      : 0;

  return {
    baseNet,
    baseVat,
    copiesNet,
    copiesVat,
    landRegisterFee,
    courtFee,
    mortgageEntryFee,
    pccTax,
    donationTax,
    total: roundMoney(
      baseNet +
        baseVat +
        copiesNet +
        copiesVat +
        landRegisterFee +
        courtFee +
        mortgageEntryFee +
        pccTax +
        donationTax
    )
  };
}