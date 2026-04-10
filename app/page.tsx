import Link from "next/link";
import type { Metadata } from "next";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import PageHeader from "@/components/PageHeader";
import StructuredData from "@/components/StructuredData";
import { CALCULATORS } from "@/lib/calculators";
import { createHomeSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Kalkulatory online - finanse, prawo, zdrowie",
  description:
    "Kalkula to zestaw darmowych kalkulatorów online - oblicz podatek PCC, taksę notarialną, ratę kredytu lub pożyczki, VAT, BMI i więcej. Proste narzędzia do szybkich obliczeń finansowych, prawnych i zdrowotnych bez rejestracji.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const jsonLd = createHomeSchema(CALCULATORS);

  return (
    <>
      <StructuredData data={jsonLd} />
      <main className="home-shell">
        <section className="home-hero-layout" aria-label="Wprowadzenie do serwisu Kalkula">
          <section className="hero hero-minimal hero-home">
            <h1>Kalkulatory online</h1>
            <p className="helper">
              Kalkula to serwis z różnymi kalkulatorami online, które pomagają szybko policzyć
              najważniejsze wartości z obszaru finansów, prawa i zdrowia. W jednym miejscu
              znajdziesz narzędzia do obliczenia raty kredytu lub pożyczki, podatku PCC,
              taksy notarialnej oraz wskaźnika BMI.
            </p>
          </section>
          <PageHeader showBack={false} />
        </section>
        <section className="grid" aria-label="Lista kalkulatorów">
          {CALCULATORS.map((item) => (
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
    </>
  );
}
