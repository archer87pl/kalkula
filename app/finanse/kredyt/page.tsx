import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/finanse/kredyt");

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
    images: ["/og-image.svg"]
  }
};

export default function LoanPage() {
  return (
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
  );
}
