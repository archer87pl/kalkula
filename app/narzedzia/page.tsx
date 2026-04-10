import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import PageHeader from "@/components/PageHeader";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Narzędzia online - dni do końca roku, kalendarze",
  description:
    "Przydatne narzędzia online - oblicz ile dni zostało do końca roku, ile dni roboczych i weekendowych, sprawdź postęp roczny. Darmowe kalkulatory czasu.",
  alternates: {
    canonical: "/narzedzia"
  }
};

export default function NarzedziaPage() {
  const toolsCalculators = CALCULATORS.filter((calc) => calc.category === "Narzędzia");

  return (
    <main className="home-shell">
      <section className="home-hero-layout">
        <section className="hero hero-minimal">
          <h1>Narzędzia online</h1>
          <p className="helper">
            Przydatne narzędzia do codziennego użytku. Oblicz ile dni zostało do końca roku,
            sprawdź liczbę dni roboczych i weekendowych, monitoruj postęp roczny. Proste
            i darmowe kalkulatory czasu.
          </p>
        </section>
        <PageHeader showBack={true} />
      </section>
      <section className="grid" aria-label="Lista narzędzi online">
        {toolsCalculators.map((item) => (
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
