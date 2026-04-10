/**
 * Dekodowanie kodów pojemności kondensatorów ceramicznych
 * 
 * System kodowania 3-cyfrowego:
 * - Pierwsze dwie cyfry: wartość bazowa
 * - Trzecia cyfra: mnożnik (liczba zer do dodania)
 * - Wynik w pikofaradach (pF)
 * 
 * Przykłady:
 * - 104 = 10 × 10^4 = 100000 pF = 100 nF = 0.1 µF
 * - 223 = 22 × 10^3 = 22000 pF = 22 nF = 0.022 µF
 * - 101 = 10 × 10^1 = 100 pF
 */

export type CapacitorCodeResult = {
  code: string;
  picofarads: number;
  nanofarads: number;
  microfarads: number;
  displayValue: string;
  displayUnit: string;
};

/**
 * Dekoduje 3-cyfrowy kod kondensatora
 */
export function decodeCapacitorCode(code: string): CapacitorCodeResult | null {
  // Usuń białe znaki i zamień na wielkie litery
  const cleaned = code.trim().toUpperCase();

  // Obsługa kodów literowych (np. 0R5 = 0.5 pF)
  if (cleaned.includes("R") || cleaned.includes("P")) {
    return decodeLetterCode(cleaned);
  }

  // Standardowy kod 3-cyfrowy
  if (!/^\d{3}$/.test(cleaned)) {
    return null;
  }

  const digit1 = parseInt(cleaned[0], 10);
  const digit2 = parseInt(cleaned[1], 10);
  const multiplier = parseInt(cleaned[2], 10);

  if (isNaN(digit1) || isNaN(digit2) || isNaN(multiplier)) {
    return null;
  }

  const baseValue = digit1 * 10 + digit2;
  const picofarads = baseValue * Math.pow(10, multiplier);

  return formatCapacitance(cleaned, picofarads);
}

/**
 * Dekoduje kody z literami (R = przecinek dziesiętny)
 * Przykłady: 0R5 = 0.5 pF, 1R0 = 1.0 pF, R47 = 0.47 pF
 */
function decodeLetterCode(code: string): CapacitorCodeResult | null {
  let picofarads: number;

  if (code.includes("R")) {
    // R zastępuje przecinek dziesiętny
    const parts = code.split("R");
    if (parts.length !== 2) return null;

    const whole = parts[0] === "" ? "0" : parts[0];
    const fraction = parts[1];

    const value = parseFloat(`${whole}.${fraction}`);
    if (isNaN(value)) return null;

    picofarads = value;
  } else if (code.includes("P")) {
    // P zastępuje przecinek dziesiętny dla pF
    const parts = code.split("P");
    if (parts.length !== 2) return null;

    const whole = parts[0] === "" ? "0" : parts[0];
    const fraction = parts[1];

    const value = parseFloat(`${whole}.${fraction}`);
    if (isNaN(value)) return null;

    picofarads = value;
  } else {
    return null;
  }

  return formatCapacitance(code, picofarads);
}

/**
 * Formatuje pojemność do najbardziej czytelnej jednostki
 */
function formatCapacitance(code: string, picofarads: number): CapacitorCodeResult {
  const nanofarads = picofarads / 1000;
  const microfarads = picofarads / 1000000;

  let displayValue: string;
  let displayUnit: string;

  if (picofarads >= 1000000) {
    // >= 1 µF
    displayValue = microfarads.toFixed(microfarads >= 10 ? 1 : 2);
    displayUnit = "µF";
  } else if (picofarads >= 1000) {
    // >= 1 nF
    displayValue = nanofarads.toFixed(nanofarads >= 10 ? 1 : 2);
    displayUnit = "nF";
  } else {
    // < 1 nF
    displayValue = picofarads.toFixed(picofarads >= 10 ? 1 : 2);
    displayUnit = "pF";
  }

  return {
    code,
    picofarads,
    nanofarads,
    microfarads,
    displayValue,
    displayUnit,
  };
}

/**
 * Oblicza kod dla podanej pojemności w pF
 */
export function encodeCapacitorValue(picofarads: number): string | null {
  if (picofarads < 0 || !isFinite(picofarads)) {
    return null;
  }

  // Dla bardzo małych wartości użyj notacji R
  if (picofarads < 10) {
    return `${picofarads.toFixed(1).replace(".", "R")}`;
  }

  // Znajdź najlepszy mnożnik
  let multiplier = 0;
  let baseValue = picofarads;

  while (baseValue >= 100 && multiplier < 9) {
    baseValue /= 10;
    multiplier++;
  }

  // Zaokrąglij do 2 cyfr
  const rounded = Math.round(baseValue);
  if (rounded >= 100) {
    return null;
  }

  const digit1 = Math.floor(rounded / 10);
  const digit2 = rounded % 10;

  return `${digit1}${digit2}${multiplier}`;
}

/**
 * Popularne wartości kondensatorów
 */
export const COMMON_CAPACITOR_VALUES = [
  { code: "100", description: "10 pF" },
  { code: "101", description: "100 pF" },
  { code: "102", description: "1 nF" },
  { code: "103", description: "10 nF" },
  { code: "104", description: "100 nF (0.1 µF)" },
  { code: "105", description: "1 µF" },
  { code: "106", description: "10 µF" },
  { code: "220", description: "22 pF" },
  { code: "221", description: "220 pF" },
  { code: "222", description: "2.2 nF" },
  { code: "223", description: "22 nF" },
  { code: "224", description: "220 nF (0.22 µF)" },
  { code: "470", description: "47 pF" },
  { code: "471", description: "470 pF" },
  { code: "472", description: "4.7 nF" },
  { code: "473", description: "47 nF" },
  { code: "474", description: "470 nF (0.47 µF)" },
];
