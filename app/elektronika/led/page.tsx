import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import LedResistorCalculator from "@/components/calculators/LedResistorCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/elektronika/led");

export const metadata: Metadata = {
  title: `${calculator?.title} - Kalkula.pl`,
  description: calculator?.description,
  keywords: calculator?.keywords.join(", "),
  alternates: {
    canonical: "https://kalkula.pl/elektronika/led",
  },
  openGraph: {
    title: `${calculator?.title} - Kalkula.pl`,
    description: calculator?.description,
    url: "https://kalkula.pl/elektronika/led",
    siteName: "Kalkula.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function LedResistorPage() {
  if (!calculator) return null;
  
  const markdownContent = getCalculatorContent("elektronika-led");

  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
      markdownContent={markdownContent}
    >
      <LedResistorCalculator />
    </CalculatorLayout>
  );
}
