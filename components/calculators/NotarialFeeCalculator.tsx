"use client";

import { useEffect, useMemo, useState } from "react";

function calculateFee(value: number): number {
  if (value <= 3000) return 100;
  if (value <= 10000) return 100 + (value - 3000) * 0.03;
  if (value <= 30000) return 310 + (value - 10000) * 0.02;
  if (value <= 60000) return 710 + (value - 30000) * 0.01;
  if (value <= 1000000) return 1010 + (value - 60000) * 0.004;
  if (value <= 2000000) return 4770 + (value - 1000000) * 0.002;
  return Math.min(10000, 6770 + (value - 2000000) * 0.0025);
}

type DeedConfig = {
  label: string;
  feeMultiplier: number;
  allowsPcc: boolean;
  addsMortgageEntry: boolean;
};

const DEED_TYPES: Record<string, DeedConfig> = {
  sale: {
    label: "Kupno-sprzedaż",
    feeMultiplier: 1,
    allowsPcc: true,
    addsMortgageEntry: false
  },
  preliminary: {
    label: "Umowa przedwstępna",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false
  },
  donation: {
    label: "Darowizna",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false
  },
  developer: {
    label: "Umowa deweloperska",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false
  },
  ownership: {
    label: "Ustanowienie odrębnej własności lokalu",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false
  },
  mortgage: {
    label: "Ustanowienie hipoteki",
    feeMultiplier: 0.25,
    allowsPcc: false,
    addsMortgageEntry: true
  },
  enforcement: {
    label: "Poddanie się egzekucji",
    feeMultiplier: 0.5,
    allowsPcc: false,
    addsMortgageEntry: false
  }
};

const PLN_FORMATTER = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2
});

function formatPln(value: number): string {
  return PLN_FORMATTER.format(value);
}

export default function NotarialFeeCalculator() {
  const [value, setValue] = useState("");
  const [deedType, setDeedType] = useState<keyof typeof DEED_TYPES>("sale");
  const [copyCount, setCopyCount] = useState("3");
  const [copyPages, setCopyPages] = useState("6");
  const [includeVat, setIncludeVat] = useState(true);
  const [includeLandRegister, setIncludeLandRegister] = useState(true);
  const [includePcc, setIncludePcc] = useState(true);
  const [touched, setTouched] = useState(false);

  const deedConfig = DEED_TYPES[deedType];

  useEffect(() => {
    if (!deedConfig.allowsPcc) {
      setIncludePcc(false);
    }
  }, [deedConfig.allowsPcc]);

  const numericValue = Number(value);
  const copiesNum = Number(copyCount);
  const pagesNum = Number(copyPages);

  const isValid =
    value !== "" &&
    copyCount !== "" &&
    copyPages !== "" &&
    Number.isFinite(numericValue) &&
    Number.isFinite(copiesNum) &&
    Number.isFinite(pagesNum) &&
    numericValue > 0 &&
    copiesNum > 0 &&
    pagesNum > 0;

  const breakdown = useMemo(() => {
    if (!isValid) return null;
    const baseNet = calculateFee(numericValue) * deedConfig.feeMultiplier;
    const baseVat = includeVat ? baseNet * 0.23 : 0;

    const copiesNet = copiesNum * pagesNum * 6;
    const copiesVat = includeVat ? copiesNet * 0.23 : 0;

    const landRegisterFee = includeLandRegister ? 200 : 0;
    const mortgageEntryFee = deedConfig.addsMortgageEntry ? 200 : 0;
    const pccTax = includePcc && deedConfig.allowsPcc ? numericValue * 0.02 : 0;

    const total =
      baseNet +
      baseVat +
      copiesNet +
      copiesVat +
      landRegisterFee +
      mortgageEntryFee +
      pccTax;

    return {
      baseNet,
      baseVat,
      copiesNet,
      copiesVat,
      landRegisterFee,
      mortgageEntryFee,
      pccTax,
      total
    };
  }, [
    copiesNum,
    deedConfig.addsMortgageEntry,
    deedConfig.allowsPcc,
    deedConfig.feeMultiplier,
    includeLandRegister,
    includePcc,
    includeVat,
    isValid,
    numericValue,
    pagesNum
  ]);

  return (
    <div className="form-grid">
      <label>
        Rodzaj czynności
        <select
          className="input-control"
          value={deedType}
          onChange={(event) => setDeedType(event.target.value as keyof typeof DEED_TYPES)}
        >
          {Object.entries(DEED_TYPES).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
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
          placeholder="Np. 680000"
        />
      </label>

      <div className="split-fields">
        <label>
          Liczba wypisów
          <input
            type="number"
            min="1"
            step="1"
            value={copyCount}
            onChange={(event) => setCopyCount(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Np. 3"
          />
        </label>

        <label>
          Stron na wypis
          <input
            type="number"
            min="1"
            step="1"
            value={copyPages}
            onChange={(event) => setCopyPages(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Np. 6"
          />
        </label>
      </div>

      <label className="checkbox-row">
        <input type="checkbox" checked={includeVat} onChange={(event) => setIncludeVat(event.target.checked)} />
        <span>Uwzględnij VAT 23%</span>
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={includeLandRegister}
          onChange={(event) => setIncludeLandRegister(event.target.checked)}
        />
        <span>Dodaj opłatę za wniosek wieczystoksięgowy (200 zł)</span>
      </label>

      <label className="checkbox-row checkbox-row-nested">
        <input
          type="checkbox"
          checked={includePcc}
          disabled={!deedConfig.allowsPcc}
          onChange={(event) => setIncludePcc(event.target.checked)}
        />
        <span>
          Dodaj podatek PCC 2%
          {!deedConfig.allowsPcc ? " (niedostępne dla wybranej czynności)" : ""}
        </span>
      </label>

      {touched && !isValid && <p className="error">Wprowadź dodatnią liczbę większą od zera.</p>}

      {breakdown !== null && (
        <div className="result">
          <p className="result-title">Szacunkowe koszty transakcji</p>
          <div className="cost-grid" role="table" aria-label="Rozbicie kosztów notarialnych">
            <p role="row">
              <span role="cell">Taksa notarialna (netto)</span>
              <strong role="cell">{formatPln(breakdown.baseNet)}</strong>
            </p>
            <p role="row">
              <span role="cell">VAT od taksy</span>
              <strong role="cell">{formatPln(breakdown.baseVat)}</strong>
            </p>
            <p role="row">
              <span role="cell">Wypisy aktu (netto)</span>
              <strong role="cell">{formatPln(breakdown.copiesNet)}</strong>
            </p>
            <p role="row">
              <span role="cell">VAT od wypisów</span>
              <strong role="cell">{formatPln(breakdown.copiesVat)}</strong>
            </p>
            <p role="row">
              <span role="cell">Opłata sądowa (KW)</span>
              <strong role="cell">{formatPln(breakdown.landRegisterFee)}</strong>
            </p>
            <p role="row">
              <span role="cell">Wpis hipoteki</span>
              <strong role="cell">{formatPln(breakdown.mortgageEntryFee)}</strong>
            </p>
            <p role="row">
              <span role="cell">Podatek PCC</span>
              <strong role="cell">{formatPln(breakdown.pccTax)}</strong>
            </p>
            <p role="row" className="cost-total">
              <span role="cell">Łącznie do zapłaty</span>
              <strong role="cell">{formatPln(breakdown.total)}</strong>
            </p>
          </div>
          <p>
            To wynik orientacyjny oparty na uproszczonym modelu kosztów. Ostateczna kwota zależy
            od zakresu czynności i kancelarii notarialnej.
          </p>
        </div>
      )}
    </div>
  );
}
