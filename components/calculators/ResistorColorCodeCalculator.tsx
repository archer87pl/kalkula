"use client";

import React, { useState, useMemo } from "react";
import {
  calculateResistance,
  getAvailableColors,
  COLOR_CODES,
  type BandCount,
  type ColorCode,
} from "@/lib/resistor-color-code";

const COLOR_HEX: Record<ColorCode, string> = {
  black: "#000000",
  brown: "#8B4513",
  red: "#FF0000",
  orange: "#FFA500",
  yellow: "#FFFF00",
  green: "#00FF00",
  blue: "#0000FF",
  violet: "#8B00FF",
  gray: "#808080",
  white: "#FFFFFF",
  gold: "#FFD700",
  silver: "#C0C0C0",
  none: "transparent",
};

export default function ResistorColorCodeCalculator() {
  const [bandCount, setBandCount] = useState<BandCount>(4);
  const [band1, setBand1] = useState<ColorCode>("brown");
  const [band2, setBand2] = useState<ColorCode>("black");
  const [band3, setBand3] = useState<ColorCode>("red");
  const [band4, setBand4] = useState<ColorCode>("gold");
  const [band5, setBand5] = useState<ColorCode>("brown");
  const [band6, setBand6] = useState<ColorCode>("brown");

  const result = useMemo(() => {
    return calculateResistance({
      bandCount,
      band1,
      band2,
      band3,
      band4,
      band5: bandCount >= 5 ? band5 : undefined,
      band6: bandCount === 6 ? band6 : undefined,
    });
  }, [bandCount, band1, band2, band3, band4, band5, band6]);

  const handleBandCountChange = (count: BandCount) => {
    setBandCount(count);
    // Reset do domyślnych wartości przy zmianie ilości pasków
    if (count === 4) {
      setBand1("brown");
      setBand2("black");
      setBand3("red");
      setBand4("gold");
    } else if (count === 5) {
      setBand1("brown");
      setBand2("black");
      setBand3("black");
      setBand4("red");
      setBand5("brown");
    } else {
      setBand1("brown");
      setBand2("black");
      setBand3("black");
      setBand4("red");
      setBand5("brown");
      setBand6("brown");
    }
  };

  const renderColorSelect = (
    value: ColorCode,
    onChange: (color: ColorCode) => void,
    position: number,
    label: string
  ) => {
    const availableColors = getAvailableColors(position, bandCount);

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as ColorCode)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {availableColors.map((color) => (
            <option key={color} value={color}>
              {COLOR_CODES[color].label}
            </option>
          ))}
        </select>
        <div
          className="h-8 w-full rounded border-2 border-gray-300"
          style={{
            backgroundColor: COLOR_HEX[value],
            border: value === "white" || value === "yellow" ? "2px solid #ccc" : undefined,
          }}
        />
      </div>
    );
  };

  const renderResistor = () => {
    const bands =
      bandCount === 4
        ? [band1, band2, band3, band4]
        : bandCount === 5
        ? [band1, band2, band3, band4, band5]
        : [band1, band2, band3, band4, band5, band6];

    return (
      <div className="flex items-center justify-center py-8">
        <svg
          width="400"
          height="120"
          viewBox="0 0 400 120"
          className="max-w-full"
        >
          {/* Body rezystora */}
          <rect
            x="80"
            y="40"
            width="240"
            height="40"
            fill="#D4A574"
            stroke="#8B6F47"
            strokeWidth="2"
            rx="4"
          />
          
          {/* Wyprowadzenia */}
          <line x1="10" y1="60" x2="80" y2="60" stroke="#999" strokeWidth="3" />
          <line x1="320" y1="60" x2="390" y2="60" stroke="#999" strokeWidth="3" />

          {/* Paski kolorów */}
          {bands.map((band, index) => {
            const xPosition =
              bandCount === 4
                ? 100 + index * 50
                : bandCount === 5
                ? 90 + index * 44
                : 85 + index * 38;
            
            const bandColor = COLOR_HEX[band];
            const needsBorder = band === "white" || band === "yellow";

            return (
              <g key={index}>
                <rect
                  x={xPosition}
                  y="40"
                  width="12"
                  height="40"
                  fill={bandColor}
                  stroke={needsBorder ? "#999" : "none"}
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Wybór ilości pasków */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ilość pasków
        </label>
        <div className="flex gap-4">
          {([4, 5, 6] as BandCount[]).map((count) => (
            <button
              key={count}
              onClick={() => handleBandCountChange(count)}
              className={`rounded-lg px-6 py-2 font-medium transition-colors ${
                bandCount === count
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {count} paski
            </button>
          ))}
        </div>
      </div>

      {/* Wizualizacja rezystora */}
      <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        {renderResistor()}
      </div>

      {/* Selektory kolorów */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {renderColorSelect(band1, setBand1, 1, "Pasek 1")}
        {renderColorSelect(band2, setBand2, 2, "Pasek 2")}
        {renderColorSelect(band3, setBand3, 3, bandCount === 4 ? "Mnożnik" : "Pasek 3")}
        {renderColorSelect(
          band4,
          setBand4,
          4,
          bandCount === 4 ? "Tolerancja" : "Mnożnik"
        )}
        {bandCount >= 5 &&
          renderColorSelect(band5, setBand5, 5, "Tolerancja")}
        {bandCount === 6 &&
          renderColorSelect(band6, setBand6, 6, "Wsp. temp.")}
      </div>

      {/* Wyniki */}
      <div className="rounded-lg bg-blue-50 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Rezystancja</h3>
            <p className="text-3xl font-bold text-blue-600">
              {result.resistanceFormatted}
            </p>
            <p className="text-sm text-gray-500">
              ({result.resistance.toLocaleString("pl-PL")} Ω)
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Tolerancja</h3>
              <p className="text-xl font-semibold text-gray-800">
                {result.toleranceFormatted}
              </p>
            </div>

            {result.tempCoeff !== undefined && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Współczynnik temperaturowy
                </h3>
                <p className="text-xl font-semibold text-gray-800">
                  {result.tempCoeffFormatted}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Informacje dodatkowe */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        <h4 className="mb-2 font-semibold text-gray-800">Informacje:</h4>
        <ul className="space-y-1 pl-5 list-disc">
          <li><strong>4 paski:</strong> standardowy rezystor z dokładnością ±5% lub ±10%</li>
          <li><strong>5 pasków:</strong> rezystor precyzyjny z dokładnością ±1% lub ±2%</li>
          <li><strong>6 pasków:</strong> rezystor z określonym współczynnikiem temperaturowym</li>
          <li>Paski czyta się od lewej do prawej (pasek tolerancji zwykle jest dalej od innych)</li>
        </ul>
      </div>
    </div>
  );
}
