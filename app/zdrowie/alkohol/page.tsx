import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import AlkoholCalculator from "@/components/calculators/AlkoholCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/zdrowie/alkohol");

export const metadata: Metadata = {
  title: "Kalkulator promili - stężenie alkoholu",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/zdrowie/alkohol"
  },
  openGraph: {
    title: "Kalkulator promili",
    description: calculator.seoDescription,
    url: "/zdrowie/alkohol",
    images: ["/og-image.svg"]
  }
};

export default function AlkoholPage() {
  const markdownContent = getCalculatorContent("zdrowie-alkohol");
  
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
      <AlkoholCalculator />
    </CalculatorLayout>
  );
}
