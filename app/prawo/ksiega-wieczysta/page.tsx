import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import LandRegisterCalculator from "@/components/calculators/LandRegisterCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/prawo/ksiega-wieczysta");

export const metadata: Metadata = {
  title: `${calculator?.title} - Kalkula.pl`,
  description: calculator?.description,
  keywords: calculator?.keywords.join(", "),
  alternates: {
    canonical: "https://kalkula.pl/prawo/ksiega-wieczysta",
  },
  openGraph: {
    title: `${calculator?.title} - Kalkula.pl`,
    description: calculator?.description,
    url: "https://kalkula.pl/prawo/ksiega-wieczysta",
    siteName: "Kalkula.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export default function LandRegisterPage() {
  if (!calculator) return null;
  
  const markdownContent = getCalculatorContent("prawo-ksiega-wieczysta");

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
      <LandRegisterCalculator />
    </CalculatorLayout>
  );
}
