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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
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
