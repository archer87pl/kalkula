"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BOND_TYPES, calculateBondGrowth, type BondType } from "@/lib/treasury-bonds";

const PLN_FORMATTER = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatPln(value: number): string {
  return PLN_FORMATTER.format(value);
}

export default function TreasuryBondsCalculator() {
  const [bondType, setBondType] = useState<BondType>("ots");
  const [initialAmount, setInitialAmount] = useState("10000");
  const [firstPeriodRate, setFirstPeriodRate] = useState("2.00");
  const [nbpRate, setNbpRate] = useState("5.75");
  const [estimatedInflation, setEstimatedInflation] = useState("3.5");
  const [touched, setTouched] = useState(false);

  const bondConfig = BOND_TYPES[bondType];
  const structure = bondConfig.interestStructure;

  // Auto-populate values when bond type changes
  useEffect(() => {
    // Reset to default values based on bond type
    const defaultFirstRate = structure.type === "fixed" 
      ? structure.rate 
      : structure.firstPeriodRate;
    setFirstPeriodRate(defaultFirstRate.toFixed(2));
    setNbpRate("5.75");
    setEstimatedInflation("3.5");
  }, [bondType, structure]);

  const numericAmount = Number(initialAmount);
  const numericFirstPeriodRate = Number(firstPeriodRate);
  const numericNbpRate = Number(nbpRate);
  const numericInflation = Number(estimatedInflation);

  const isValid =
    initialAmount !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount > 0 &&
    numericAmount <= bondConfig.maxAmount &&
    firstPeriodRate !== "" &&
    Number.isFinite(numericFirstPeriodRate) &&
    numericFirstPeriodRate >= 0 &&
    (structure.type !== "nbpRate" ||
      (nbpRate !== "" && Number.isFinite(numericNbpRate) && numericNbpRate >= 0)) &&
    (structure.type !== "inflationLinked" ||
      (estimatedInflation !== "" && Number.isFinite(numericInflation) && numericInflation >= 0));

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateBondGrowth({
      bondType,
      initialAmount: numericAmount,
      firstPeriodRate: numericFirstPeriodRate,
      nbpRate: structure.type === "nbpRate" ? numericNbpRate : undefined,
      estimatedInflation: structure.type === "inflationLinked" ? numericInflation : undefined
    });
  }, [bondType, numericAmount, numericFirstPeriodRate, numericNbpRate, numericInflation, structure, isValid]);

  // Przygotuj dane do wykresu - co 3 miesiące dla czytelności
  const chartData = useMemo(() => {
    if (!result) return [];
    const step = bondConfig.periodMonths <= 12 ? 1 : 3;
    return result.growthData
      .filter((_, index) => index % step === 0)
      .map((point) => ({
        miesiac: point.month,
        kapitał: point.capitalWithInterest,
        odsetki: point.accumulatedInterest
      }));
  }, [result, bondConfig.periodMonths]);

  const isFixed = structure.type === "fixed";
  const isNbpRate = structure.type === "nbpRate";
  const isInflationLinked = structure.type === "inflationLinked";

  return (
    <div className="form-grid">
      <label>
        Rodzaj obligacji
        <select
          className="input-control"
          value={bondType}
          onChange={(event) => setBondType(event.target.value as BondType)}
        >
          {Object.entries(BOND_TYPES).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
      </label>

      <p className="helper-note" style={{ marginTop: "-0.5rem", fontSize: "0.9rem", color: "#666" }}>
        {bondConfig.description}
      </p>

      <label>
        Kwota inwestycji (PLN)
        <input
          type="number"
          min="100"
          max={bondConfig.maxAmount}
          step="100"
          value={initialAmount}
          onChange={(event) => setInitialAmount(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={`Maks. ${formatPln(bondConfig.maxAmount)}`}
        />
      </label>

      <div className="split-fields">
        <label>
          Pierwsze oprocentowanie (%)
          <input
            type="number"
            min="0"
            max="20"
            step="0.01"
            value={firstPeriodRate}
            onChange={(event) => setFirstPeriodRate(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Np. 4.00"
          />
          <span style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem", display: "block" }}>
            {isFixed ? "Stałe przez cały okres" : "W pierwszym okresie"}
          </span>
        </label>

        {!isFixed && (
          <label>
            Marża (%)
            <input
              type="number"
              value={structure.margin.toFixed(2)}
              disabled
              readOnly
              style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
            />
            <span style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem", display: "block" }}>
              {isNbpRate ? "+ stopa NBP" : "+ inflacja"}
            </span>
          </label>
        )}
      </div>

      {isNbpRate && (
        <label>
          Stopa referencyjna NBP (%)
          <input
            type="number"
            min="0"
            max="20"
            step="0.01"
            value={nbpRate}
            onChange={(event) => setNbpRate(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Np. 5.75"
          />
          <span style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem", display: "block" }}>
            Aktualna stopa NBP — zmień jeśli chcesz zasymulować inny scenariusz
          </span>
        </label>
      )}

      {isInflationLinked && (
        <label>
          Szacowana inflacja roczna (%)
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            value={estimatedInflation}
            onChange={(event) => setEstimatedInflation(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Np. 3.5"
          />
          <span style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem", display: "block" }}>
            Obligacje indeksowane inflacją — wartość zależy od faktycznej inflacji
          </span>
        </label>
      )}

      {touched && !isValid && (
        <p className="error">
          {numericAmount > bondConfig.maxAmount
            ? `Maksymalna kwota dla ${bondConfig.label} to ${formatPln(bondConfig.maxAmount)}`
            : "Wprowadź poprawną kwotę większą od zera"}
        </p>
      )}

      {result !== null && (
        <>
          <div className="result">
            <p className="result-title">
              Wynik inwestycji po {bondConfig.periodMonths} miesiącach ({(bondConfig.periodMonths / 12).toFixed(bondConfig.periodMonths < 12 ? 1 : 0)} {bondConfig.periodMonths < 12 ? "miesiąca" : bondConfig.periodMonths === 12 ? "roku" : "lat"})
            </p>
            <div className="cost-grid" role="table" aria-label="Wyniki obligacji">
              <p role="row">
                <span role="cell">Kwota początkowa</span>
                <strong role="cell">{formatPln(numericAmount)}</strong>
              </p>
              <p role="row">
                <span role="cell">Łączne odsetki</span>
                <strong role="cell">{formatPln(result.totalInterest)}</strong>
              </p>
              <p role="row" className="cost-total">
                <span role="cell">Kapitał końcowy</span>
                <strong role="cell">{formatPln(result.finalCapital)}</strong>
              </p>
              <p role="row">
                <span role="cell">Efektywna stopa roczna</span>
                <strong role="cell">{result.effectiveAnnualRate}%</strong>
              </p>
            </div>
            <p style={{ fontSize: "0.9rem", marginTop: "1rem", color: "#666" }}>
              To orientacyjna kalkulacja. Rzeczywiste oprocentowanie obligacji {isInflationLinked ? "indeksowanych inflacją " : isNbpRate ? "ze stopą NBP " : ""}
              zależy od faktycz{isInflationLinked ? "nej inflacji publikowanej przez GUS" : isNbpRate ? "nej stopy referencyjnej NBP" : "nych warunków rynkowych"} w okresie trwania obligacji.
            </p>
          </div>

          <div className="result" style={{ marginTop: "1.5rem" }}>
            <p className="result-title">Wykres wzrostu kapitału</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="miesiac"
                  label={{ value: "Miesiąc", position: "insideBottom", offset: -5 }}
                  stroke="#666"
                />
                <YAxis
                  label={{ value: "Wartość (PLN)", angle: -90, position: "insideLeft" }}
                  stroke="#666"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => (typeof value === "number" ? formatPln(value) : String(value))}
                  labelFormatter={(label) => `Miesiąc ${label}`}
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="kapitał"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="Kapitał z odsetkami"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="odsetki"
                  stroke="#16a34a"
                  strokeWidth={2}
                  name="Skumulowane odsetki"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
