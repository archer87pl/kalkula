## Dekoder pojemności kondensatorów - jak odczytać kod na kondensatorze

**Kondensator** to element elektroniczny przechowujący energię elektryczną w postaci pola elektrycznego. Pojemność kondensatora jest często oznaczona **kodem cyfrowym** lub literowym, który należy zrozumieć, aby poprawnie dobrać element do projektu.

### Czym jest kondensator?

Kondensator składa się z dwóch przewodników (płytek) rozdzielonych dielektrykiem (izolatorem). Gdy przylożysz napięcie, ładunek gromadzi się na płytkach.

**Podstawowe zastosowania:**
- **Filtrowanie** - wygładzanie napięcia zasilania
- **Sprzęganie AC** - przepuszczanie sygnału zmiennego, blokowanie DC
- **Timery** - obwody RC, generatory przebiegów
- **Magazynowanie energii** - zasilanie awaryjne, lampy błyskowe
- **Filtry częstotliwościowe** - crossovery audio, filtry EMI

Pojemność mierzy się w **faradach (F)**:
- 1 F = 1 farad (ogromna pojemność, rzadko używana)
- 1 mF = 0,001 F = 1000 μF (milifarad)
- 1 μF = 0,000001 F = 1 mikrofarad
- 1 nF = 0,000000001 F = 1 nanofarad
- 1 pF = 0,000000000001 F = 1 pikofarad

### System oznaczeń kondensatorów

Kondensatory używają **3 głównych systemów** oznaczeń:

**1. Kod 3-cyfrowy (kondensatory ceramiczne)**
- Format: `[Cyfra1][Cyfra2][Liczba zer]` w pikofaradach (pF)
- Przykład: `104` = 10 × 10⁴ pF = 100 000 pF = **100 nF = 0,1 μF**

**2. Zapis bezpośredni (kondensatory elektrolityczne)**
- Na korpusie bezpośrednio: `100μF`, `220μF 25V`
- Nie wymaga dekodowania

**3. Kod literowo-cyfrowy (kondensatory foliowe, tantalowe)**
- Używa litery jako mnożnika dziesiętnego
- Przykład: `n47` = 0,47 nF, `4μ7` = 4,7 μF

### Jak odczytać kod 3-cyfrowy?

**Wzór: [Cyfra1][Cyfra2] × 10^[Cyfra3] pF**

**Przykłady:**

| Kod | Obliczenie | Wynik (pF) | Wynik (nF) | Wynik (μF) |
|-----|------------|------------|------------|------------|
| **101** | 10 × 10¹ | 100 pF | 0,1 nF | 0,0001 μF |
| **102** | 10 × 10² | 1 000 pF | 1 nF | 0,001 μF |
| **103** | 10 × 10³ | 10 000 pF | 10 nF | 0,01 μF |
| **104** | 10 × 10⁴ | 100 000 pF | 100 nF | **0,1 μF** |
| **105** | 10 × 10⁵ | 1 000 000 pF | 1 000 nF | **1 μF** |
| **224** | 22 × 10⁴ | 220 000 pF | 220 nF | **0,22 μF** |
| **473** | 47 × 10³ | 47 000 pF | 47 nF | 0,047 μF |

**Wyjątek:** Jeśli kod ma literę zamiast trzeciej cyfry:
- **10n** = 10 nF
- **100n** = 100 nF = 0,1 μF
- **1μ0** = 1 μF

### Kody literowe - mnożniki

Litera zastępuje przecinek dziesiętny:

| Litera | Znaczenie | Przykład | Wynik |
|--------|-----------|----------|-------|
| **p** | pikofarad | 100p | 100 pF |
| **n** | nanofarad | 10n | 10 nF |
| **μ** lub **u** | mikrofarad | 4μ7 | 4,7 μF |
| **m** | milifarad | 10m | 10 mF = 10 000 μF |

**Uwaga:** Czasami zamiast μ używa się **u** (bo μ trudno wypisać na korpusie).

### Tolerancja pojemności

Kondensatory mają również **kod tolerancji** (litera za kodem pojemności):

| Kod | Tolerancja | Zastosowanie |
|-----|------------|--------------|
| **B** | ±0,1 pF | Precyzyjne, RF |
| **C** | ±0,25 pF | Precyzyjne |
| **D** | ±0,5 pF | Bardzo dobre |
| **F** | ±1% | Dobre audio |
| **G** | ±2% | Audio |
| **J** | ±5% | Standard |
| **K** | ±10% | Powszechne |
| **M** | ±20% | Tanie, powszechne |
| **Z** | -20% +80% | Elektrolityczne |

