import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import StructuredData from "@/components/StructuredData";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema, createHowToSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/finanse/kredyt");

const howToSteps = [
  {
    name: "Wprowadź kwotę kredytu",
    text: "Wpisz całkowitą kwotę kredytu, którą chcesz pożyczyć (np. 300 000 zł na mieszkanie)."
  },
  {
    name: "Podaj okres kredytowania",
    text: "Określ na ile lat chcesz zaciągnąć kredyt (np. 25 lat)."
  },
  {
    name: "Ustaw oprocentowanie",
    text: "Wprowadź roczną stopę procentową oferowaną przez bank (np. 7.5%)."
  },
  {
    name: "Sprawdź wynik",
    text: "Kalkulator automatycznie wyliczy miesięczną ratę kredytu oraz całkowity koszt."
  }
];

export const metadata: Metadata = {
  title: "Kalkulator kredytu - rata miesięczna",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/finanse/kredyt"
  },
  openGraph: {
    title: "Kalkulator kredytu",
    description: calculator.seoDescription,
    url: "/finanse/kredyt",
    images: ["/og-image.png"]
  }
};

export default function LoanPage() {
  const howToSchema = createHowToSchema(
    "Jak obliczyć ratę kredytu",
    "Przewodnik krok po kroku do obliczenia miesięcznej raty kredytu",
    howToSteps
  );

  return (
    <>
      <StructuredData data={howToSchema} />
      <CalculatorLayout
        title={calculator.title}
        helperText={calculator.helperText}
        seoText={calculator.seoDescription}
        icon={calculator.icon}
        currentHref={calculator.href}
        schemaData={createCalculatorSchema(calculator)}
      >
        <LoanCalculator label="kredytu" />
      </CalculatorLayout>
    </>
  );
}
