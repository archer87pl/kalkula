"use client";

import { useMemo, useState } from "react";

function getCategory(bmi: number): string {
  if (bmi < 18.5) return "Niedowaga";
  if (bmi < 25) return "Waga prawidłowa";
  if (bmi < 30) return "Nadwaga";
  return "Otyłość";
}

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [touched, setTouched] = useState(false);

  const weightNum = Number(weight);
  const heightCmNum = Number(heightCm);
  const isValid =
    weight !== "" &&
    heightCm !== "" &&
    Number.isFinite(weightNum) &&
    Number.isFinite(heightCmNum) &&
    weightNum > 0 &&
    heightCmNum > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    const heightM = heightCmNum / 100;
    const bmi = weightNum / (heightM * heightM);
    return {
      bmi,
      category: getCategory(bmi)
    };
  }, [heightCmNum, isValid, weightNum]);

  return (
    <div className="form-grid">
      <label>
        Waga (kg)
        <input
          type="number"
          min="0"
          step="0.1"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 78"
        />
      </label>

      <label>
        Wzrost (cm)
        <input
          type="number"
          min="0"
          step="0.1"
          value={heightCm}
          onChange={(event) => setHeightCm(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Np. 178"
        />
      </label>

      {touched && !isValid && <p className="error">Podaj dodatnią wagę i wzrost.</p>}

      {result !== null && (
        <div className="result">
          <p>
            BMI: <strong>{result.bmi.toFixed(2)}</strong>
          </p>
          <p>
            Kategoria: <strong>{result.category}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
