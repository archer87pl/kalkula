import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CalculatorIcon from "@/components/CalculatorIcon";
import CalculatorIllustration from "@/components/CalculatorIllustration";
import AutoFocusOnMobile from "@/components/AutoFocusOnMobile";
import CalculatorNav from "@/components/CalculatorNav";
import RecentCalculators from "@/components/RecentCalculators";
import StructuredData from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CALCULATORS, getCalculatorByHref, type CalculatorIconKey } from "@/lib/calculators";

type CalculatorLayoutProps = {
  title: string;
  helperText: string;
  seoText: string;
  icon: CalculatorIconKey;
  currentHref: string;
  schemaData: Record<string, unknown>;
  children: React.ReactNode;
};

export default function CalculatorLayout({
  title,
  helperText,
  seoText,
  icon,
  currentHref,
  schemaData,
  children
}: CalculatorLayoutProps) {
  const currentCalculator = getCalculatorByHref(currentHref);

  const relatedCalculators = CALCULATORS.filter((item) => item.href !== currentHref)
    .sort((a, b) => {
      if (a.category === currentCalculator.category && b.category !== currentCalculator.category) {
        return -1;
      }
      if (a.category !== currentCalculator.category && b.category === currentCalculator.category) {
        return 1;
      }
      return a.title.localeCompare(b.title, "pl");
    })
    .slice(0, 4);

  const categoryHref =
    currentCalculator.category === "Prawo" ? "/prawo" :
    currentCalculator.category === "Finanse" ? "/finanse" :
    currentCalculator.category === "Zdrowie" ? "/zdrowie" :
    currentCalculator.category === "Elektronika" ? "/elektronika" :
    "/narzedzia";

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: currentCalculator.category, href: categoryHref },
    { name: currentCalculator.shortTitle }
  ];

  return (
    <>
      <StructuredData data={schemaData} />
      <AutoFocusOnMobile targetId="calculator-focus-target" />
      <PageHeader />
      <Breadcrumbs items={breadcrumbItems} />
      <CalculatorNav currentHref={currentHref} />
      <main className="calc-box">
        <nav className="calc-anchors" aria-label="Szybkie skróty sekcji">
          <a href="#opis-seo">Opis</a>
          <a href="#faq">FAQ</a>
          <a href="#powiazane">Powiązane</a>
        </nav>

        <section className="calc-head">
          <div className="calc-head-main">
            <h1 className="calc-title">
              <CalculatorIcon icon={icon} className="calc-title-icon" />
              <span>{title}</span>
            </h1>
            <p className="helper">{helperText}</p>
          </div>
          <CalculatorIllustration icon={icon} className="calc-head-illustration" />
        </section>
        <section id="calculator-focus-target" className="calculator-focus-target" tabIndex={-1}>
          {children}
        </section>
        <section id="opis-seo" className="seo-copy" aria-label="Opis kalkulatora dla SEO">
          <h2>Jak działa ten kalkulator?</h2>
          <p>{seoText}</p>
          {relatedCalculators.length > 0 && (
            <p className="seo-copy-extra">
              Jeśli ten kalkulator był przydatny, sprawdź również:{" "}
              {relatedCalculators.slice(0, 3).map((calc, index, arr) => (
                <span key={calc.href}>
                  <Link href={calc.href} className="inline-link">
                    {calc.shortTitle}
                  </Link>
                  {index < arr.length - 1 && ", "}
                </span>
              ))}
              {relatedCalculators.length > 3 && (
                <>
                  {" i "}
                  <Link href="/" className="inline-link">
                    więcej kalkulatorów
                  </Link>
                </>
              )}
              .
            </p>
          )}
          <p className="seo-copy-extra">
            Kalkulator zawiera walidację danych wejściowych i działa lokalnie w przeglądarce.
            Dzięki temu możesz szybko porównać różne scenariusze bez przesyłania danych na serwer.
          </p>
          <div className="keyword-list" aria-label="Najważniejsze frazy tematyczne">
            {currentCalculator.keywords.map((keyword) => (
              <span key={keyword} className="keyword-pill">
                {keyword}
              </span>
            ))}
          </div>
        </section>

        <section id="faq" className="faq-block" aria-label="Najczęstsze pytania">
          <h2>Najczęstsze pytania (FAQ)</h2>
          <div className="faq-list">
            {currentCalculator.faq.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="powiazane" className="related-block" aria-label="Powiązane kalkulatory">
          <h2>Powiązane kalkulatory</h2>
          <div className="related-links">
            {relatedCalculators.map((item) => (
              <Link key={item.href} href={item.href} className="related-link-card">
                <CalculatorIcon icon={item.icon} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <RecentCalculators currentHref={currentHref} />
      </main>
      <p className="footer">
        Wyniki mają charakter poglądowy i nie stanowią porady prawnej lub medycznej.
      </p>
    </>
  );
}
