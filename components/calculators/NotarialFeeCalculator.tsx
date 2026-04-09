"use client";

import { useEffect, useMemo, useState } from "react";
import { DEED_TYPES, DONATION_TAX_GROUPS, type DonationTaxGroup, calculateNotarialFeeBreakdown } from "@/lib/notarial-fee";

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
  const [donationTaxGroup, setDonationTaxGroup] = useState<DonationTaxGroup | null>(null);
  const [touched, setTouched] = useState(false);

  const deedConfig = DEED_TYPES[deedType];

  useEffect(() => {
    if (!deedConfig.allowsPcc) {
      setIncludePcc(false);
    }
  }, [deedConfig.allowsPcc]);

  useEffect(() => {
    if (!deedConfig.allowsLandRegister) {
      setIncludeLandRegister(false);
    }
  }, [deedConfig.allowsLandRegister]);

  useEffect(() => {
    if (deedType !== "donation") {
      setDonationTaxGroup(null);
    }
  }, [deedType]);

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
    return calculateNotarialFeeBreakdown({
      value: numericValue,
      deedType,
      copyCount: copiesNum,
      copyPages: pagesNum,
      includeVat,
      includeLandRegister,
        includePcc,
        donationTaxGroup
    });
  }, [
    copiesNum,
    deedType,
    donationTaxGroup,
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

      {deedType === "donation" && (
        <label>
          Grupa podatkowa obdarowanego (podatek SD)
          <select
            className="input-control"
            value={donationTaxGroup ?? ""}
            onChange={(e) =>
              setDonationTaxGroup(e.target.value ? (e.target.value as DonationTaxGroup) : null)
            }
          >
            <option value="">— nie obliczaj podatku od darowizn —</option>
            {Object.entries(DONATION_TAX_GROUPS).map(([key, cfg]) => (
              <option key={key} value={key} title={cfg.members}>
                {cfg.label} — {cfg.members}
              </option>
            ))}
          </select>
        </label>
      )}

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

      {deedConfig.allowsLandRegister && (
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={includeLandRegister}
            onChange={(event) => setIncludeLandRegister(event.target.checked)}
          />
          <span>
            Dodaj wniosek wieczystoksięgowy (200 zł netto + VAT 23%) i opłatę sądową (
            {deedType === "ownership" ? "260 zł" : "200 zł"}, bez VAT)
          </span>
        </label>
      )}

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
              <span role="cell">Wypisy aktu (netto)</span>
              <strong role="cell">{formatPln(breakdown.copiesNet)}</strong>
            </p>
            <p role="row">
              <span role="cell">VAT 23%</span>
              <strong role="cell">{formatPln(breakdown.baseVat + breakdown.copiesVat)}</strong>
            </p>
            <p role="row">
              <span role="cell">Wniosek KW (z VAT, jeśli włączony)</span>
              <strong role="cell">{formatPln(breakdown.landRegisterFee)}</strong>
            </p>
            <p role="row">
              <span role="cell">Opłata sądowa</span>
              <strong role="cell">{formatPln(breakdown.courtFee)}</strong>
            </p>
            <p role="row">
              <span role="cell">Wpis hipoteki</span>
              <strong role="cell">{formatPln(breakdown.mortgageEntryFee)}</strong>
            </p>
            <p role="row">
              <span role="cell">Podatek PCC</span>
              <strong role="cell">{formatPln(breakdown.pccTax)}</strong>
            </p>
            {breakdown.donationTax > 0 && (
              <p role="row">
                <span role="cell">Podatek od darowizn (SD)</span>
                <strong role="cell">{formatPln(breakdown.donationTax)}</strong>
              </p>
            )}
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
