# Kalkula.pl

![Deploy Status](https://github.com/USERNAME/kalkula/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

Darmowe, proste kalkulatory online - bez reklam, bez zbierania danych.

## 🚀 Kalkulatory

### Prawo
- **PCC** - podatek od czynności cywilnoprawnych
- **Taksa notarialna** - koszty notariusza przy zakupie nieruchomości
- **Księga wieczysta** - cyfra kontrolna numeru KW

### Finanse
- **Kredyt** - rata i całkowity koszt kredytu
- **Pożyczka** - oblicz ratę pożyczki gotówkowej
- **VAT** - VAT brutto/netto
- **Obligacje skarbowe** - zysk z obligacji (OTS, ROR, DOR, TOS, COI, EDO, ROS, ROD)

### Zdrowie
- **BMI** - wskaźnik masy ciała
- **Alkohol** - orientacyjny czas metabolizmu alkoholu

### Elektronika
- **Rezystory** - kody barwne rezystorów (4, 5, 6 pasmowe)

### Narzędzia
- **Dni do końca roku** - ile zostało do Sylwestra

## 🛠️ Technologie

- **Next.js 14** - React framework z App Router
- **TypeScript** - type safety
- **Tailwind CSS** - stylowanie
- **Recharts** - wykresy (obligacje)
- **Vitest** - testy jednostkowe
- **Static Export** - statyczne pliki HTML/CSS/JS

## 🏃 Uruchomienie lokalnie

```bash
# Instalacja zależności
npm install

# Development server
npm run dev

# Build production
npm run build

# Testy
npm test
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## 📦 Build

Projekt używa **Static Export** Next.js - generuje czysto statyczne pliki HTML/CSS/JS bez potrzeby serwera Node.js.

```bash
npm run build
```

Pliki statyczne trafią do folderu `out/` i mogą być hostowane na dowolnym serwerze HTTP.

## 🚢 Deployment

Projekt jest automatycznie deployowany na **GitHub Pages** przy każdym push do brancha `main`.

Zobacz szczegóły w [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧪 Testy

```bash
# Uruchom testy
npm test

# Testy w trybie watch
npm run test:watch
```

## 📝 Struktura projektu

```
kalkula/
├── app/                    # Next.js App Router - strony
│   ├── finanse/           # Kalkulatory finansowe
│   ├── prawo/             # Kalkulatory prawne
│   ├── zdrowie/           # Kalkulatory zdrowotne
│   ├── elektronika/       # Kalkulatory elektroniczne
│   └── narzedzia/         # Narzędzia pomocnicze
├── components/            # Komponenty React
│   ├── calculators/       # Komponenty kalkulatorów
│   └── ...               # Wspólne komponenty UI
├── lib/                   # Logika biznesowa
│   ├── calculators.ts     # Konfiguracja kalkulatorów
│   ├── notarial-fee.ts    # Logika taksy notarialnej
│   ├── treasury-bonds.ts  # Logika obligacji
│   └── ...               # Inne moduły obliczeniowe
├── public/                # Pliki statyczne
└── tests/                 # Testy jednostkowe
```

## 🤝 Contributing

1. Fork projektu
2. Stwórz branch (`git checkout -b feature/amazing-feature`)
3. Commit zmian (`git commit -m 'Add amazing feature'`)
4. Push do brancha (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

## 📄 Licencja

MIT License - zobacz plik [LICENSE](LICENSE)

## 🔗 Linki

- **Strona:** [kalkula.pl](https://kalkula.pl)
- **Issues:** [GitHub Issues](https://github.com/USERNAME/kalkula/issues)
- **Changelog:** [GitHub Releases](https://github.com/USERNAME/kalkula/releases)

---

**Uwaga:** Zastąp `USERNAME` swoją nazwą użytkownika GitHub w badge i linkach.
