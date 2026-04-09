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
