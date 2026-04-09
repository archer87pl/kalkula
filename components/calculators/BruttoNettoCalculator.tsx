"use client";

import { useMemo, useState } from "react";

const VAT_RATE = 0.23;

export default function BruttoNettoCalculator() {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"netto" | "brutto">("netto");
  const [touched, setTouched] = useState(false);

  const amountNum = Number(amount);
  const isValid =
    amount !== "" &&
    Number.isFinite(amountNum) &&
    amountNum > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    if (direction === "netto") {
      const netto = amountNum;
      const vat = netto * VAT_RATE;
      const brutto = netto + vat;
      return { netto, vat, brutto };
    } else {
      const brutto = amountNum;
      const netto = brutto / (1 + VAT_RATE);
      const vat = brutto - netto;
      return { netto, vat, brutto };
    }
  }, [amountNum, direction, isValid]);

  const fmt = (n: number) =>
    n.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="form-grid">
      <label>
        Kierunek przeliczenia
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as "netto" | "brutto")}
        >
          <option value="netto">Netto → Brutto</option>
          <option value="brutto">Brutto → Netto</option>
        </select>
      </label>

      <label>
        Kwota {direction === "netto" ? "netto" : "brutto"} (PLN)
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 1000"
        />
      </label>

      {touched && !isValid && <p className="error">Podaj kwotę większą od zera.</p>}

      {result !== null && (
        <div className="result">
          <p className="result-title">Wynik (VAT 23%)</p>
          <div className="cost-grid">
            <span>Netto:</span>
            <strong>{fmt(result.netto)} PLN</strong>
            <span>VAT (23%):</span>
            <strong>{fmt(result.vat)} PLN</strong>
          </div>
          <p className="cost-total">
            Brutto: <strong>{fmt(result.brutto)} PLN</strong>
          </p>
        </div>
      )}
    </div>
  );
}
