import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import DaysToYearEndCalculator from "@/components/calculators/DaysToYearEndCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/narzedzia/dni-do-konca-roku");

export const metadata: Metadata = {
  title: `${calculator?.title} - Kalkula.pl`,
  description: calculator?.description,
  keywords: calculator?.keywords.join(", "),
  alternates: {
    canonical: "https://kalkula.pl/narzedzia/dni-do-konca-roku",
  },
  openGraph: {
    title: `${calculator?.title} - Kalkula.pl`,
    description: calculator?.description,
    url: "https://kalkula.pl/narzedzia/dni-do-konca-roku",
    siteName: "Kalkula.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function DaysToYearEndPage() {
  if (!calculator) return null;
  
  const markdownContent = getCalculatorContent("narzedzia-dni-do-konca-roku");

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
      <DaysToYearEndCalculator />
    </CalculatorLayout>
  );
}
