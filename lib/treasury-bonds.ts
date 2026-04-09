export type BondType = "ots" | "ror" | "dor" | "tos" | "coi" | "edo" | "ros" | "rod";

export type InterestStructure = 
  | { type: "fixed"; rate: number }
  | { type: "nbpRate"; firstPeriodRate: number; margin: number }
  | { type: "inflationLinked"; firstPeriodRate: number; margin: number };

export type BondConfig = {
  label: string;
  description: string;
  periodMonths: number;
  interestStructure: InterestStructure;
  /** Czy odsetki kapitalizują się */
  compound: boolean;
  /** Częstotliwość wypłaty/kapitalizacji odsetek w miesiącach */
  interestFrequencyMonths: number;
  /** Maksymalna kwota zakupu przez jedną osobę (w PLN) */
  maxAmount: number;
};

export const BOND_TYPES: Record<BondType, BondConfig> = {
  ots: {
    label: "OTS (3-miesięczne)",
    description: "Obligacje 3-miesięczne ze stałym oprocentowaniem 2,00%",
    periodMonths: 3,
    interestStructure: { type: "fixed", rate: 2.0 },
    compound: false,
    interestFrequencyMonths: 3,
    maxAmount: 1000000
  },
  ror: {
    label: "ROR (roczne)",
    description: "Obligacje roczne: 4,00% w pierwszym miesiącu, potem stopa referencyjna NBP + 0,00%",
    periodMonths: 12,
    interestStructure: { type: "nbpRate", firstPeriodRate: 4.0, margin: 0.0 },
    compound: false,
    interestFrequencyMonths: 1,
    maxAmount: 1000000
  },
  dor: {
    label: "DOR (2-letnie)",
    description: "Obligacje 2-letnie: 4,15% w pierwszym miesiącu, potem stopa NBP + 0,15%",
    periodMonths: 24,
    interestStructure: { type: "nbpRate", firstPeriodRate: 4.15, margin: 0.15 },
    compound: false,
    interestFrequencyMonths: 1,
    maxAmount: 1000000
  },
  tos: {
    label: "TOS (3-letnie)",
    description: "Obligacje 3-letnie ze stałym oprocentowaniem 4,40%",
    periodMonths: 36,
    interestStructure: { type: "fixed", rate: 4.4 },
    compound: false,
    interestFrequencyMonths: 36,
    maxAmount: 1000000
  },
  coi: {
    label: "COI (4-letnie)",
    description: "Obligacje 4-letnie: 4,75% pierwszy rok, potem marża 1,50% + inflacja, wypłata co rok",
    periodMonths: 48,
    interestStructure: { type: "inflationLinked", firstPeriodRate: 4.75, margin: 1.5 },
    compound: false,
    interestFrequencyMonths: 12,
    maxAmount: 1000000
  },
  edo: {
    label: "EDO (10-letnie)",
    description: "Obligacje 10-letnie: 5,35% pierwszy rok, potem marża 2,00% + inflacja",
    periodMonths: 120,
    interestStructure: { type: "inflationLinked", firstPeriodRate: 5.35, margin: 2.0 },
    compound: false,
    interestFrequencyMonths: 12,
    maxAmount: 1000000
  },
  ros: {
    label: "ROS (6-letnie)",
    description: "Obligacje 6-letnie: 5,00% pierwszy rok, potem marża 2,00% + inflacja",
    periodMonths: 72,
    interestStructure: { type: "inflationLinked", firstPeriodRate: 5.0, margin: 2.0 },
    compound: false,
    interestFrequencyMonths: 12,
    maxAmount: 1000000
  },
  rod: {
    label: "ROD (12-letnie)",
    description: "Obligacje 12-letnie: 5,60% pierwszy rok, potem marża 2,50% + inflacja, kapitalizacja roczna",
    periodMonths: 144,
    interestStructure: { type: "inflationLinked", firstPeriodRate: 5.6, margin: 2.5 },
    compound: true,
    interestFrequencyMonths: 12,
    maxAmount: 1000000
  }
};

