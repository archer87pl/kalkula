import Link from "next/link";
import CalculatorIcon from "@/components/CalculatorIcon";
import { CALCULATORS } from "@/lib/calculators";

type CalculatorNavProps = {
  currentHref?: string;
};

export default function CalculatorNav({ currentHref }: CalculatorNavProps) {
  return (
    <nav className="calculator-nav" aria-label="Nawigacja kalkulatorów">
      {CALCULATORS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`calculator-pill ${currentHref === item.href ? "active" : ""}`.trim()}
          aria-current={currentHref === item.href ? "page" : undefined}
        >
          <CalculatorIcon icon={item.icon} />
          <span>{item.shortTitle}</span>
        </Link>
      ))}
    </nav>
  );
}
