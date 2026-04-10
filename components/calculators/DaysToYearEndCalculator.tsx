"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  calculateDaysToYearEnd,
  formatDate,
  getDayName,
} from "@/lib/days-to-year-end";

export default function DaysToYearEndCalculator() {
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [today, setToday] = useState<Date>(new Date());

  // Aktualizuj "dzisiaj" po stronie klienta
  useEffect(() => {
    setToday(new Date());
  }, []);

  const result = useMemo(() => {
    if (useCustomDate && customDate) {
      const [year, month, day] = customDate.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return calculateDaysToYearEnd(date);
    }
    return calculateDaysToYearEnd(today);
  }, [useCustomDate, customDate, today]);

  const getTodayDateString = () => {
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Wybór daty */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="useCustomDate"
            checked={useCustomDate}
            onChange={(e) => {
              setUseCustomDate(e.target.checked);
              if (e.target.checked && !customDate) {
                setCustomDate(getTodayDateString());
              }
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="useCustomDate" className="text-sm font-medium text-gray-700">
            Wybierz własną datę
          </label>
        </div>

        {useCustomDate && (
          <div className="space-y-2">
            <label htmlFor="customDate" className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              id="customDate"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Główny wynik */}
      <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-700">
          Do końca {result.currentYear} roku zostało:
        </h3>
        <p className="mb-4 text-7xl font-bold text-blue-600">
          {result.daysRemaining}
        </p>
        <p className="text-2xl font-semibold text-gray-800">
          {result.daysRemaining === 1
            ? "dzień"
            : result.daysRemaining < 5
            ? "dni"
            : "dni"}
        </p>
      </div>

      {/* Pasek postępu roku */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            Postęp roku {result.currentYear}
          </span>
          <span className="font-semibold text-blue-600">
            {result.percentElapsed.toFixed(1)}%
          </span>
        </div>
        <div className="h-6 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${result.percentElapsed}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>1 stycznia</span>
          <span>31 grudnia</span>
        </div>
      </div>

      {/* Statystyki */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dni robocze</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.weekdaysRemaining}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-3">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dni weekendowe</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.weekendsRemaining}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-3">
              <svg
                className="h-6 w-6 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 4h10M3 9h18m-9 9l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tygodnie</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.weeksRemaining}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Miesiące</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.monthsRemaining}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dni minęło</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.daysElapsed}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-100 p-3">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dni w roku</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.totalDaysInYear}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Informacja o dacie */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
        <div className="flex items-start gap-2">
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
          <div className="text-gray-600">
            {useCustomDate ? (
              <p>
                Obliczenia dla daty:{" "}
                <strong className="text-gray-800">
                  {formatDate(result.currentDate)} (
                  {getDayName(result.currentDate)})
                </strong>
              </p>
            ) : (
              <p>
                Dzisiaj jest:{" "}
                <strong className="text-gray-800">
                  {formatDate(result.currentDate)} (
                  {getDayName(result.currentDate)})
                </strong>
                . Kalkulator automatycznie aktualizuje się każdego dnia.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Dodatkowe informacje */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        <h4 className="mb-2 font-semibold text-gray-800">Przydatne informacje:</h4>
        <ul className="space-y-1 pl-5 list-disc">
          <li>
            Rok {result.currentYear} ma {result.totalDaysInYear} dni
            {result.totalDaysInYear === 366 && " (rok przestępny)"}
          </li>
          <li>
            Do Sylwestra pozostało {result.percentRemaining.toFixed(1)}% roku
          </li>
          <li>
            Minęło już {result.percentElapsed.toFixed(1)}% bieżącego roku
          </li>
          <li>
            W pozostałym czasie {result.currentYear} roku masz{" "}
            {result.weekdaysRemaining} dni roboczych na realizację planów
          </li>
        </ul>
      </div>
    </div>
  );
}
