import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import ResistorColorCodeCalculator from "@/components/calculators/ResistorColorCodeCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/elektronika/rezystor");

export const metadata: Metadata = {
  title: `${calculator?.title} - Kalkula.pl`,
  description: calculator?.description,
  keywords: calculator?.keywords.join(", "),
  alternates: {
    canonical: "https://kalkula.pl/elektronika/rezystor",
  },
  openGraph: {
    title: `${calculator?.title} - Kalkula.pl`,
    description: calculator?.description,
    url: "https://kalkula.pl/elektronika/rezystor",
    siteName: "Kalkula.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function ResistorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
    >
      <ResistorColorCodeCalculator />
    </CalculatorLayout>
  );
}