export type BondCalculationInput = {
  bondType: BondType;
  initialAmount: number;
  /**Customowe pierwsze oprocentowanie (opcjonalne, domyślnie z config) */
  firstPeriodRate?: number;
  /** Dla obligacji ze stopą NBP */
  nbpRate?: number;
  /** Dla obligacji indeksowanych inflacją - szacowana roczna inflacja */
  estimatedInflation?: number;
};

export type BondGrowthPoint = {
  month: number;
  capitalWithInterest: number;
  accumulatedInterest: number;
};

export type BondCalculationResult = {
  finalCapital: number;
  totalInterest: number;
  effectiveAnnualRate: number;
  growthData: BondGrowthPoint[];
};

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Oblicza wzrost kapitału dla obligacji skarbowych
 */
export function calculateBondGrowth(input: BondCalculationInput): BondCalculationResult {
  const config = BOND_TYPES[input.bondType];
  const months = config.periodMonths;
  const structure = config.interestStructure;

  const growthData: BondGrowthPoint[] = [];
  let currentCapital = input.initialAmount;
  let totalInterestPaid = 0;

  // Punkt startowy
  growthData.push({
    month: 0,
    capitalWithInterest: roundMoney(currentCapital),
    accumulatedInterest: 0
  });

  // Oblicz oprocentowanie dla każdego miesiąca
  for (let month = 1; month <= months; month++) {
    let monthlyRate: number;

    if (structure.type === "fixed") {
      // Stała stopa przez cały okres - użyj custom lub default
      const rate = input.firstPeriodRate ?? structure.rate;
      monthlyRate = rate / 100 / 12;
    } else if (structure.type === "nbpRate") {
      // Pierwszy okres: firstPeriodRate, potem stopa NBP + marża
      const isFirstPeriod = month <= config.interestFrequencyMonths;
      const annualRate = isFirstPeriod 
        ? (input.firstPeriodRate ?? structure.firstPeriodRate)
        : (input.nbpRate ?? 4.0) + structure.margin;
      monthlyRate = annualRate / 100 / 12;
    } else {
      // inflationLinked: pierwszy rok firstPeriodRate, potem marża + inflacja
      const isFirstYear = month <= 12;
      const annualRate = isFirstYear
        ? (input.firstPeriodRate ?? structure.firstPeriodRate)
        : structure.margin + (input.estimatedInflation ?? 3.0);
      monthlyRate = annualRate / 100 / 12;
    }

    // Nalicz odsetki
    const interest = currentCapital * monthlyRate;

    // Sprawdź, czy to moment kapitalizacji/wypłaty
    const isInterestPoint = month % config.interestFrequencyMonths === 0;

    if (config.compound) {
      // Kapitalizacja - odsetki dodawane do kapitału
      if (isInterestPoint) {
        currentCapital += interest;
        totalInterestPaid += interest;
      } else {
        // Odsetki akumulują się ale nie są jeszcze kapitalizowane
        totalInterestPaid += interest;
      }
    } else {
      // Wypłata odsetek - nie zwiększają kapitału
      if (isInterestPoint) {
        totalInterestPaid += interest;
      } else {
        totalInterestPaid += interest;
      }
    }

    growthData.push({
      month,
      capitalWithInterest: roundMoney(currentCapital + (config.compound ? 0 : totalInterestPaid)),
      accumulatedInterest: roundMoney(totalInterestPaid)
    });
  }

  const finalCapital = roundMoney(currentCapital + (config.compound ? 0 : totalInterestPaid));
  const totalInterest = roundMoney(totalInterestPaid);

  // Oblicz efektywną roczną stopę zwrotu
  const years = months / 12;
  const effectiveAnnualRate = years > 0
    ? roundMoney(((finalCapital / input.initialAmount) ** (1 / years) - 1) * 100)
    : 0;

  return {
    finalCapital,
    totalInterest,
    effectiveAnnualRate,
    growthData
  };
}
