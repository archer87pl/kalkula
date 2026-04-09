"use client";

import { useMemo, useState } from "react";

// Widmark formula: BAC (‰) = pure_alcohol_g / (weight_kg × r) − 0.15 × hours
// r: 0.7 (men), 0.6 (women)
// Breath: 1 ‰ ≈ 0.5 mg/dm³
// Limits PL: stan po spożyciu ≥ 0.2 ‰ / ≥ 0.1 mg/dm³, stan nietrzeźwości ≥ 0.5 ‰ / ≥ 0.25 mg/dm³

function getStatus(bac: number): { label: string; className: string } {
  if (bac <= 0) return { label: "Trzeźwy", className: "bac-sober" };
  if (bac < 0.2) return { label: "Śladowe ilości", className: "bac-trace" };
  if (bac < 0.5) return { label: "Stan po spożyciu (0,2–0,5 ‰)", className: "bac-after" };
  return { label: "Stan nietrzeźwości (≥ 0,5 ‰)", className: "bac-drunk" };
}

export default function AlkoholCalculator() {
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"m" | "f">("m");
  const [volume, setVolume] = useState("");
  const [strength, setStrength] = useState("");
  const [hours, setHours] = useState("0");
  const [touched, setTouched] = useState(false);

  const weightNum = Number(weight);
  const volumeNum = Number(volume);
  const strengthNum = Number(strength);
  const hoursNum = Number(hours);

  const isValid =
    weight !== "" && Number.isFinite(weightNum) && weightNum > 0 &&
    volume !== "" && Number.isFinite(volumeNum) && volumeNum > 0 &&
    strength !== "" && Number.isFinite(strengthNum) && strengthNum > 0 && strengthNum <= 100 &&
    Number.isFinite(hoursNum) && hoursNum >= 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    const r = gender === "m" ? 0.7 : 0.6;
    const pureAlcohol = volumeNum * (strengthNum / 100) * 0.789; // grams
    const rawBac = pureAlcohol / (weightNum * r);
    const bac = Math.max(0, rawBac - 0.15 * hoursNum);
    const breathMg = bac * 0.5; // mg/dm³ (approx)
    return { bac, breathMg };
  }, [gender, hoursNum, isValid, strengthNum, volumeNum, weightNum]);

  const handleBlur = () => setTouched(true);

  return (
    <div className="form-grid">
      <label>
        Płeć
        <select value={gender} onChange={(e) => setGender(e.target.value as "m" | "f")}>
          <option value="m">Mężczyzna</option>
          <option value="f">Kobieta</option>
        </select>
      </label>

      <label>
        Waga (kg)
        <input
          type="number"
          min="1"
          step="0.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={handleBlur}
          placeholder="Np. 80"
        />
      </label>

      <label>
        Ilość napoju (ml)
        <input
          type="number"
          min="0"
          step="10"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          onBlur={handleBlur}
          placeholder="Np. 500"
        />
      </label>

      <label>
        Moc napoju (%)
        <input
          type="number"
          min="0.1"
          max="100"
          step="0.5"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          onBlur={handleBlur}
          placeholder="Np. 5 (piwo), 12 (wino), 40 (wódka)"
        />
      </label>

      <label>
        Czas od spożycia (h)
        <input
          type="number"
          min="0"
          step="0.25"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          onBlur={handleBlur}
          placeholder="0"
        />
      </label>

      {touched && !isValid && (
        <p className="error">Wypełnij poprawnie wszystkie pola (waga, objętość, moc ≤ 100%).</p>
      )}

      {result !== null && (
        <div className="result">
          <p className="result-title">Szacunkowy wynik (metoda Widmarka)</p>
          <div className="cost-grid">
            <span>Stężenie we krwi:</span>
            <strong>{result.bac.toFixed(2)} ‰</strong>
            <span>Stężenie w wydychanym powietrzu:</span>
            <strong>{result.breathMg.toFixed(3)} mg/dm³</strong>
          </div>
          <p className={`cost-total bac-status ${getStatus(result.bac).className}`}>
            {getStatus(result.bac).label}
          </p>
          <p className="calc-disclaimer">
            Wynik jest orientacyjny. Na metabolizm alkoholu wpływa wiele czynników
            (stan zdrowia, jedzenie, leki, zmęczenie). Nie prowadź pojazdu, jeśli spożyłeś alkohol.
          </p>
        </div>
      )}
    </div>
  );
}
