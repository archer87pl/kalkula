import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import PageHeader from "@/components/PageHeader";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Kalkulatory zdrowotne - BMI, czas eliminacji alkoholu",
  description:
    "Kalkulatory zdrowotne online - sprawdź swoje BMI (wskaźnik masy ciała), oblicz czas eliminacji alkoholu z organizmu. Proste narzędzia do monitorowania zdrowia.",
  alternates: {
    canonical: "/zdrowie"
  }
};

export default function ZdrowiePage() {
  const healthCalculators = CALCULATORS.filter((calc) => calc.category === "Zdrowie");

  return (
    <main className="home-shell">
      <section className="home-hero-layout">
        <section className="hero hero-minimal">
          <h1>Kalkulatory zdrowotne</h1>
          <p className="helper">
            Narzędzia do monitorowania Twojego zdrowia. Sprawdź wskaźnik masy ciała (BMI),
            oblicz czas eliminacji alkoholu z organizmu. Proste kalkulatory oparte na
            sprawdzonych wzorach medycznych.
          </p>
        </section>
        <PageHeader showBack={true} />
      </section>
      <section className="grid" aria-label="Lista kalkulatorów zdrowotnych">
        {healthCalculators.map((item) => (
          <Link key={item.href} href={item.href} className="card">
            <div className="card-top">
              <CalculatorIcon icon={item.icon} />
              <span className="category-chip">{item.category}</span>
            </div>
            <CalculatorIllustration icon={item.icon} className="card-illustration" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="card-cta">Zobacz →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
