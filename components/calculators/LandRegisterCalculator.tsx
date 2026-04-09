"use client";

import React, { useState, useMemo } from "react";
import {
  calculateCheckDigit,
  verifyLandRegister,
  COURT_CODES,
} from "@/lib/land-register";

export default function LandRegisterCalculator() {
  const [courtCode, setCourtCode] = useState("");
  const [number, setNumber] = useState("");
  const [verifyMode, setVerifyMode] = useState(false);
  const [verifyInput, setVerifyInput] = useState("");

  const result = useMemo(() => {
    if (!courtCode || !number) {
      return null;
    }
    return calculateCheckDigit(courtCode, number);
  }, [courtCode, number]);

  const verifyResult = useMemo(() => {
    if (!verifyInput.trim()) return null;
    return verifyLandRegister(verifyInput.trim());
  }, [verifyInput]);

  const handleNumberChange = (value: string) => {
    // Dozwól tylko cyfry
    const cleaned = value.replace(/[^0-9]/g, "");
    setNumber(cleaned);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Wybór trybu */}
      <div className="flex gap-4 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setVerifyMode(false)}
          className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
            !verifyMode
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Oblicz cyfrę kontrolną
        </button>
        <button
          onClick={() => setVerifyMode(true)}
          className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
            verifyMode
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Sprawdź poprawność
        </button>
      </div>

      {!verifyMode ? (
        <>
          {/* Tryb obliczania */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="courtCode"
                className="block text-sm font-medium text-gray-700"
              >
                Kod sądu
              </label>
              <select
                id="courtCode"
                value={courtCode}
                onChange={(e) => setCourtCode(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Wybierz sąd</option>
                {COURT_CODES.map((court) => (
                  <option key={court.code} value={court.code}>
                    {court.code} - {court.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Numer księgi (tylko cyfry)
              </label>
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => handleNumberChange(e.target.value)}
                placeholder="np. 00012345"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                Wpisz sam numer bez ukośników i cyfry kontrolnej
              </p>
            </div>
          </div>

          {/* Wynik */}
          {result && result.isValid && (
            <div className="rounded-lg bg-blue-50 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    Cyfra kontrolna
                  </h3>
                  <p className="text-5xl font-bold text-blue-600">
                    {result.checkDigit}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    Pełny numer księgi wieczystej
                  </h3>
                  <p className="text-2xl font-semibold text-gray-800">
                    {result.fullNumber}
                  </p>
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-blue-100 p-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-blue-800">
                    To jest poprawny numer księgi wieczystej, który możesz
                    sprawdzić na stronie{" "}
                    <a
                      href="https://ekw.ms.gov.pl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      ekw.ms.gov.pl
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {courtCode && number && !result?.isValid && (
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">
                Wypełnij poprawnie kod sądu i numer księgi
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Tryb weryfikacji */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="verifyInput"
                className="block text-sm font-medium text-gray-700"
              >
                Pełny numer księgi wieczystej
              </label>
              <input
                type="text"
                id="verifyInput"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                placeholder="np. KR1P/00012345/6"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                Format: KOD_SĄDU/NUMER/CYFRA_KONTROLNA
              </p>
            </div>
          </div>

          {/* Wynik weryfikacji */}
          {verifyResult !== null && (
            <div
              className={`rounded-lg p-6 ${
                verifyResult
                  ? "bg-green-50 border-2 border-green-200"
                  : "bg-red-50 border-2 border-red-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {verifyResult ? (
                  <svg
                    className="h-8 w-8 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-8 w-8 flex-shrink-0 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      verifyResult ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {verifyResult
                      ? "Numer poprawny ✓"
                      : "Numer niepoprawny ✗"}
                  </h3>
                  <p
                    className={`text-sm ${
                      verifyResult ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {verifyResult
                      ? "Cyfra kontrolna się zgadza. To jest prawidłowy numer księgi wieczystej."
                      : "Cyfra kontrolna jest nieprawidłowa lub format numeru jest błędny."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Informacje dodatkowe */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        <h4 className="mb-2 font-semibold text-gray-800">
          Jak działa cyfra kontrolna?
        </h4>
        <ul className="space-y-1 pl-5 list-disc">
          <li>
            <strong>Format:</strong> KOD_SĄDU/NUMER/CYFRA_KONTROLNA (np.
            KR1P/00012345/6)
          </li>
          <li>
            <strong>Kod sądu:</strong> 4 znaki określające wydziały ksiąg
            wieczystych (np. KR1P = Kraków)
          </li>
          <li>
            <strong>Cyfra kontrolna:</strong> zabezpiecza przed błędami
            przepisania numeru
          </li>
          <li>
            Algorytm: literom przypisuje się wartości A=1, B=2...Z=26, każdy
            znak mnoży się przez wagę (1,3,7 cyklicznie), suma modulo 10
          </li>
          <li>
            Możesz sprawdzić swoją księgę na{" "}
            <a
              href="https://ekw.ms.gov.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              ekw.ms.gov.pl
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
