import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import PageHeader from "@/components/PageHeader";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Kalkulatory prawne - PCC, taksa notarialna, księga wieczysta",
  description:
    "Kalkulatory prawne online - oblicz podatek PCC przy zakupie mieszkania lub samochodu, taksę notarialną, numer kontrolny księgi wieczystej. Szybkie i dokładne wyliczenia.",
  alternates: {
    canonical: "/prawo"
  }
};

export default function PrawoPage() {
  const legalCalculators = CALCULATORS.filter((calc) => calc.category === "Prawo");

  return (
    <main className="home-shell">
      <section className="home-hero-layout">
        <section className="hero hero-minimal">
          <h1>Kalkulatory prawne</h1>
          <p className="helper">
            Narzędzia pomocne w sprawach prawnych i urzędowych. Oblicz podatek PCC, sprawdź
            wysokość taksy notarialnej lub zweryfikuj numer księgi wieczystej. Wszystkie
            kalkulatory są zgodne z aktualnymi przepisami prawa.
          </p>
        </section>
        <PageHeader showBack={true} />
      </section>
      <section className="grid" aria-label="Lista kalkulatorów prawnych">
        {legalCalculators.map((item) => (
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
