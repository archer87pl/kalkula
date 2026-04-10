import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import PageHeader from "@/components/PageHeader";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Kalkulatory finansowe - kredyt, pożyczka, VAT, obligacje",
  description:
    "Kalkulatory finansowe online - szybko oblicz ratę kredytu, pożyczki, VAT, zysk z obligacji skarbowych. Dokładne wyliczenia w kilka sekund bez logowania.",
  alternates: {
    canonical: "/finanse"
  }
};

export default function FinansePage() {
  const financeCalculators = CALCULATORS.filter((calc) => calc.category === "Finanse");

  return (
    <main className="home-shell">
      <section className="home-hero-layout">
        <section className="hero hero-minimal">
          <h1>Kalkulatory finansowe</h1>
          <p className="helper">
            Profesjonalne narzędzia do obliczeń finansowych. Sprawdź ratę kredytu, pożyczki,
            oblicz VAT lub zysk z obligacji skarbowych. Wszystkie kalkulatory są darmowe
            i nie wymagają logowania.
          </p>
        </section>
        <PageHeader showBack={true} />
      </section>
      <section className="grid" aria-label="Lista kalkulatorów finansowych">
        {financeCalculators.map((item) => (
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
