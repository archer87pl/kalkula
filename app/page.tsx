import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import PageHeader from "@/components/PageHeader";
import StructuredData from "@/components/StructuredData";
import { CALCULATORS } from "@/lib/calculators";
import { createHomeSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Kalkulatory online - finanse, prawo, zdrowie",
  description:
    "Statyczna strona z kalkulatorami: PCC, taksa notarialna, rata kredytu, pożyczki i BMI.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const jsonLd = createHomeSchema(CALCULATORS);

  return (
    <>
      <StructuredData data={jsonLd} />
      <PageHeader showBack={false} />
      <main className="home-shell">
        <section className="hero">
          <p className="hero-eyebrow">KALKULA 2026</p>
          <h1>Praktyczne kalkulatory online</h1>
          <p className="helper">
            Kalkula to serwis z różnymi kalkulatorami online, które pomagają szybko policzyć
            najważniejsze wartości z obszaru finansów, prawa i zdrowia. W jednym miejscu
            znajdziesz narzędzia do obliczenia raty kredytu lub pożyczki, podatku PCC,
            taksy notarialnej oraz wskaźnika BMI.
          </p>
        </section>
        <section className="grid" aria-label="Lista kalkulatorów">
          {CALCULATORS.map((item) => (
            <Link key={item.href} href={item.href} className="card">
              <div className="card-top">
                <CalculatorIcon icon={item.icon} />
                <span className="category-chip">{item.category}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="card-cta">Zobacz →</span>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
