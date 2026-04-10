"use client";

import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  calculateInflation,
  getAvailableYears,
  INFLATION_DATA,
  type InflationCalculationResult,
} from "@/lib/inflation";

export default function InflationCalculator() {
  const { min: minYear, max: maxYear } = getAvailableYears();
  
  const [amount, setAmount] = useState("1000");
  const [fromYear, setFromYear] = useState("2010");
  const [toYear, setToYear] = useState("2025");

  const result = useMemo(() => {
    const amountNum = parseFloat(amount);
    const fromYearNum = parseInt(fromYear, 10);
    const toYearNum = parseInt(toYear, 10);

    if (isNaN(amountNum) || isNaN(fromYearNum) || isNaN(toYearNum)) {
      return null;
    }

    return calculateInflation(amountNum, fromYearNum, toYearNum);
  }, [amount, fromYear, toYear]);

  const chartData = useMemo(() => {
    if (!result) return [];
    return result.yearsData.map((yearData) => ({
      year: yearData.year,
      wartość: parseFloat(yearData.value.toFixed(2)),
    }));
  }, [result]);

  return (
    <div className="form-grid">
      <label>
        <span>Kwota początkowa (zł)</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="np. 1000"
          min="0"
          step="100"
        />
      </label>

      <div className="split-fields">
        <label>
          <span>Rok początkowy</span>
          <select value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Rok docelowy</span>
          <select value={toYear} onChange={(e) => setToYear(e.target.value)}>
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result ? (
        <>
          <div className="result">
            <h3 className="result-title">💸 Twoje pieniądze straciły na wartości</h3>
            
            <div
              style={{
                background: "linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)",
                border: "2px solid #ef4444",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.1rem", lineHeight: "1.6", color: "#1f2937" }}>
                <strong style={{ fontSize: "1.3rem", color: "#dc2626" }}>
                  Twoje {result.initialAmount.toLocaleString("pl-PL")} zł z {result.initialYear} roku
                </strong>
                <br />
                <span style={{ fontSize: "1.05rem" }}>jest teraz warte tylko:</span>
                <br />
                <strong style={{ fontSize: "1.8rem", color: "#dc2626", display: "block", marginTop: "0.5rem" }}>
                  {result.purchasing_power.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł
                </strong>
                <span style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                  (w cenach z {result.targetYear} roku)
                </span>
              </p>
            </div>

            <div className="cost-grid">
              <p>
                <span>Inflacja łączna:</span>
                <strong style={{ color: "#b3261e" }}>
                  +{result.totalInflation.toFixed(1)}%
                </strong>
              </p>
              <p>
                <span>Średnia inflacja rocznie:</span>
                <span>{result.averageInflation.toFixed(2)}%</span>
              </p>
              <p className="cost-total">
                <span>Aby zachować wartość, potrzebujesz:</span>
                <strong>{result.finalAmount.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł</strong>
              </p>
            </div>

            <p className="calc-disclaimer" style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              📌 <strong>Co to znaczy?</strong> Za {result.purchasing_power.toLocaleString("pl-PL", { maximumFractionDigits: 0 })} zł 
              w {result.targetYear} roku kupisz tyle samo co za {result.initialAmount.toLocaleString("pl-PL")} zł 
              w {result.initialYear} roku. Inflacja sprawiła, że Twoje pieniądze straciły na wartości.
            </p>
          </div>

          {chartData.length > 1 && chartData.length <= 30 && (
            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ margin: "0 0 1rem", fontSize: "0.95rem" }}>
                📈 Wykres utraty wartości w czasie:
              </h4>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid #d5deeb",
                  borderRadius: "10px",
                  padding: "1rem",
                }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="year"
                      stroke="#6b7280"
                      style={{ fontSize: "0.75rem" }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: "0.75rem" }}
                      tickFormatter={(value) => `${value.toLocaleString("pl-PL")} zł`}
                    />
                    <Tooltip
                      formatter={(value) => {
                        const numValue = typeof value === 'number' ? value : 0;
                        return [
                          `${numValue.toLocaleString("pl-PL", { minimumFractionDigits: 2 })} zł`,
                          "Wartość",
                        ];
                      }}
                      labelFormatter={(label) => `Rok ${label}`}
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #d5deeb",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="wartość"
                      stroke="#dc2626"
                      strokeWidth={2.5}
                      dot={{ fill: "#dc2626", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.75rem", textAlign: "center" }}>
                  Wykres pokazuje jak inflacja wpłynęła na realną wartość Twoich pieniędzy
                </p>
              </div>
            </div>
          )}

          {result.yearsData.length <= 20 && (
            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem" }}>
                📊 Szczegóły rok po roku:
              </h4>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "1px solid #d5deeb",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    fontSize: "0.85rem",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead style={{ position: "sticky", top: 0, background: "#eef4ff", zIndex: 1 }}>
                    <tr>
                      <th style={{ padding: "0.5rem", textAlign: "left", borderBottom: "2px solid #d5deeb" }}>
                        Rok
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "right", borderBottom: "2px solid #d5deeb" }}>
                        Inflacja
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "right", borderBottom: "2px solid #d5deeb" }}>
                        Wartość
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearsData.map((yearData) => (
                      <tr
                        key={yearData.year}
                        style={{
                          borderBottom: "1px solid #e8eef7",
                          background: yearData.isProjection ? "#fffbeb" : "transparent",
                        }}
                      >
                        <td style={{ padding: "0.5rem" }}>
                          {yearData.year}
                          {yearData.isProjection && (
                            <span style={{ fontSize: "0.75rem", color: "#f59e0b", marginLeft: "0.25rem" }}>
                              *
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "0.5rem",
                            textAlign: "right",
                            color: yearData.rate > 0 ? "#b3261e" : "#2d7a4f",
                            fontWeight: 600,
                          }}
                        >
                          {yearData.rate > 0 ? "+" : ""}
                          {yearData.rate.toFixed(1)}%
                        </td>
                        <td style={{ padding: "0.5rem", textAlign: "right", fontWeight: 600 }}>
                          {yearData.value.toLocaleString("pl-PL", { maximumFractionDigits: 2 })} zł
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {result.yearsData.some((y) => y.isProjection) && (
                <p style={{ fontSize: "0.75rem", color: "#53627a", marginTop: "0.5rem", fontStyle: "italic" }}>
                  * Dane prognozowane
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="error">
          <p>Wprowadź prawidłowe dane. Rok początkowy musi być wcześniejszy niż rok docelowy.</p>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem" }}>
          📊 Tabela inflacji w Polsce (1990-2026):
        </h4>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            border: "1px solid #d5deeb",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <table
            style={{
              width: "100%",
              fontSize: "0.85rem",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ position: "sticky", top: 0, background: "#eef4ff", zIndex: 1 }}>
              <tr>
                <th style={{ padding: "0.5rem", textAlign: "left", borderBottom: "2px solid #d5deeb" }}>
                  Rok
                </th>
                <th style={{ padding: "0.5rem", textAlign: "right", borderBottom: "2px solid #d5deeb" }}>
                  Inflacja roczna
                </th>
              </tr>
            </thead>
            <tbody>
              {INFLATION_DATA.map((data) => (
                <tr
                  key={data.year}
                  style={{
                    borderBottom: "1px solid #e8eef7",
                    background: data.isProjection ? "#fffbeb" : "transparent",
                  }}
                >
                  <td style={{ padding: "0.5rem" }}>
                    {data.year}
                    {data.isProjection && (
                      <span style={{ fontSize: "0.75rem", color: "#f59e0b", marginLeft: "0.25rem" }}>
                        (prognoza)
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "right",
                      color: data.rate > 0 ? "#b3261e" : "#2d7a4f",
                      fontWeight: data.rate > 10 ? 700 : 600,
                    }}
                  >
                    {data.rate > 0 ? "+" : ""}
                    {data.rate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.75rem", color: "#53627a", marginTop: "0.75rem", lineHeight: "1.5" }}>
          <strong>Źródło danych:</strong> Główny Urząd Statystyczny (GUS). 
          Dane za lata 2025-2026 są prognozami na podstawie bieżących wskaźników i prognoz NBP.
        </p>
      </div>
    </div>
  );
}
