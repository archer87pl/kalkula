# Content SEO - Pliki Markdown dla kalkulatorów

Ten folder zawiera artykuły SEO w formacie Markdown, które są wyświetlane poniżej każdego kalkulatora.

## Jak dodać content do kalkulatora?

### 1. Utwórz plik .md

Nazwa pliku musi być w formacie: `{kategoria}-{nazwa}.md`

Przykłady:
- `finanse-inflacja.md` → dla `/finanse/inflacja`
- `prawo-pcc.md` → dla `/prawo/pcc`
- `zdrowie-bmi.md` → dla `/zdrowie/bmi`
- `elektronika-rezystor.md` → dla `/elektronika/rezystor`

### 2. Napisz content w Markdown

Możesz używać:
- **Nagłówki** - `##`, `###` (NIE używaj `#` - h1 jest zarezerwowany dla tytułu strony)
- **Listy** - numerowane i nienumerowane
- **Pogrubienie** - `**tekst**`
- **Kursywa** - `*tekst*`
- **Linki** - `[tekst](url)`
- **Cytaty** - `> cytat`
- **Tabele** - GitHub Flavored Markdown
- **Kod inline** - `` `kod` ``

Przykład:
```markdown
## Główny temat

To jest paragraf z **pogrubionym tekstem** i *kursywą*.

### Podtemat

- Element listy 1
- Element listy 2

> To jest ważna informacja w cytacie
```

### 3. Zintegruj w page.tsx

W pliku strony kalkulatora (np. `app/finanse/kredyt/page.tsx`):

```typescript
import { getCalculatorContent } from "@/lib/content";

export default function KredytPage() {
  const markdownContent = getCalculatorContent("finanse-kredyt");
  
  return (
    <CalculatorLayout
      // ... inne props
      markdownContent={markdownContent}
    >
      <KredytCalculator />
    </CalculatorLayout>
  );
}
```

## Wskazówki SEO

✅ **DOBRE praktyki:**
- Używaj nagłówków H2 i H3 hierarchicznie
- Pisz naturalnie, dla ludzi (nie tylko dla robotów)
- Dodaj konkretne przykłady i liczby
- Używaj tabel dla porównań
- Umieszczaj FAQ i definicje
- Linkuj do powiązanych treści

❌ **UNIKAJ:**
- Keyword stuffing (nadmierne powtarzanie słów kluczowych)
- Duplikowania treści z innych stron
- Zbyt krótkich artykułów (min. 300-500 słów)
- Nagłówka H1 (jest już w title kalkulatora)

## Długość contentu

- **Minimum:** 500 słów
- **Optymalne:** 800-1500 słów
- **Maksimum:** 2500 słów (dłużej = gorsze UX)

## Przykładowe pliki

Zobacz istniejące pliki jako wzór:
- `finanse-inflacja.md` - obszerny artykuł o inflacji (wzorzec)
- `finanse-kredyt.md` - poradnik o kredytach
- `prawo-pcc.md` - wyjaśnienie podatku PCC
- `zdrowie-bmi.md` - interpretacja wskaźnika BMI

## Aktualizacja treści

Pamiętaj o regularnej aktualizacji:
- Dane liczbowe (stawki, limity, progi)
- Przepisy prawne
- Przykłady i kalkulacje
- Linki (sprawdzaj czy nie są martwe)