**Przykład:** `104K` = 100 nF ±10%

### Napięcie pracy kondensatora

**Ważne:** Zawsze sprawdź **napięcie robocze** kondensatora!

**Typowe napięcia:**
- **6.3V** - elektronika mobilna (Li-Ion powersupply)
- **10V, 16V** - zasilacze liniowe 5V, 12V
- **25V, 35V** - zasilacze impulsowe, automotive 12V
- **50V** - uniwersalne
- **100V, 250V** - audio, sprzęt sieciowy
- **400V, 630V** - zasilacze sieciowe 230V AC

**Zasada bezpieczeństwa:** Używaj kondensatora o napięciu **co najmniej 2× wyższym** niż napięcie robocze.

Przykład:
- Zasilacz 12V DC → użyj kondensatora min. **25V** (lepiej 35V)
- Zasilacz 230V AC (szczyt ~325V) → użyj **400V** lub więcej

### Rodzaje kondensatorów i ich oznaczenia

**1. Ceramiczne (ceramic)**
- Kod: 3-cyfrowy (104, 103, 224)
- Pojemności: 1 pF - 10 μF
- Napięcie: 16V - 1kV
- Zastosowanie: filtry, sprzęganie, blocking, RF
- Oznaczenie na schemacie: C101, C102, itp.

**2. Elektrolityczne (aluminiowe)**
- Ozn: Bezpośrednie (100μF, 470μF)
- Pojemności: 0,1 μF - 10 000 μF
- Napięcie: 6,3V - 450V
- **Polaryzacja:** TAK (minus oznaczony paskiem)
- Zastosowanie: zasilacze, filtry niskoczęstotliwościowe

**3. Tantalowe**
- Ozn: Kod literowy lub bezpośredni
- Pojemności: 0,1 μF - 1 000 μF
- Napięcie: 2,5V - 50V
- **Polaryzacja:** TAK (plus oznaczony paskiem/kropką)
- Zastosowanie: zasilanie układów cyfrowych (niskie ESR)

**4. Foliowe (polyester, polypropylene)**
- Ozn: Kod literowy lub bezpośredni
- Pojemności: 1 nF - 100 μF
- Napięcie: 63V - 1500V
- Zastosowanie: audio, filtry, crossovery, zasilacze

**5. Superkondensatory (supercaps, ultracaps)**
- Ozn: Bezpośrednie (1F, 10F, 100F)
- Pojemności: 0,1 F - 3000 F
- Napięcie: 2,5V - 5V
- Zastosowanie: magazynowanie energii, backup

### Jak odczytać kondensator SMD?

**Format podobny do rezystorów:**

**3-cyfrowy (pikofarady):**
- `104` = 10 × 10⁴ pF = **100 nF**
- `106` = 10 × 10⁶ pF = **10 μF**

**Literowy (wprost):**
- `10μ` = 10 μF
- `100n` = 100 nF = 0,1 μF

**Kolor korpusu (czasem):**
- Żółty/pomarańczowy = tantalowe
- Brązowy/szary = ceramiczne
- Czarny/niebieski = elektrolityczne (rzadko SMD)

### Połączenia kondensatorów

**Równoległe (obok siebie):**
```
C_total = C1 + C2 + C3 + ...
```

Przykład: 100μF + 10μF + 1μF = **111μF**

**Szeregowe (jeden za drugim):**
```
1/C_total = 1/C1 + 1/C2 + 1/C3 + ...
```

Przykład: 100μF szeregowo 100μF
- 1/C = 1/100 + 1/100 = 2/100
- C = **50μF**

**Napięcie szeregowo:** Suma (100V + 100V = 200V możliwe)

**Dla 2 kondensatorów szeregowych (uproszczony wzór):**
```
C = (C1 × C2) / (C1 + C2)
```

### Energia w kondensatorze

```
E = 0,5 × C × U²
```

Gdzie:
- **E** = energia [J]
- **C** = pojemność [F]
- **U** = napięcie [V]

**Przykład:**
- Kondensator 1000μF, naładowany do 50V
- E = 0,5 × 0,001 × 50² = **1,25 J**

**Uwaga:** Duże kondensatory mogą być **niebezpieczne** - przechowują dużo energii!

### Jak zmierzyć pojemność multimetrem?

**Kroki:**
1. **Rozładuj kondensator** (zwórka opornika 1kΩ przez 5 s)
2. Ustaw multimetr na pomiar pojemności (⎓ lub F)
3. Przyłóż sondy (polaryzacja zgodna dla elektrolitycznych!)
4. Odczytaj wartość

