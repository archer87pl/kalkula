import type { CalculatorItem } from "@/lib/calculators";

const SITE_URL = "https://kalkula.pl";

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function createHomeSchema(calculators: CalculatorItem[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Kalkula",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 220,
          height: 92
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: "Polish"
        }
      },
      {
        "@type": "WebSite",
        name: "Kalkula",
        url: SITE_URL,
        inLanguage: "pl-PL",
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        name: "Kalkulatory online",
        itemListElement: calculators.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: absoluteUrl(item.href)
        }))
      }
    ]
  };
}

export function createCalculatorSchema(calculator: CalculatorItem) {
  const pageUrl = absoluteUrl(calculator.href);
  const categoryUrl =
    calculator.category === "Prawo"
      ? `${SITE_URL}/prawo`
      : calculator.category === "Finanse"
        ? `${SITE_URL}/finanse`
        : `${SITE_URL}/zdrowie`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: calculator.title,
        description: calculator.seoDescription,
        url: pageUrl,
        inLanguage: "pl-PL",
        isPartOf: {
          "@type": "WebSite",
          name: "Kalkula",
          url: SITE_URL
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`
        }
      },
      {
        "@type": "SoftwareApplication",
        name: calculator.title,
        applicationCategory:
          calculator.category === "Zdrowie" ? "HealthApplication" : "FinanceApplication",
        operatingSystem: "Web",
        browserRequirements: "Współczesna przeglądarka internetowa",
        url: pageUrl,
        description: calculator.seoDescription,
        inLanguage: "pl-PL",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "PLN"
        },
        featureList: [calculator.helperText, ...calculator.keywords]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: SITE_URL
          },
          {
            "@type": "ListItem",
            position: 2,
            name: calculator.category,
            item: categoryUrl
          },
          {
            "@type": "ListItem",
            position: 3,
            name: calculator.title,
            item: pageUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: calculator.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };
}

export function createHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };
}
