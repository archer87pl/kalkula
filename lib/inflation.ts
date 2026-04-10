/**
 * Dane historyczne inflacji w Polsce (1990-2026)
 * Źródło: GUS (Główny Urząd Statystyczny)
 */

export type InflationDataPoint = {
  year: number;
  rate: number; // Stopa inflacji w procentach
  isProjection?: boolean; // Czy to prognoza
};

export const INFLATION_DATA: InflationDataPoint[] = [
  { year: 1990, rate: 585.8 },
  { year: 1991, rate: 70.3 },
  { year: 1992, rate: 43.0 },
  { year: 1993, rate: 35.3 },
  { year: 1994, rate: 32.2 },
  { year: 1995, rate: 27.8 },
  { year: 1996, rate: 19.9 },
  { year: 1997, rate: 14.9 },
  { year: 1998, rate: 11.8 },
  { year: 1999, rate: 7.3 },
  { year: 2000, rate: 10.1 },
  { year: 2001, rate: 5.5 },
  { year: 2002, rate: 1.9 },
  { year: 2003, rate: 0.8 },
  { year: 2004, rate: 3.5 },
  { year: 2005, rate: 2.1 },
  { year: 2006, rate: 1.0 },
  { year: 2007, rate: 2.5 },
  { year: 2008, rate: 4.2 },
  { year: 2009, rate: 3.5 },
  { year: 2010, rate: 2.6 },
  { year: 2011, rate: 4.3 },
  { year: 2012, rate: 3.7 },
  { year: 2013, rate: 0.9 },
  { year: 2014, rate: 0.0 },
  { year: 2015, rate: -0.9 },
  { year: 2016, rate: -0.6 },
  { year: 2017, rate: 2.0 },
  { year: 2018, rate: 1.6 },
  { year: 2019, rate: 2.3 },
  { year: 2020, rate: 3.4 },
  { year: 2021, rate: 5.1 },
  { year: 2022, rate: 14.4 },
  { year: 2023, rate: 11.4 },
  { year: 2024, rate: 3.6 },
  { year: 2025, rate: 3.6, isProjection: true },
  { year: 2026, rate: 2.75, isProjection: true },
];

export type InflationCalculationResult = {
  initialAmount: number;
  initialYear: number;
  targetYear: number;
  finalAmount: number;
  totalInflation: number;
  averageInflation: number;
  purchasing_power: number;
  yearsData: Array<{
    year: number;
    rate: number;
    multiplier: number;
    value: number;
    isProjection: boolean;
  }>;
};

/**
 * Oblicza wartość pieniądza z uwzględnieniem inflacji
 */
export function calculateInflation(
  amount: number,
  fromYear: number,
  toYear: number
): InflationCalculationResult | null {
  // Walidacja
  if (amount <= 0 || !isFinite(amount)) {
    return null;
  }

  const minYear = INFLATION_DATA[0].year;
  const maxYear = INFLATION_DATA[INFLATION_DATA.length - 1].year;

  if (fromYear < minYear || fromYear > maxYear) {
    return null;
  }

  if (toYear < minYear || toYear > maxYear) {
    return null;
  }

  if (fromYear > toYear) {
    return null;
  }

  // Oblicz wartość przez każdy rok
  let currentValue = amount;
  const yearsData: InflationCalculationResult["yearsData"] = [];
  let cumulativeMultiplier = 1;

  for (let year = fromYear; year <= toYear; year++) {
    const dataPoint = INFLATION_DATA.find((d) => d.year === year);
    if (!dataPoint) {
      return null;
    }

    const multiplier = 1 + dataPoint.rate / 100;
    cumulativeMultiplier *= multiplier;
    
    if (year > fromYear) {
      currentValue *= multiplier;
    }

    yearsData.push({
      year,
      rate: dataPoint.rate,
      multiplier,
      value: year === fromYear ? amount : currentValue,
      isProjection: dataPoint.isProjection || false,
    });
  }

  const finalAmount = amount * cumulativeMultiplier;
  const totalInflation = ((cumulativeMultiplier - 1) * 100);
  const yearsCount = toYear - fromYear;
  const averageInflation = yearsCount > 0 
    ? (Math.pow(cumulativeMultiplier, 1 / yearsCount) - 1) * 100
    : 0;

  // Siła nabywcza: ile potrzebujesz w roku docelowym, żeby mieć tę samą wartość
  const purchasing_power = (amount / cumulativeMultiplier);

  return {
    initialAmount: amount,
    initialYear: fromYear,
    targetYear: toYear,
    finalAmount,
    totalInflation,
    averageInflation,
    purchasing_power,
    yearsData,
  };
}

/**
 * Pobiera dostępny zakres lat
 */
export function getAvailableYears(): { min: number; max: number } {
  return {
    min: INFLATION_DATA[0].year,
    max: INFLATION_DATA[INFLATION_DATA.length - 1].year,
  };
}
