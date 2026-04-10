import type { CalculatorIconKey } from "@/lib/calculators";

type Props = {
  icon: CalculatorIconKey;
  className?: string;
};

export default function CalculatorIllustration({ icon, className = "" }: Props) {
  const cls = `calc-illus ${className}`.trim();

  if (icon === "pcc") {
    // Tax declaration document with 2% stamp badge
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="6" width="42" height="56" rx="5" fill="#dce6ff" stroke="#6380d6" strokeWidth="1" />
          <rect x="10" y="6" width="42" height="10" rx="5" fill="#6380d6" opacity="0.25" />
          <rect x="18" y="23" width="26" height="3" rx="1.5" fill="#6380d6" />
          <rect x="18" y="30" width="22" height="2.5" rx="1.25" fill="#a8bcee" />
          <rect x="18" y="36" width="24" height="2.5" rx="1.25" fill="#a8bcee" />
          <rect x="18" y="42" width="16" height="2.5" rx="1.25" fill="#a8bcee" />
          <rect x="18" y="48" width="20" height="2.5" rx="1.25" fill="#c8d8f5" />
          <circle cx="56" cy="56" r="18" fill="#2f4f90" />
          <circle cx="49.5" cy="50" r="3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="62.5" cy="62" r="3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="62" x2="61" y2="50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (icon === "notarial") {
    // Parchment scroll with teal wax seal and 5-point star
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="6" width="42" height="58" rx="5" fill="#cdf5ef" stroke="#2a9d8f" strokeWidth="1" />
          <rect x="8" y="6" width="42" height="11" rx="5" fill="#2a9d8f" opacity="0.25" />
          <rect x="16" y="23" width="26" height="3" rx="1.5" fill="#2a9d8f" />
          <rect x="16" y="30" width="20" height="2.5" rx="1.25" fill="#7ecfc9" />
          <rect x="16" y="36" width="24" height="2.5" rx="1.25" fill="#7ecfc9" />
          <rect x="16" y="42" width="14" height="2.5" rx="1.25" fill="#7ecfc9" />
          <rect x="16" y="48" width="18" height="2.5" rx="1.25" fill="#b2e8e3" />
          <path d="M8 58 Q8 64 14 64 Q20 64 20 58" fill="#a8e8e0" stroke="#2a9d8f" strokeWidth="1" />
          <circle cx="56" cy="56" r="18" fill="#006c67" />
          <circle cx="56" cy="56" r="12.5" fill="none" stroke="white" strokeWidth="1" opacity="0.45" />
          {/* 5-point star */}
          <path
            d="M56 44.5 L58.6 52.4 L67 52.4 L60.7 57.3 L63.1 65.2 L56 60.3 L48.9 65.2 L51.3 57.3 L45 52.4 L53.4 52.4 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </span>
    );
  }

  if (icon === "loan") {
    // House silhouette with green euro coin badge
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,8 68,30 12,30" fill="#d0efe1" stroke="#2d8a60" strokeWidth="1.2" />
          <rect x="16" y="30" width="48" height="32" rx="2" fill="#e4f5ee" stroke="#2d8a60" strokeWidth="1.2" />
          <rect x="32" y="44" width="16" height="18" rx="2" fill="#2d8a60" />
          <circle cx="39" cy="53" r="1.5" fill="white" />
          <rect x="19" y="36" width="12" height="10" rx="1.5" fill="#2d8a60" opacity="0.4" />
          <rect x="49" y="36" width="12" height="10" rx="1.5" fill="#2d8a60" opacity="0.4" />
          <circle cx="58" cy="58" r="16" fill="#166e4b" />
          {/* € sign */}
          <path
            d="M64 55 Q62 48 56 47 Q50 46 47 52 Q44 58 47 64 Q50 70 56 70 Q62 70 64 64"
            stroke="white"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <line x1="44" y1="57" x2="54" y2="57" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="44" y1="62" x2="54" y2="62" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (icon === "cash") {
    // Wallet with banknote sticking out
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bill sticking out */}
          <rect x="22" y="16" width="32" height="20" rx="3" fill="#a8d8b0" stroke="#3a8f5a" strokeWidth="1" />
          <line x1="28" y1="22" x2="46" y2="22" stroke="#3a8f5a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="27" x2="40" y2="27" stroke="#3a8f5a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Wallet body */}
          <rect x="10" y="30" width="54" height="38" rx="7" fill="#fde8a0" stroke="#c08000" strokeWidth="1.2" />
          {/* Wallet divider */}
          <rect x="10" y="40" width="54" height="4" rx="1" fill="#c08000" opacity="0.2" />
          {/* Coin pocket */}
          <rect x="38" y="46" width="20" height="15" rx="4" fill="#ffd257" stroke="#c08000" strokeWidth="1" />
          <circle cx="48" cy="53" r="4.5" fill="#c08000" opacity="0.25" />
          <circle cx="48" cy="53" r="4.5" fill="none" stroke="#c08000" strokeWidth="1" />
          {/* Lines representing bills inside */}
          <rect x="14" y="46" width="18" height="2.5" rx="1.25" fill="#c08000" opacity="0.4" />
          <rect x="14" y="52" width="14" height="2.5" rx="1.25" fill="#c08000" opacity="0.35" />
          <rect x="14" y="58" width="16" height="2.5" rx="1.25" fill="#c08000" opacity="0.3" />
        </svg>
      </span>
    );
  }

  if (icon === "bmi") {
    // Person silhouette with measurement ruler
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ruler */}
          <rect x="54" y="8" width="12" height="64" rx="4" fill="#e6e0ff" stroke="#6b4ec1" strokeWidth="1" />
          <line x1="60" y1="16" x2="66" y2="16" stroke="#6b4ec1" strokeWidth="1.5" />
          <line x1="60" y1="24" x2="64" y2="24" stroke="#6b4ec1" strokeWidth="1.2" />
          <line x1="60" y1="32" x2="66" y2="32" stroke="#6b4ec1" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="64" y2="40" stroke="#6b4ec1" strokeWidth="1.2" />
          <line x1="60" y1="48" x2="66" y2="48" stroke="#6b4ec1" strokeWidth="1.5" />
          <line x1="60" y1="56" x2="64" y2="56" stroke="#6b4ec1" strokeWidth="1.2" />
          <line x1="60" y1="64" x2="66" y2="64" stroke="#6b4ec1" strokeWidth="1.5" />
          {/* Person silhouette */}
          <circle cx="30" cy="18" r="10" fill="#d8d0f8" stroke="#6b4ec1" strokeWidth="1.2" />
          <path
            d="M14 52 Q14 38 30 38 Q46 38 46 52 L44 70 L16 70 Z"
            fill="#d8d0f8"
            stroke="#6b4ec1"
            strokeWidth="1.2"
          />
          {/* Checkmark badge */}
          <circle cx="38" cy="60" r="9" fill="#6b4ec1" />
          <path
            d="M34 60 L37.5 63.5 L44 57"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
    );
  }

  if (icon === "vat") {
    // Receipt paper with % badge
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="4" width="36" height="60" rx="4" fill="#e8eeff" stroke="#4b6bca" strokeWidth="1" />
          {/* Header bar */}
          <rect x="16" y="4" width="36" height="11" rx="4" fill="#4b6bca" opacity="0.3" />
          {/* VAT label line */}
          <rect x="22" y="22" width="24" height="3.5" rx="1.75" fill="#4b6bca" />
          {/* Item lines */}
          <rect x="22" y="30" width="20" height="2.5" rx="1.25" fill="#a0b0e0" />
          <rect x="22" y="36" width="14" height="2.5" rx="1.25" fill="#a0b0e0" />
          <rect x="22" y="42" width="18" height="2.5" rx="1.25" fill="#a0b0e0" />
          <rect x="22" y="48" width="12" height="2.5" rx="1.25" fill="#c8d2f0" />
          {/* Zigzag receipt bottom */}
          <path d="M16 60 L20 66 L24 60 L28 66 L32 60 L36 66 L40 60 L44 66 L48 60 L52 66 L52 60 Z" fill="white" stroke="#4b6bca" strokeWidth="0.8" />
          {/* % badge */}
          <circle cx="58" cy="58" r="17" fill="#2f4f90" />
          <circle cx="51.5" cy="51" r="3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="64.5" cy="65" r="3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="54" y1="64" x2="62" y2="51" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (icon === "alcohol") {
    // Beer glass with handle, foam, and measurement markings
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass body (trapezoid) */}
          <path d="M18 22 L14 70 L54 70 L50 22 Z" fill="#fff8dc" stroke="#c89000" strokeWidth="1.2" />
          {/* Amber liquid fill */}
          <path d="M19.5 34 L16 70 L52 70 L48.5 34 Z" fill="#ffd24a" opacity="0.65" />
          {/* Foam */}
          <ellipse cx="34" cy="22" rx="17" ry="7" fill="white" stroke="#c89000" strokeWidth="1" />
          <circle cx="26" cy="20" r="4.5" fill="white" stroke="#c89000" strokeWidth="0.8" />
          <circle cx="34" cy="17" r="3.5" fill="white" stroke="#c89000" strokeWidth="0.8" />
          <circle cx="42" cy="20" r="4.5" fill="white" stroke="#c89000" strokeWidth="0.8" />
          {/* Handle */}
          <path
            d="M50 30 Q68 30 68 46 Q68 62 50 62"
            stroke="#c89000"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Measurement ticks on left */}
          <line x1="14" y1="40" x2="19" y2="40" stroke="#c89000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="52" x2="19" y2="52" stroke="#c89000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="62" x2="19" y2="62" stroke="#c89000" strokeWidth="1.5" strokeLinecap="round" />
          {/* ‰ badge */}
          <circle cx="56" cy="56" r="14" fill="#b45309" />
          <circle cx="50" cy="50" r="2.5" fill="white" />
          <circle cx="56" cy="62" r="2.5" fill="white" />
          <circle cx="62" cy="62" r="2.5" fill="white" />
          <line x1="51.5" y1="62" x2="59.5" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (icon === "bonds") {
    // Treasury bond certificate with rising chart line
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Certificate background */}
          <rect x="8" y="12" width="52" height="56" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.2" />
          {/* Decorative border */}
          <rect x="12" y="16" width="44" height="48" rx="3" fill="none" stroke="#4caf50" strokeWidth="0.8" strokeDasharray="4 2" />
          {/* Eagle emblem */}
          <circle cx="32" cy="28" r="8" fill="#1b5e20" opacity="0.15" />
          <path d="M32 23 L36 28 L32 32 L28 28 Z" fill="#2e7d32" />
          {/* Title lines */}
          <rect x="16" y="40" width="24" height="2.5" rx="1.25" fill="#2e7d32" />
          <rect x="16" y="46" width="18" height="2" rx="1" fill="#66bb6a" />
          {/* Chart area */}
          <rect x="14" y="52" width="40" height="10" rx="2" fill="white" stroke="#4caf50" strokeWidth="0.8" />
          {/* Rising line chart */}
          <polyline
            points="16,60 22,58 28,56 34,54 40,51 46,48 52,45"
            stroke="#2e7d32"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Chart dots */}
          <circle cx="22" cy="58" r="1.5" fill="#4caf50" />
          <circle cx="34" cy="54" r="1.5" fill="#4caf50" />
          <circle cx="46" cy="48" r="1.5" fill="#4caf50" />
          {/* Coin badge with % symbol */}
          <circle cx="58" cy="58" r="16" fill="#1b5e20" />
          {/* % sign that represents interest rate */}
          <circle cx="52" cy="52" r="3" fill="none" stroke="#a5d6a7" strokeWidth="2" />
          <circle cx="64" cy="64" r="3" fill="none" stroke="#a5d6a7" strokeWidth="2" />
          <line x1="54" y1="64" x2="62" y2="52" stroke="#a5d6a7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (icon === "resistor") {
    // Resistor with colored bands (brown-black-red-gold = 1kΩ ±5%)
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Resistor body */}
          <rect x="15" y="30" width="50" height="20" rx="3" fill="#D4A574" stroke="#8B6F47" strokeWidth="1.2" />
          {/* Lead wires */}
          <line x1="4" y1="40" x2="15" y2="40" stroke="#999" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="65" y1="40" x2="76" y2="40" stroke="#999" strokeWidth="2.5" strokeLinecap="round" />
          {/* Color bands: brown-black-red-gold (1kΩ ±5%) */}
          <rect x="22" y="30" width="5" height="20" fill="#8B4513" />
          <rect x="32" y="30" width="5" height="20" fill="#000000" />
          <rect x="42" y="30" width="5" height="20" fill="#FF0000" />
          <rect x="52" y="30" width="5" height="20" fill="#FFD700" />
          {/* Ohm symbol badge */}
          <circle cx="64" cy="60" r="14" fill="#3f51b5" />
          <text x="64" y="68" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">Ω</text>
        </svg>
      </span>
    );
  }

  if (icon === "landregister") {
    // Land register book with checkmark badge
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Large registry book */}
          <rect x="12" y="10" width="48" height="60" rx="4" fill="#f0e6d2" stroke="#8b7355" strokeWidth="1.5" />
          {/* Spine shadow */}
          <rect x="12" y="10" width="8" height="60" rx="4" fill="#c9a875" opacity="0.4" />
          {/* Horizontal lines (registry entries) */}
          <line x1="24" y1="22" x2="54" y2="22" stroke="#8b7355" strokeWidth="1" opacity="0.6" />
          <line x1="24" y1="30" x2="54" y2="30" stroke="#8b7355" strokeWidth="1" opacity="0.6" />
          <line x1="24" y1="38" x2="54" y2="38" stroke="#8b7355" strokeWidth="1" opacity="0.6" />
          <line x1="24" y1="46" x2="54" y2="46" stroke="#8b7355" strokeWidth="1" opacity="0.6" />
          <line x1="24" y1="54" x2="54" y2="54" stroke="#8b7355" strokeWidth="1" opacity="0.6" />
          {/* Vertical divider (like columns in registry) */}
          <line x1="35" y1="18" x2="35" y2="62" stroke="#8b7355" strokeWidth="1" opacity="0.5" />
          {/* Title area */}
          <rect x="22" y="12" width="34" height="6" rx="1" fill="#8b7355" opacity="0.3" />
          {/* Checkmark badge */}
          <circle cx="58" cy="58" r="16" fill="#059669" />
          <path
            d="M50 58 L55 63 L66 52"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
    );
  }

  if (icon === "yearend") {
    // Calendar with countdown clock badge
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Calendar background */}
          <rect x="10" y="14" width="50" height="56" rx="5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Calendar header */}
          <rect x="10" y="14" width="50" height="12" rx="5" fill="#3b82f6" />
          <rect x="10" y="20" width="50" height="6" fill="#3b82f6" />
          {/* Binding rings */}
          <circle cx="22" cy="14" r="3" fill="#1e40af" />
          <circle cx="48" cy="14" r="3" fill="#1e40af" />
          {/* Calendar grid */}
          <line x1="18" y1="32" x2="52" y2="32" stroke="#93c5fd" strokeWidth="0.8" />
          <line x1="18" y1="40" x2="52" y2="40" stroke="#93c5fd" strokeWidth="0.8" />
          <line x1="18" y1="48" x2="52" y2="48" stroke="#93c5fd" strokeWidth="0.8" />
          <line x1="18" y1="56" x2="52" y2="56" stroke="#93c5fd" strokeWidth="0.8" />
          <line x1="26" y1="28" x2="26" y2="64" stroke="#93c5fd" strokeWidth="0.8" />
          <line x1="34" y1="28" x2="34" y2="64" stroke="#93c5fd" strokeWidth="0.8" />
          <line x1="42" y1="28" x2="42" y2="64" stroke="#93c5fd" strokeWidth="0.8" />
          {/* Some dates marked */}
          <circle cx="22" cy="36" r="2" fill="#3b82f6" opacity="0.5" />
          <circle cx="30" cy="36" r="2" fill="#3b82f6" opacity="0.5" />
          <circle cx="38" cy="44" r="2" fill="#3b82f6" opacity="0.5" />
          <circle cx="46" cy="52" r="2" fill="#3b82f6" opacity="0.5" />
          {/* Clock/countdown badge */}
          <circle cx="58" cy="58" r="16" fill="#f59e0b" />
          <circle cx="58" cy="58" r="11" fill="none" stroke="white" strokeWidth="2" />
          {/* Clock hands pointing to year end */}
          <line x1="58" y1="58" x2="58" y2="50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="58" x2="64" y2="58" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="58" cy="58" r="1.5" fill="white" />
        </svg>
      </span>
    );
  }

  if (icon === "capacitor") {
    // Capacitor symbol with code label
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Capacitor body - two parallel plates */}
          <rect x="28" y="8" width="4" height="52" rx="1" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.2" />
          <rect x="48" y="8" width="4" height="52" rx="1" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.2" />
          
          {/* Connection wires */}
          <line x1="10" y1="34" x2="28" y2="34" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="34" x2="70" y2="34" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Electric field lines (subtle) */}
          <line x1="34" y1="15" x2="46" y2="15" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
          <line x1="34" y1="22" x2="46" y2="22" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
          <line x1="34" y1="29" x2="46" y2="29" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
          <line x1="34" y1="39" x2="46" y2="39" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
          <line x1="34" y1="46" x2="46" y2="46" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
          <line x1="34" y1="53" x2="46" y2="53" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
          
          {/* Code label badge */}
          <rect x="14" y="56" width="52" height="18" rx="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="40" y="68" fontSize="12" fontWeight="700" fill="#78350f" textAnchor="middle" fontFamily="monospace">
            104
          </text>
          
          {/* Small plus/minus symbols on plates */}
          <text x="30" y="7" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">+</text>
          <text x="50" y="7" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">−</text>
        </svg>
      </span>
    );
  }

  if (icon === "inflation") {
    // Rising chart with money and percentage symbol
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chart background */}
          <rect x="8" y="10" width="64" height="54" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
          
          {/* Chart axes */}
          <line x1="14" y1="58" x2="66" y2="58" stroke="#d97706" strokeWidth="1.5" />
          <line x1="14" y1="18" x2="14" y2="58" stroke="#d97706" strokeWidth="1.5" />
          
          {/* Rising trend line */}
          <polyline
            points="14,52 24,48 34,42 44,38 54,30 64,22"
            stroke="#dc2626"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          <circle cx="24" cy="48" r="2.5" fill="#dc2626" />
          <circle cx="34" cy="42" r="2.5" fill="#dc2626" />
          <circle cx="44" cy="38" r="2.5" fill="#dc2626" />
          <circle cx="54" cy="30" r="2.5" fill="#dc2626" />
          <circle cx="64" cy="22" r="2.5" fill="#dc2626" />
          
          {/* Upward arrow */}
          <path d="M60 22 L64 18 L68 22" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Percentage symbol badge */}
          <circle cx="58" cy="58" r="16" fill="#ef4444" />
          <text x="58" y="66" fontSize="16" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">
            %
          </text>
          <circle cx="52" cy="52" r="2" fill="white" opacity="0.7" />
          <circle cx="64" cy="64" r="2" fill="white" opacity="0.7" />
          
          {/* Coin stack (left side) */}
          <ellipse cx="20" cy="70" rx="8" ry="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <ellipse cx="20" cy="67" rx="8" ry="3" fill="#fde047" stroke="#f59e0b" strokeWidth="0.8" />
          <ellipse cx="20" cy="64" rx="8" ry="3" fill="#fef08a" stroke="#f59e0b" strokeWidth="0.8" />
        </svg>
      </span>
    );
  }

  if (icon === "ledresistor") {
    // Resistor connected to LED with light rays
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Resistor body */}
          <rect x="10" y="32" width="24" height="12" rx="2" fill="#D4A574" stroke="#8B6F47" strokeWidth="1" />
          {/* Color bands on resistor (470Ω - yellow-violet-brown) */}
          <rect x="14" y="32" width="3" height="12" fill="#FFFF00" />
          <rect x="20" y="32" width="3" height="12" fill="#8B00FF" />
          <rect x="26" y="32" width="3" height="12" fill="#8B4513" />
          
          {/* Wire from resistor to LED */}
          <line x1="34" y1="38" x2="42" y2="38" stroke="#999" strokeWidth="2" strokeLinecap="round" />
          
          {/* LED triangle (anode side) */}
          <polygon points="42,28 42,48 56,38" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
          {/* LED cathode line */}
          <line x1="56" y1="28" x2="56" y2="48" stroke="#2563eb" strokeWidth="2.5" />
          
          {/* Wire continuation */}
          <line x1="56" y1="38" x2="64" y2="38" stroke="#999" strokeWidth="2" strokeLinecap="round" />
          
          {/* Light rays emanating from LED */}
          <path d="M52 24 L54 18 L56 18" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <path d="M54 22 L57 16 L59 17" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          <path d="M52 52 L54 58 L56 58" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <path d="M54 54 L57 60 L59 59" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          
          {/* Glow effect around LED */}
          <circle cx="49" cy="38" r="12" fill="#fef3c7" opacity="0.4" />
          
          {/* Voltage badge */}
          <circle cx="58" cy="60" r="14" fill="#10b981" />
          <text x="58" y="64" fontSize="14" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">
            V
          </text>
          <text x="58" y="58" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">
            12
          </text>
        </svg>
      </span>
    );
  }

  return <span className={cls} aria-hidden="true" />;
}
