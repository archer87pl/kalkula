"use client";

import React, { useState, useMemo } from "react";
import {
  decodeCapacitorCode,
  COMMON_CAPACITOR_VALUES,
  type CapacitorCodeResult,
} from "@/lib/capacitor-code";

export default function CapacitorCodeCalculator() {
  const [code, setCode] = useState("104");

  const result = useMemo(() => {
    return decodeCapacitorCode(code);
  }, [code]);

  const handleQuickSelect = (quickCode: string) => {
    setCode(quickCode);
  };

  return (
    <div className="form-grid">
      <label>
        <span>Kod kondensatora (np. 104, 223, 0R5)</span>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="np. 104"
          maxLength={5}
        />
      </label>

      {result ? (
        <div className="result">
          <h3 className="result-title">Pojemność kondensatora</h3>
          <div className="cost-grid">
            <p>
              <span>Kod:</span>
              <strong>{result.code}</strong>
            </p>
            <p className="cost-total">
              <span>Pojemność:</span>
              <strong>
                {result.displayValue} {result.displayUnit}
              </strong>
            </p>
          </div>

          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px dashed #93b7c6" }}>
            <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", color: "#13425d" }}>
              Przeliczniki:
            </h4>
            <div className="cost-grid">
              <p>
                <span>Pikofarady (pF):</span>
                <span>{result.picofarads.toLocaleString("pl-PL")} pF</span>
              </p>
              <p>
                <span>Nanofarady (nF):</span>
                <span>{result.nanofarads.toLocaleString("pl-PL", { maximumFractionDigits: 4 })} nF</span>
              </p>
              <p>
                <span>Mikrofarady (µF):</span>
                <span>{result.microfarads.toLocaleString("pl-PL", { maximumFractionDigits: 6 })} µF</span>
              </p>
            </div>
          </div>

          <p className="calc-disclaimer">
            Kalkulator dekoduje standardowe kody 3-cyfrowe kondensatorów ceramicznych.
            Pierwsze dwie cyfry to wartość bazowa, trzecia to mnożnik (liczba zer).
            Wynik podawany jest w pikofaradach (pF).
          </p>
        </div>
      ) : (
        <div className="error">
          <p>
            Nieprawidłowy kod kondensatora. Wpisz 3-cyfrowy kod (np. 104) lub kod z literą R
            (np. 0R5 = 0.5 pF).
          </p>
        </div>
      )}

      <div style={{ marginTop: "1.5rem" }}>
        <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem" }}>Popularne wartości:</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {COMMON_CAPACITOR_VALUES.map((item) => (
            <button
              key={item.code}
              onClick={() => handleQuickSelect(item.code)}
              style={{
                padding: "0.5rem",
                fontSize: "0.85rem",
                textAlign: "left",
                background: code === item.code ? "#e8f1ff" : "rgba(255, 255, 255, 0.9)",
                border: code === item.code ? "2px solid #0d6f8f" : "1px solid #c6d6ea",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ fontWeight: 700, color: "#0d6f8f" }}>{item.code}</div>
              <div style={{ fontSize: "0.75rem", color: "#53627a", marginTop: "0.15rem" }}>
                {item.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1rem",
          background: "#f0f7ff",
          borderRadius: "10px",
          fontSize: "0.85rem",
          lineHeight: "1.5",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.9rem", color: "#0d6f8f" }}>
          💡 Jak czytać kod kondensatora?
        </h4>
        <ul style={{ margin: "0.25rem 0 0", paddingLeft: "1.25rem", color: "#53627a" }}>
          <li>
            <strong>104</strong> = 10 × 10<sup>4</sup> = 100 000 pF = 100 nF = 0.1 µF
          </li>
          <li>
            <strong>223</strong> = 22 × 10<sup>3</sup> = 22 000 pF = 22 nF
          </li>
          <li>
            <strong>101</strong> = 10 × 10<sup>1</sup> = 100 pF
          </li>
          <li>
            <strong>0R5</strong> = 0.5 pF (R zastępuje przecinek)
          </li>
        </ul>
      </div>
    </div>
  );
}
