"use client";

import React, { useState, useMemo } from "react";

type LedColor = "red" | "green" | "blue" | "yellow" | "white" | "infrared" | "uv";

const LED_VOLTAGES: Record<LedColor, { label: string; voltage: number }> = {
  red: { label: "Czerwona (1.8-2.2V)", voltage: 2.0 },
  green: { label: "Zielona (2.0-3.0V)", voltage: 2.5 },
  blue: { label: "Niebieska (3.0-3.5V)", voltage: 3.2 },
  yellow: { label: "Żółta (2.0-2.2V)", voltage: 2.1 },
  white: { label: "Biała (3.0-3.5V)", voltage: 3.3 },
  infrared: { label: "Podczerwona (1.2-1.8V)", voltage: 1.5 },
  uv: { label: "Ultrafioletowa (3.0-4.0V)", voltage: 3.5 },
};

const COMMON_VOLTAGES = [3, 5, 9, 12, 24];

export default function LedResistorCalculator() {
  const [supplyVoltage, setSupplyVoltage] = useState<number>(5);
  const [customSupplyVoltage, setCustomSupplyVoltage] = useState<string>("5");
  const [ledColor, setLedColor] = useState<LedColor>("red");
  const [ledCurrent, setLedCurrent] = useState<number>(20);
  const [customLedVoltage, setCustomLedVoltage] = useState<string>("");
  const [useCustomVoltage, setUseCustomVoltage] = useState<boolean>(false);

  const result = useMemo(() => {
    const vs = supplyVoltage;
    const vf = useCustomVoltage && customLedVoltage 
      ? parseFloat(customLedVoltage) 
      : LED_VOLTAGES[ledColor].voltage;
    const ifMa = ledCurrent;
    const ifA = ifMa / 1000;

    if (vs <= vf) {
      return {
        resistance: 0,
        power: 0,
        standardResistance: 0,
        recommendedPower: 0,
        actualCurrent: 0,
        voltageDrop: 0,
        error: "Napięcie zasilania musi być wyższe niż napięcie LED!",
      };
    }

    const resistance = (vs - vf) / ifA;
    const power = (vs - vf) * ifA;

    // Dobór najbliższej wartości standardowej rezystora (szereg E12)
    const standardValues = [
      1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2,
      10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82,
      100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
      1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200,
      10000,
    ];

    const standardResistance = standardValues.reduce((prev, curr) => {
      return Math.abs(curr - resistance) < Math.abs(prev - resistance)
        ? curr
        : prev;
    });

    // Dobór mocy rezystora
    let recommendedPower = 0.125; // 1/8 W
    if (power > 0.1) recommendedPower = 0.25; // 1/4 W
    if (power > 0.2) recommendedPower = 0.5; // 1/2 W
    if (power > 0.4) recommendedPower = 1; // 1 W
    if (power > 0.8) recommendedPower = 2; // 2 W

    return {
      resistance,
      standardResistance,
      power,
      recommendedPower,
      actualCurrent: (vs - vf) / standardResistance * 1000,
      voltageDrop: vs - vf,
      error: null,
    };
  }, [supplyVoltage, ledColor, ledCurrent, customLedVoltage, useCustomVoltage]);

  return (
    <div className="space-y-6">
      {/* Napięcie zasilania */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Napięcie zasilania (V)
        </label>
        <div className="flex flex-wrap gap-3">
          {COMMON_VOLTAGES.map((v) => (
            <button
              key={v}
              onClick={() => {
                setSupplyVoltage(v);
                setCustomSupplyVoltage(v.toString());
              }}
              className={`rounded-lg border px-6 py-3 font-semibold transition-colors ${
                supplyVoltage === v
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              {v}V
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">lub własne:</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={customSupplyVoltage}
            onChange={(e) => {
              setCustomSupplyVoltage(e.target.value);
              const val = parseFloat(e.target.value);
              if (!isNaN(val)) setSupplyVoltage(val);
            }}
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">V</span>
        </div>
      </div>

      {/* Kolor LED */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Kolor LED (napięcie przewodzenia)
        </label>
        <select
          value={ledColor}
          onChange={(e) => {
            setLedColor(e.target.value as LedColor);
            setUseCustomVoltage(false);
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {Object.entries(LED_VOLTAGES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCustomVoltage}
              onChange={(e) => setUseCustomVoltage(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Własne napięcie LED:</span>
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={customLedVoltage}
            onChange={(e) => setCustomLedVoltage(e.target.value)}
            disabled={!useCustomVoltage}
            placeholder="np. 2.5"
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <span className="text-sm text-gray-600">V</span>
        </div>
      </div>

      {/* Prąd LED */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Prąd LED (mA)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={ledCurrent}
            onChange={(e) => setLedCurrent(parseInt(e.target.value))}
            className="flex-1"
          />
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            value={ledCurrent}
            onChange={(e) => setLedCurrent(parseInt(e.target.value) || 20)}
            className="w-20 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">mA</span>
        </div>
        <p className="text-xs text-gray-500">
          Typowo 20 mA dla standardowych LED 5mm
        </p>
      </div>

      {/* Wyniki */}
      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
        {result.error ? (
          <div className="text-center text-red-600">
            <p className="text-lg font-semibold">❌ {result.error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Obliczona rezystancja:</p>
              <p className="text-4xl font-bold text-blue-600">
                {result.resistance.toFixed(1)} Ω
              </p>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="mb-2 text-center text-sm font-semibold text-gray-700">
                🎯 Zalecany rezystor standardowy:
              </p>
              <p className="text-center text-3xl font-bold text-green-600">
                {result.standardResistance >= 1000
                  ? `${(result.standardResistance / 1000).toFixed(1)} kΩ`
                  : `${result.standardResistance} Ω`}
              </p>
              <p className="mt-2 text-center text-sm text-gray-600">
                Moc: <strong>{result.recommendedPower} W</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-white p-3">
                <p className="text-gray-600">Rzeczywisty prąd:</p>
                <p className="font-semibold">{result.actualCurrent?.toFixed(1)} mA</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-gray-600">Moc na rezystorze:</p>
                <p className="font-semibold">{(result.power * 1000).toFixed(0)} mW</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-gray-600">Spadek napięcia:</p>
                <p className="font-semibold">{result.voltageDrop?.toFixed(2)} V</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-gray-600">Napięcie na LED:</p>
                <p className="font-semibold">
                  {useCustomVoltage && customLedVoltage
                    ? parseFloat(customLedVoltage).toFixed(2)
                    : LED_VOLTAGES[ledColor].voltage.toFixed(2)}{" "}
                  V
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 p-4 text-sm">
              <p className="mb-2 font-semibold text-amber-800">💡 Schemat połączenia:</p>
              <div className="rounded bg-white p-3 font-mono text-xs">
                <pre className="text-gray-700">
{`(+) Zasilanie ${supplyVoltage}V
     |
    [R] ${result.standardResistance >= 1000 ? `${(result.standardResistance/1000).toFixed(1)}kΩ` : `${result.standardResistance}Ω`} ${result.recommendedPower}W
     |
    >|< LED (${useCustomVoltage && customLedVoltage ? `${parseFloat(customLedVoltage).toFixed(1)}V` : `${LED_VOLTAGES[ledColor].voltage}V`})
     |
(-) GND (masa)`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Informacje dodatkowe */}
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
        <p className="mb-2 font-semibold">ℹ️ Wskazówki:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Zawsze używaj rezystora - bez niego LED się przepali</li>
          <li>Jeśli nie masz dokładnej wartości, użyj najbliższej wyższej</li>
          <li>Dla mocy {'>'} 0.25W użyj rezystora o większej mocy (0.5W lub 1W)</li>
          <li>Dla taśm LED 12V - oblicz rezystor dla jednego segmentu (3 LED + rezystor)</li>
          <li>Polaryzacja: dłuższa nóżka LED to anoda (+), krótsza to katoda (-)</li>
        </ul>
      </div>
    </div>
  );
}
