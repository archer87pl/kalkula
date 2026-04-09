export type ColorCode =
  | "black"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet"
  | "gray"
  | "white"
  | "gold"
  | "silver"
  | "none";

export type BandCount = 4 | 5 | 6;

export type ColorBand = {
  color: ColorCode;
  label: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
  tempCoeff?: number;
};

export const COLOR_CODES: Record<ColorCode, ColorBand> = {
  black: { color: "black", label: "Czarny", digit: 0, multiplier: 1 },
  brown: { color: "brown", label: "Brązowy", digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100 },
  red: { color: "red", label: "Czerwony", digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50 },
  orange: { color: "orange", label: "Pomarańczowy", digit: 3, multiplier: 1000, tempCoeff: 15 },
  yellow: { color: "yellow", label: "Żółty", digit: 4, multiplier: 10000, tempCoeff: 25 },
  green: { color: "green", label: "Zielony", digit: 5, multiplier: 100000, tolerance: 0.5 },
  blue: { color: "blue", label: "Niebieski", digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10 },
  violet: { color: "violet", label: "Fioletowy", digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5 },
  gray: { color: "gray", label: "Szary", digit: 8, multiplier: 100000000, tolerance: 0.05, tempCoeff: 1 },
  white: { color: "white", label: "Biały", digit: 9, multiplier: 1000000000 },
  gold: { color: "gold", label: "Złoty", multiplier: 0.1, tolerance: 5 },
  silver: { color: "silver", label: "Srebrny", multiplier: 0.01, tolerance: 10 },
  none: { color: "none", label: "Brak", tolerance: 20 }
};

export type ResistorInput = {
  bandCount: BandCount;
  band1: ColorCode;
  band2: ColorCode;
  band3: ColorCode;
  band4: ColorCode;
  band5?: ColorCode;
  band6?: ColorCode;
};

export type ResistorResult = {
  resistance: number;
  resistanceFormatted: string;
  unit: string;
  tolerance: number;
  toleranceFormatted: string;
  tempCoeff?: number;
  tempCoeffFormatted?: string;
};

function formatResistance(ohms: number): { value: number; unit: string; formatted: string } {
  if (ohms >= 1_000_000) {
    return {
      value: ohms / 1_000_000,
      unit: "MΩ",
      formatted: `${(ohms / 1_000_000).toFixed(2)} MΩ`
    };
  } else if (ohms >= 1000) {
    return {
      value: ohms / 1000,
      unit: "kΩ",
      formatted: `${(ohms / 1000).toFixed(2)} kΩ`
    };
  } else {
    return {
      value: ohms,
      unit: "Ω",
      formatted: `${ohms.toFixed(2)} Ω`
    };
  }
}

export function calculateResistance(input: ResistorInput): ResistorResult {
  const { bandCount, band1, band2, band3, band4, band5, band6 } = input;

  let baseValue: number;
  let multiplier: number;
  let tolerance: number;
  let tempCoeff: number | undefined;

  if (bandCount === 4) {
    // 4-pasmowy: cyfra1, cyfra2, mnożnik, tolerancja
    const digit1 = COLOR_CODES[band1].digit ?? 0;
    const digit2 = COLOR_CODES[band2].digit ?? 0;
    multiplier = COLOR_CODES[band3].multiplier ?? 1;
    tolerance = COLOR_CODES[band4].tolerance ?? 20;

    baseValue = (digit1 * 10 + digit2) * multiplier;
  } else if (bandCount === 5) {
    // 5-pasmowy: cyfra1, cyfra2, cyfra3, mnożnik, tolerancja
    const digit1 = COLOR_CODES[band1].digit ?? 0;
    const digit2 = COLOR_CODES[band2].digit ?? 0;
    const digit3 = COLOR_CODES[band3].digit ?? 0;
    multiplier = COLOR_CODES[band4].multiplier ?? 1;
    tolerance = COLOR_CODES[band5 ?? "none"].tolerance ?? 20;

    baseValue = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
  } else {
    // 6-pasmowy: cyfra1, cyfra2, cyfra3, mnożnik, tolerancja, współczynnik temp.
    const digit1 = COLOR_CODES[band1].digit ?? 0;
    const digit2 = COLOR_CODES[band2].digit ?? 0;
    const digit3 = COLOR_CODES[band3].digit ?? 0;
    multiplier = COLOR_CODES[band4].multiplier ?? 1;
    tolerance = COLOR_CODES[band5 ?? "none"].tolerance ?? 20;
    tempCoeff = COLOR_CODES[band6 ?? "brown"].tempCoeff;

    baseValue = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
  }

  const formatted = formatResistance(baseValue);

  return {
    resistance: baseValue,
    resistanceFormatted: formatted.formatted,
    unit: formatted.unit,
    tolerance,
    toleranceFormatted: `±${tolerance}%`,
    tempCoeff,
    tempCoeffFormatted: tempCoeff ? `${tempCoeff} ppm/°C` : undefined
  };
}

export function getAvailableColors(position: number, bandCount: BandCount): ColorCode[] {
  if (position <= 3 && bandCount >= 4) {
    // Pierwsze 3 paski (cyfry) - wszystkie kolory z cyframi
    return Object.entries(COLOR_CODES)
      .filter(([_, value]) => value.digit !== undefined)
      .map(([key]) => key as ColorCode);
  } else if ((position === 3 && bandCount === 4) || (position === 4 && bandCount >= 5)) {
    // Mnożnik - wszystkie kolory z multiplier
    return Object.entries(COLOR_CODES)
      .filter(([_, value]) => value.multiplier !== undefined)
      .map(([key]) => key as ColorCode);
  } else if ((position === 4 && bandCount === 4) || (position === 5 && bandCount >= 5)) {
    // Tolerancja
    return Object.entries(COLOR_CODES)
      .filter(([_, value]) => value.tolerance !== undefined)
      .map(([key]) => key as ColorCode);
  } else if (position === 6 && bandCount === 6) {
    // Współczynnik temperaturowy
    return Object.entries(COLOR_CODES)
      .filter(([_, value]) => value.tempCoeff !== undefined)
      .map(([key]) => key as ColorCode);
  }
  return [];
}
