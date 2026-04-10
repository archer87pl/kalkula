import type { CalculatorIconKey } from "@/lib/calculators";

type CalculatorIconProps = {
  icon: CalculatorIconKey;
  className?: string;
};

export default function CalculatorIcon({ icon, className = "" }: CalculatorIconProps) {
  const sharedProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  if (icon === "pcc") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h10" />
          <path d="M16 15l4 3-4 3" />
        </svg>
      </span>
    );
  }

  if (icon === "notarial") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <path d="M5 4h14v16H5z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      </span>
    );
  }

  if (icon === "loan") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <path d="M3 12h18" />
          <path d="M7 8h10" />
          <path d="M7 16h10" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>
    );
  }

  if (icon === "cash") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M7 12h.01" />
          <path d="M17 12h.01" />
        </svg>
      </span>
    );
  }

  if (icon === "vat") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 12h8" />
          <path d="M8 8h4" />
          <path d="M12 16h4" />
          <path d="M15 9l-6 6" />
        </svg>
      </span>
    );
  }

  if (icon === "alcohol") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <path d="M8 3h8l1 7H7L8 3z" />
          <path d="M7 10c0 5 2 8 5 8s5-3 5-8" />
          <path d="M9 14h6" />
        </svg>
      </span>
    );
  }

  if (icon === "bmi") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <circle cx="12" cy="7" r="3" />
          <path d="M8 14c0-2 1.5-4 4-4s4 2 4 4v6H8z" />
          <path d="M6 18h12" />
        </svg>
      </span>
    );
  }

  if (icon === "bonds") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 9h16" />
          <path d="M7 13h10" />
          <path d="M7 16l3-2 3 2 3-2" />
        </svg>
      </span>
    );
  }

  if (icon === "resistor") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <line x1="3" y1="12" x2="7" y2="12" />
          <rect x="7" y="8" width="10" height="8" rx="1" />
          <line x1="17" y1="12" x2="21" y2="12" />
          <line x1="9" y1="8" x2="9" y2="16" strokeWidth="1.2" />
          <line x1="12" y1="8" x2="12" y2="16" strokeWidth="1.2" />
          <line x1="15" y1="8" x2="15" y2="16" strokeWidth="1.2" />
        </svg>
      </span>
    );
  }

  if (icon === "landregister") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M5 8h14" />
          <path d="M5 13h14" />
          <path d="M13 18l2 2 3-3" />
        </svg>
      </span>
    );
  }

  if (icon === "yearend") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M8 4v2" />
          <path d="M16 4v2" />
          <circle cx="12" cy="15" r="3" />
          <path d="M12 13v2l1.5 1.5" />
        </svg>
      </span>
    );
  }

  if (icon === "capacitor") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <line x1="6" y1="4" x2="6" y2="20" strokeWidth="2.5" />
          <line x1="18" y1="4" x2="18" y2="20" strokeWidth="2.5" />
          <line x1="3" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="21" y2="12" />
          <path d="M10 7v10" strokeWidth="1.2" opacity="0.4" />
          <path d="M14 7v10" strokeWidth="1.2" opacity="0.4" />
        </svg>
      </span>
    );
  }

  if (icon === "ledresistor") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          {/* Rezystor */}
          <rect x="3" y="10" width="7" height="4" rx="0.5" />
          <line x1="10" y1="12" x2="12" y2="12" />
          {/* LED - trójkąt + kreska */}
          <polygon points="12,8 12,16 18,12" fill="none" />
          <line x1="18" y1="8" x2="18" y2="16" strokeWidth="2" />
          {/* Promienie świetlne */}
          <path d="M16 7l1-2 1 0" strokeWidth="1.5" opacity="0.6" />
          <path d="M17 6l1.5-1.5 0.5 0.5" strokeWidth="1.5" opacity="0.6" />
          {/* Przewód */}
          <line x1="18" y1="12" x2="21" y2="12" />
        </svg>
      </span>
    );
  }

  if (icon === "inflation") {
    return (
      <span className={`calc-icon ${className}`.trim()}>
        <svg {...sharedProps}>
          <polyline points="3 17 9 11 13 15 21 7" />
          <polyline points="16 7 21 7 21 12" />
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="13" cy="15" r="1.5" fill="currentColor" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`calc-icon ${className}`.trim()}>
      <svg {...sharedProps}>
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
        <path d="M8.5 12.5h7" />
        <path d="M10 9.5h4" />
      </svg>
    </span>
  );
}
