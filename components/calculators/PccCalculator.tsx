"use client";

import { useMemo, useState } from "react";

export default function PccCalculator() {
  const [transactionType, setTransactionType] = useState("nieruchomość");
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const numericValue = Number(value);
  const isValid = value !== "" && Number.isFinite(numericValue) && numericValue > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    const tax = numericValue * 0.02;
    return tax;
  }, [isValid, numericValue]);

  return (
    <div className="form-grid">
      <label>
        Typ transakcji
        <select
          className="input-control"
          value={transactionType}
          onChange={(event) => setTransactionType(event.target.value)}
        >
          <option value="nieruchomość">Nieruchomość</option>
          <option value="samochód">Samochód</option>
        </select>
      </label>

      <label>
        Wartość transakcji (PLN)
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 450000"
        />
      </label>

      {touched && !isValid && (
        <p className="error">Podaj dodatnią wartość transakcji większą od zera.</p>
      )}

      {result !== null && (
        <div className="result">
          <p>
            Rodzaj: <strong>{transactionType}</strong>
          </p>
          <p>
            Podatek PCC 2%: <strong>{result.toFixed(2)} PLN</strong>
          </p>
        </div>
      )}
    </div>
  );
}
