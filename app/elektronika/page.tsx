import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import PageHeader from "@/components/PageHeader";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Kalkulatory elektroniczne - kody kolorów rezystorów",
  description:
    "Kalkulatory elektroniczne online - odczytaj wartość rezystora na podstawie kodów kolorowych (4, 5 i 6 pasm). Narzędzia dla elektroników i hobbystów.",
  alternates: {
    canonical: "/elektronika"
  }
};

export default function ElektronikaPage() {
  const electronicsCalculators = CALCULATORS.filter((calc) => calc.category === "Elektronika");

  return (
    <main className="home-shell">
      <section className="home-hero-layout">
        <section className="hero hero-minimal">
          <h1>Kalkulatory elektroniczne</h1>
          <p className="helper">
            Narzędzia dla elektroników. Odczytaj wartość rezystora na podstawie kodów
            kolorowych pasm, oblicz inne parametry elektroniczne. Przydatne zarówno
            dla profesjonalistów jak i hobbystów.
          </p>
        </section>
        <PageHeader showBack={true} />
      </section>
      <section className="grid" aria-label="Lista kalkulatorów elektronicznych">
        {electronicsCalculators.map((item) => (
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
