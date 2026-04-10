import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kalkula.pl"),
  title: {
    default: "Kalkula - Kalkulatory online",
    template: "%s | Kalkula"
  },
  description: "Kalkula - darmowe kalkulatory online do obliczeń finansowych, prawnych i zdrowotnych. PCC, taksa notarialna, rata kredytu i pożyczki, VAT, BMI, alkohol i więcej. Szybkie wyliczenia bez logowania.",
  applicationName: "Kalkula",
  alternates: {
    canonical: "/"
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kalkula - Kalkulatory online",
    description: "Praktyczne kalkulatory finansowe, prawne i zdrowotne w jednym miejscu.",
    url: "https://kalkula.pl",
    siteName: "Kalkula",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kalkula - kalkulatory online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkula - Kalkulatory online",
    description: "Darmowe kalkulatory finansowe, prawne i zdrowotne - PCC, taksa notarialna, kredyt, pożyczka, VAT, BMI i więcej. Szybkie obliczenia bez logowania.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={manrope.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={manrope.className}>
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