**Dla dużych kondensatorów:**
- Poczekaj kilka sekund (ładowanie przez multimetr)

**Kondensator uszkodzony:**
- Pojemność 0 = przerwa, uszkodzony
- Pojemność -50% nominalnej = wysuszony (elektrolityczne)
- Zwarcie = uszkodzony dielektryk

### ESR - kluczowy parametr kondensatorów

**ESR (Equivalent Series Resistance)** - rezystancja szeregowa:

- Niskie ESR (<0,1Ω) = **dobre** (tantalowe, foliowe dobre)
- Wysokie ESR (>1Ω) = **złe** (stare elektrolityczne, uszkodzone)

**Wpływ:**
- Filtry zasilania: niskie ESR zmniejsza tętnienia
- Audio: niskie ESR = lepszy dźwięk
- RF: niskie ESR = mniejsze straty

**Jak zmierzyć:**
- Specjalistyczny miernik ESR
- Lub pośrednio: impedancja AC multimetrem

### Dobór kondensatora do zastosowania

**Filtry zasilania (bulk capacitors):**
- Elektrolityczne 100μF - 4700μF
- Napięcie 2× wyższe niż zasilanie
- Niskie ESR
- + ceramiczny 100nF równolegle (filtr HF)

**Sprzęganie AC (coupling):**
- Ceramiczne lub foliowe 100nF - 10μF
- Niepolaryzowane
- Oblicz częstotliwość odcięcia: f = 1 / (2π × R × C)

**Bypassing (blokowanie HF):**
- Ceramiczne 100nF obok każdego IC
- Krótkie ścieżki do VCC i GND
- Napięcie 16V-50V wystarczy

**Timery (RC):**
- Foliowe lub ceramiczne (niski leakage)
- Tolerancja ±5% lub lepsza
- Oblicz czas: τ = R × C

### Polaryzacja - bardzo ważne!

**Kondensatory niespolaryzowane (można odwrócić):**
- ✅ Ceramiczne
- ✅ Foliowe
- ✅ Niektóre tantalowe (bipolar)

**Kondensatory spolaryzowane (NIE ODWRACAJ!):**
- ⚠️ Elektrolityczne aluminiowe (minus oznaczony paskiem)
- ⚠️ Tantalowe (plus oznaczony paskiem lub kropką)

**Co się stanie przy odwróceniu?**
- Nagrzanie
- Wyciek elektrolitu
- **Wybuch** (literalnie - bangg!)

**Zawsze sprawdzaj polaryzację na schemacie i PCB!**

### Oznaczenia na schemacie

| Symbol | Rodzaj |
|--------|--------|
| ─┤├─ | Kondensator niespolaryzowany |
| ─┤(├─ | Kondensator polaryzowany (elektrolityczny) |
| ─┤├─adj | Kondensator nastawny (trymer) |
| ─<>─<>─ | Kondensator zmienny (tuner) |

### Starzenie się kondensatorów

Kondensatory elektrolityczne **wysychają** z czasem:
- Utrata pojemności (nawet do 50%)
- Wzrost ESR
- Wzrost prądu upływu

**Oznaki:**
- Zasilacz "szumi"
- Tętnienia napięcia
- Sprzęt się przegrzewa
- Wybrzuszenia na kondensatorze

**Lata życia:**
- Tanie: 1000-2000h przy max temp (2-5 lat)
- Dobre (105°C): 5000-10000h (10-20 lat)
- Premium (low ESR): 10000h+ (20+ lat)

### Najczęstsze błędy

❌ **Montaż z odwrotną polaryzacją** - wybuch!

❌ **Za niskie napięcie** - przebicie, zniszczenie

❌ **Używanie elektrolitycznych w audio** - lepiej foliowe (niskie zniekształcenia)

❌ **Pomijanie kondensatora ceramicznego 100nF** przy IC - szumy, niestabilność

❌ **Za duża pojemność na wyjściu operacyjnych** - oscylacje (sprawdź datasheet!)

### Podsumowanie

Dekodowanie pojemności kondensatorów to podstawa elektroniki. Najważniejsze zasady:

1. **Kod 3-cyfrowy = pikofarady** (104 = 100 nF)
2. **Sprawdzaj napięcie robocze** (min. 2× zasilania)
3. **Sprawdzaj polaryzację** (elektrolityczne i tantalowe!)
4. **Dobieraj ESR do zastosowania** (zasilacze = niskie ESR)
5. **Wymieniaj stare kondensatory** (elektrolityczne w starym sprzęcie)

Praktyka i pomiary multimetrem pomogą szybko opanować ten skill!
