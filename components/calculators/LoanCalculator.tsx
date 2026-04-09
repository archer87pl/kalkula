"use client";

import { useMemo, useState } from "react";

type LoanCalculatorProps = {
  label?: string;
};

export default function LoanCalculator({ label = "kredytu" }: LoanCalculatorProps) {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [months, setMonths] = useState("");
  const [touched, setTouched] = useState(false);

  const principalNum = Number(principal);
  const rateNum = Number(annualRate);
  const monthsNum = Number(months);

  const isValid =
    principal !== "" &&
    annualRate !== "" &&
    months !== "" &&
    Number.isFinite(principalNum) &&
    Number.isFinite(rateNum) &&
    Number.isFinite(monthsNum) &&
    principalNum > 0 &&
    rateNum >= 0 &&
    monthsNum > 0;

  const payment = useMemo(() => {
    if (!isValid) return null;
    const r = rateNum / 100 / 12;
    if (r === 0) {
      return principalNum / monthsNum;
    }
    const factor = Math.pow(1 + r, monthsNum);
    return (principalNum * r * factor) / (factor - 1);
  }, [isValid, monthsNum, principalNum, rateNum]);

  const totalCost = useMemo(() => {
    if (payment === null) return null;
    return payment * monthsNum;
  }, [monthsNum, payment]);

  return (
    <div className="form-grid">
      <label>
        Kwota {label} (PLN)
        <input
          type="number"
          min="0"
          step="0.01"
          value={principal}
          onChange={(event) => setPrincipal(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 250000"
        />
      </label>

      <label>
        Oprocentowanie roczne (%)
        <input
          type="number"
          min="0"
          step="0.01"
          value={annualRate}
          onChange={(event) => setAnnualRate(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 8.5"
        />
      </label>

      <label>
        Okres (miesiące)
        <input
          type="number"
          min="1"
          step="1"
          value={months}
          onChange={(event) => setMonths(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 120"
        />
      </label>

      {touched && !isValid && (
        <p className="error">
          Upewnij się, że kwota i okres są dodatnie, a oprocentowanie nie jest ujemne.
        </p>
      )}

      {payment !== null && (
        <div className="result">
          <p>
            Miesięczna rata: <strong>{payment.toFixed(2)} PLN</strong>
          </p>
          {totalCost !== null && (
            <p>
              Całkowity koszt {label}: <strong>{totalCost.toFixed(2)} PLN</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
