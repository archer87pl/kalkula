# Kalkulator rezystora do LED – jaki rezystor do LED 5V, 12V i innych napięć

## Czym jest rezystor ograniczający prąd dla LED?

LED (dioda elektroluminescencyjna) to półprzewodnikowy element świecący, który wymaga ograniczenia prądu do bezpiecznego poziomu. W przeciwieństwie do żarówki, LED nie ma wewnętrznego oporu ograniczającego prąd – jeśli podłączysz LED bezpośrednio do źródła napięcia (np. baterii 5V czy zasilacza 12V), przez diodę popłynie zbyt duży prąd i LED natychmiast się przepali.

Rezystor ograniczający prąd (zwany również rezystorem ochronnym lub szeregowym) to prosty i tani element, który:

- **Redukuje prąd** do wartości bezpiecznej dla LED (typowo 10-20 mA)
- **Chroni LED** przed przepięciem i przepaleniem
- **Stabilizuje pracę** diody LED przy zmiennym napięciu zasilania
- **Rozpraszarównież energię** (różnicę między napięciem zasilania a napięciem LED)

### Podstawowy wzór na obliczenie rezystora do LED

Wartość rezystora obliczamy ze wzoru wynikającego z prawa Ohma:

**R = (Vs - Vf) / If**

Gdzie:
- **R** – szukana rezystancja w omach [Ω]
- **Vs** – napięcie zasilania (np. 5V, 12V) [V]
- **Vf** – napięcie przewodzenia LED (forward voltage) [V]
- **If** – prąd LED (forward current), zazwyczaj 0.02 A (20 mA)

**Moc rozpraszana na rezystorze:**

P = (Vs - Vf) × If

Gdzie **P** to moc w watach [W]. Rezystor musi mieć moc co najmniej 2-krotnie wyższą niż obliczona (margines bezpieczeństwa).

## Jaki rezystor do LED 5V? (Arduino, USB, Raspberry Pi)

Zasilanie 5V to najczęściej spotykane napięcie w elektronice hobbyistycznej – Arduino, Raspberry Pi, porty USB, powerbanki, ładowarki telefonów. Oto wartości rezystorów dla popularnych LED przy 5V:

### Tabela rezystorów dla LED 5V

| Kolor LED | Napięcie Vf | Prąd 20mA | Obliczony R | Standardowy R | Moc |
|-----------|-------------|-----------|-------------|---------------|-----|
| Czerwona | 2.0 V | 20 mA | 150 Ω | **220 Ω** | 1/4 W |
| Żółta | 2.1 V | 20 mA | 145 Ω | **220 Ω** | 1/4 W |
| Zielona | 2.5 V | 20 mA | 125 Ω | **150 Ω** | 1/4 W |
| Niebieska | 3.2 V | 20 mA | 90 Ω | **100 Ω** | 1/4 W |
| Biała | 3.3 V | 20 mA | 85 Ω | **100 Ω** | 1/4 W |

**Praktyczne przykłady:**

- **Arduino + czerwona LED:** Użyj rezystora 220 Ω (częsty w zestawach startowych)
- **USB + biała LED:** Rezystor 100 Ω lub 150 Ω zapewni jasne światło
- **Raspberry Pi GPIO (3.3V!):** Uwaga – GPIO Raspberry Pi daje 3.3V, nie 5V! Dla czerwonej LED użyj 68 Ω lub 100 Ω.

### Przykład obliczenia dla LED 5V

**Dane:** Czerwona LED, napięcie zasilania 5V, żądany prąd 20 mA (0.02 A), napięcie LED Vf = 2.0 V

**Obliczenie rezystancji:**
- R = (5V - 2.0V) / 0.02A = 3V / 0.02A = **150 Ω**

**Dobór standardowej wartości:** Najbliższa wartość z szeregu E12 to **150 Ω** lub bezpieczniejsze **220 Ω**.

**Moc rezystora:**
- P = (5V - 2.0V) × 0.02A = 3V × 0.02A = **0.06 W**
- Zalecana moc: **0.125 W (1/8 W)** lub **0.25 W (1/4 W)** – standardowe małe rezystory

## Jaki rezystor do LED 12V? (Zasilacze, instalacje samochodowe)

Napięcie 12V to standard w:
- Instalacjach samochodowych (akumulator 12V)
- Zasilaczach LED
- Systemach niskonapięciowych w mieszkaniach i ogrodach
- Strip LED (taśmy LED) 12V

Przy napięciu 12V **bardzo ważne jest dobranie odpowiedniej mocy rezystora** – większa różnica napięć oznacza więcej energii rozproszonej na rezystorze.

### Tabela rezystorów dla LED 12V

| Kolor LED | Napięcie Vf | Prąd 20mA | Obliczony R | Standardowy R | Moc |
|-----------|-------------|-----------|-------------|---------------|-----|
| Czerwona | 2.0 V | 20 mA | 500 Ω | **560 Ω** | **1/2 W** |
| Żółta | 2.1 V | 20 mA | 495 Ω | **560 Ω** | **1/2 W** |
| Zielona | 2.5 V | 20 mA | 475 Ω | **470 Ω** | **1/2 W** |
| Niebieska | 3.2 V | 20 mA | 440 Ω | **470 Ω** | **1/2 W** |
| Biała | 3.3 V | 20 mA | 435 Ω | **470 Ω** | **1/2 W** |

**Uwaga:** Przy 12V małe rezystory 1/4 W mogą się przegrzewać! Zalecane są rezystory **0.5 W (1/2 W)** lub większe.

### Przykład obliczenia dla LED 12V

**Dane:** Biała LED, napięcie zasilania 12V, prąd 20 mA, Vf = 3.3 V

**Obliczenie rezystancji:**
- R = (12V - 3.3V) / 0.02A = 8.7V / 0.02A = **435 Ω**
- Standardowa wartość: **470 Ω**

**Moc rezystora:**
- P = 8.7V × 0.02A = **0.174 W**
- Zalecana moc: **0.5 W (1/2 W)** – nie używaj 1/4 W, bo się przegrzeje!

**Schemat podłączenia LED 12V:**

```
(+12V) ──[Rezystor 470Ω 0.5W]──>|─── (GND)
                               LED
```

**Długa nóżka LED (anoda) do rezystora, krótka (katoda) do masy (-).**

## LED 3V – jaki rezystor? (Baterie, zasilacze 3V)

Napięcie 3V to typowe dla:
- Baterii litowych CR2032 (3.0V)
- Dwóch baterii AA/AAA połączonych szeregowo (2 × 1.5V = 3V)
- Niektórych zasilaczy stabilizowanych

Przy napięciu 3V **wybór LED jest kluczowy** – niektóre LED (zwłaszcza niebieskie i białe) mają napięcie przewodzenia Vf ≈ 3.2-3.5V, co oznacza, że przy 3V **nie zaświecą w ogóle** lub będą bardzo ciemne.

### Tabela rezystorów dla LED 3V

| Kolor LED | Napięcie Vf | Prąd 20mA | Obliczony R | Standardowy R | Uwagi |
|-----------|-------------|-----------|-------------|---------------|-------|
| Czerwona | 2.0 V | 20 mA | 50 Ω | **47 Ω** lub **68 Ω** | ✅ Działa dobrze |
| Żółta | 2.1 V | 20 mA | 45 Ω | **47 Ω** | ✅ Działa dobrze |
| Zielona | 2.5 V | 15 mA | 33 Ω | **33 Ω** | ✅ Niższy prąd |
| Niebieska | 3.2 V | – | – | **Nie zadziała** | ❌ Vf > Vs |
| Biała | 3.3 V | – | – | **Nie zadziała** | ❌ Vf > Vs |

**Praktyczne wskazówki:**
- Przy 3V używaj **czerwonych, żółtych lub zielonych** LED
- Dla niebieskich/białych LED potrzebujesz minimum **3.5-4V**
- Baterie rozładowują się (spadek napięcia do ~2.5V) – rezystor 33-47 Ω zapewni stabilność

### Przykład: Czerwona LED z baterią 3V (dwie baterie AA)

**Obliczenie:**
- R = (3V - 2.0V) / 0.02A = 1V / 0.02A = **50 Ω**
- Standardowa wartość: **47 Ω** lub **68 Ω**

**Moc:** P = 1V × 0.02A = 0.02 W – wystarczy rezystor **1/8 W**

## Oblicz rezystor do taśmy LED 12V

Taśmy LED 12V to popularne rozwiązanie do oświetlenia dekoracyjnego, podświetlania mebli, schodów, akwariów. Większość gotowych taśm LED 12V **ma już wbudowane rezystory** – każdy segment (zazwyczaj 3 LED + 1 rezystor) można ciąć i zasilać osobno.

### Jak działa taśma LED?

Standardowa taśma LED 12V składa się z powtarzających się segmentów:

**Segment taśmy LED 12V:**
```
(+12V) ──[R]──>|──>|──>|──── (GND)
            LED LED LED
```

Trzy LED połączone **szeregowo** (napięcia się sumują: 3× Vf) + rezystor ograniczający prąd.

### Obliczenie rezystora do segmentu taśmy LED

**Dane:** 3× biała LED (Vf = 3.2V każda), 12V zasilanie, prąd 20 mA

**Napięcie na trzech LED:**
- Vf_total = 3 × 3.2V = 9.6V

**Rezystancja:**
- R = (12V - 9.6V) / 0.02A = 2.4V / 0.02A = **120 Ω**
- Standardowa wartość: **120 Ω** lub **150 Ω**

**Moc:**
- P = 2.4V × 0.02A = 0.048 W – wystarczy **1/8 W**

### Co jeśli budujesz własną taśmę LED?

Jeśli projektujesz własną instalację LED 12V:

1. **Połączenie szeregowe (preferowane):** 3-4 LED + rezystor na każdy segment
2. **Połączenie równoległe:** Każda LED **musi mieć własny rezystor**!

**Błąd:** ❌ Nie łącz wielu LED równolegle przez jeden rezystor – LED różnią się napięciem Vf, jeden będzie pobierał więcej prądu i się przepali.

**Poprawnie:**
```
        ┌──[470Ω]──>|─── (GND)
        │          LED1
(+12V)──┼──[470Ω]──>|─── (GND)
        │          LED2
        └──[470Ω]──>|─── (GND)
                   LED3
```

## Jak podłączyć LED 12V? Schemat i polaryzacja

### Schemat podstawowy: LED + rezystor + zasilacz 12V

```
         Rezystor       LED (anoda→katoda)
(+12V) ───[470Ω]───────>|──────── (GND/-)
          0.5W        Długa  Krótka
                      nóżka  nóżka
```

### Polaryzacja LED – jak rozpoznać + i -?

LED to **dioda** – przewodzi prąd tylko w jednym kierunku. Podłączenie odwrotne nie uszkodzi LED, ale po prostu nie zaświeci.

**Jak rozpoznać polaryzację?**

| Cecha | Anoda (+) | Katoda (-) |
|-------|-----------|------------|
| Długość nóżki | **Dłuższa** | Krótsza |
| Kształt obudowy | Zaokrąglona | **Ścięta** (płaska) |
| Wnętrze LED | Mniejsza płytka | Większa płytka |

**Poprawne połączenie:**
- **Plus zasilania** → Rezystor → **Anoda (+)** LED
- **Katoda (-)** LED → **Minus zasilania (GND)**

**Uwaga:** Rezystor może być przed lub za LED – efekt ten sam (prąd w szeregu jest stały).

### Kilka LED na jednym zasilaczu 12V

**Wariant 1: Połączenie równoległe (każda LED ma swój rezystor)**

```
        ┌──[470Ω]──>|─── (GND)
        │          LED
(+12V)──┼──[470Ω]──>|─── (GND)
        │          LED
        └──[470Ω]──>|─── (GND)
                   LED
```

Prąd całkowity: 3 × 20mA = 60 mA

**Wariant 2: Połączenie szeregowe (jeden rezystor, napięcia się sumują)**

```
(+12V) ──[120Ω]──>|──>|──>|──── (GND)
                 LED LED LED
```

Napięcie na LED: 3 × 3.2V = 9.6V, rezystor: 120 Ω dla 20 mA. **Uwaga:** To działa tylko dla 3 LED przy 12V – dla 4 białych LED (4 × 3.2V = 12.8V) zabraknie napięcia!

## Dobór rezystora LED – tabela dla popularnych napięć

Poniżej **kompletna tabela** rezystorów dla najpopularniejszych napięć i kolorów LED (prąd 20 mA):

### Czerwona LED (Vf = 2.0V, 20 mA)

| Napięcie | Rezystor | Moc | Przykładowe zastosowanie |
|----------|----------|-----|--------------------------|
| 3V | 47 Ω | 1/8 W | Baterie 2×AA |
| 3.3V | 68 Ω | 1/8 W | ESP32, GPIO 3.3V |
| 5V | 150 Ω | 1/4 W | Arduino, USB |
| 9V | 330 Ω | 1/4 W | Bateria 9V |
| 12V | 560 Ω | **1/2 W** | Samochód, zasilacz 12V |
| 24V | 1.2 kΩ | **1 W** | Instalacje przemysłowe |

### Zielona LED (Vf = 2.5V, 20 mA)

| Napięcie | Rezystor | Moc | Przykładowe zastosowanie |
|----------|----------|-----|--------------------------|
| 3V | 27 Ω | 1/8 W | Niewielka rezerwa napięcia |
| 5V | 120 Ω | 1/4 W | Arduino |
| 12V | 470 Ω | **1/2 W** | Taśmy LED |
| 24V | 1.1 kΩ | **1 W** | Oświetlenie zewnętrzne |

### Niebieska / Biała LED (Vf = 3.2-3.3V, 20 mA)

| Napięcie | Rezystor | Moc | Przykładowe zastosowanie |
|----------|----------|-----|--------------------------|
| 3V | **Nie działa** | – | Za niskie napięcie! |
| 3.3V | **Nie zalecane** | – | Ledwo świeci lub w ogóle |
| 5V | 100 Ω | 1/4 W | Arduino, USB |
| 12V | 470 Ω | **1/2 W** | Samochód, zasilacze |
| 24V | 1 kΩ | **1 W** | Oświetlenie mocowe |

## Rezystor do LED – kalkulator online

Powyższe tabele to gotowe wartości, ale w praktyce możesz potrzebować obliczyć rezystor dla:

- Niestandardowych napięć (np. 6V, 7.2V, 18V)
- LED o nietypowym Vf (np. LED mocy 1W, podczerwone, ultrafioletowe)
- Innego prądu niż 20 mA (np. 10 mA dla cichszego świecenia, 30 mA dla większej jasności)
- Połączeń szeregowych kilku LED

**Nasz kalkulator rezystora do LED** działa online, w przeglądarce – wystarczy wpisać:

1. **Napięcie zasilania** (3V, 5V, 12V, 24V lub własne)
2. **Kolor LED** (automatyczny dobór Vf) lub własne napięcie LED
3. **Prąd LED** (typowo 10-20 mA)

Kalkulator natychmiast wyliczy:

✅ **Optymalną rezystancję** (np. 470.5 Ω)  
✅ **Najbliższą wartość standardową** z szeregu E12 (np. 470 Ω)  
✅ **Moc rezystora** (np. 0.25W – użyj 1/2 W dla bezpieczeństwa)  
✅ **Rzeczywisty prąd** przy użyciu standardowego rezystora  
✅ **Schemat połączenia** – gotowy do użycia

## Szereg E12, E24 – standardowe wartości rezystorów

Rezystory nie są produkowane w dowolnych wartościach – istnieją **serie preferowane** (E6, E12, E24, E96), które pokrywają zakres dekad z określonym krokiem.

### Szereg E12 (tolerancja ±10%, najpopularniejszy)

**Wartości podstawowe w jednej dekadzie:**

10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82

**Przykłady dla różnych dekad:**

- 1-10 Ω: **1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2**
- 10-100 Ω: 10, 12, 15, 18, **22**, **27**, **33**, **39**, **47**, **56**, **68**, **82**
- 100-1000 Ω: **100**, **120**, **150**, **180**, **220**, **270**, **330**, **390**, **470**, **560**, **680**, **820**
- 1-10 kΩ: **1.0k**, **1.2k**, **1.5k**, **1.8k**, **2.2k**, **2.7k**, **3.3k**, **3.9k**, **4.7k**, **5.6k**, **6.8k**, **8.2k**

### Jak dobrać wartość, jeśli obliczona wartość nie jest standardowa?

**Zasada:** Wybierz **najbliższą wyższą** wartość z szeregu E12.

**Przykład:**  
Obliczony rezystor: **345 Ω**  
Najbliższe wartości E12: 330 Ω, **390 Ω**  
**Wybierz: 390 Ω** (LED będzie świecił odrobinę słabiej, ale bezpiecznie)

**Dlaczego wyższą, a nie niższą?**  
Niższy rezystor (330 Ω) przepuści większy prąd – LED może się przegrzać i szybciej zużyć. Wyższy rezystor (390 Ω) zmniejszy prąd – LED świeci odrobinę słabiej, ale jest bezpieczny.

## Moc rezystora – kiedy 1/4W, a kiedy 1/2W lub 1W?

Rezystor rozpraszając energię nagrzewa się. Jeśli przekroczysz dopuszczalną moc, rezystor może:

- Się przegrzać i zmienić wartość rezystancji
- Stopić lutowie, odpaść z płytki PCB
- W ekstremalnych przypadkach – zapalić się

### Typowe moce rezystorów

| Moc nominalna | Typowy rozmiar | Zastosowanie |
|---------------|----------------|--------------|
| 1/8 W (0.125 W) | Bardzo mały SMD | Układy niskoprądowe, LED 3V |
| **1/4 W (0.25 W)** | Mały, THT | **Najczęstszy – LED 5V, Arduino** |
| **1/2 W (0.5 W)** | Średni | **LED 12V, większe prądy** |
| 1 W | Duży, cylindryczny | LED 24V, obwody mocy |
| 2 W | Większy | Zastosowania specjalne |
| 5-10 W | Rezystory drutowe | Obciążenia mocy, automotive |

### Jak obliczyć moc rezystora?

**Wzór:** P = (Vs - Vf) × If

**Zasada bezpieczeństwa:** Użyj rezystora o mocy **co najmniej 2× większej** niż obliczona.

**Przykłady:**

| Napięcie | LED Vf | Prąd | Spadek U na R | Moc obliczona | Moc rezystora |
|----------|--------|------|---------------|---------------|---------------|
| 5V | 2.0V | 20 mA | 3V | 0.06 W | **1/4 W** |
| 12V | 3.3V | 20 mA | 8.7V | 0.174 W | **1/2 W** ✅ |
| 12V | 3.3V | 20 mA | 8.7V | 0.174 W | ❌ 1/4 W – za mało! |
| 24V | 3.3V | 30 mA | 20.7V | 0.621 W | **1 W** lub **2 W** |

**Praktyczna wskazówka:**
- **5V lub mniej:** 1/4 W zazwyczaj wystarcza
- **9-12V:** Używaj **1/2 W** (bezpieczniej)
- **24V:** Minimum **1 W**

## Najczęstsze błędy przy podłączaniu LED z rezystorem

### 1. Brak rezystora – LED przepala się

**Błąd:** Podłączenie LED bezpośrednio do baterii/zasilacza
```
❌ (+5V) ──>|─── (GND)
          LED (przepalona!)
```

**Skutek:** LED świeci bardzo jasno przez ułamek sekundy i gaśnie na zawsze.

**Rozwiązanie:** Zawsze używaj rezystora!

### 2. Zbyt mały rezystor – LED się przegrzewa

**Błąd:** Rezystor 10 Ω dla 12V i białej LED (zamiast 470 Ω)

**Skutek:**
- Prąd: (12V - 3.3V) / 10Ω = **870 mA** (43× za dużo!)
- LED świeci bardzo jasno, ale bardzo gorąco
- LED degraduje się szybko (tydzień zamiast 50 000 godzin)

### 3. Odwrotna polaryzacja

**Błąd:** Anoda LED do minusa, katoda do plusa
```
❌ (+) ──[R]──<|── (-)
            LED odwrotnie
```

**Skutek:** LED nie świeci, ale też się nie psuje (dioda nie przewodzi wstecz).

**Rozwiązanie:** Sprawdź nóżki LED – dłuższa to anoda (+).

### 4. Rezystor o za małej mocy

**Błąd:** Rezystor 560 Ω 1/4 W przy 12V (wymagana moc 0.17 W → bezpieczna 1/2 W)

**Skutek:**
- Rezystor mocno się grzeje
- Po pewnym czasie może zmienić wartość lub stopić lutowie

**Rozwiązanie:** Sprawdź moc i użyj większego fizycznie rezystora.

### 5. Jedno rezystor dla wielu LED równolegle

**Błąd:**
```
          ┌──>|── (GND)
          │  LED1
(+12V)──[R]──>|── (GND)
          │  LED2
          └──>|── (GND)
             LED3
```

**Problem:**
- LED mają różne napięcia Vf (tolerancje produkcyjne)
- LED z niższym Vf pobiera więcej prądu i szybciej się przepala
- Po przepaleniu jednej LED, pozostałe dostaną więcej prądu i też się spalą (efekt domina)

**Rozwiązanie:** Każda LED = osobny rezystor!

## LED mocy (1W, 3W, 10W) – jak obliczyć rezystor?

LED małej mocy (5mm, 3mm, SMD 3528/5050) to 10-30 mA. Ale istnieją **LED mocy** – 1W, 3W, 5W, 10W, stosowane do oświetlenia pomieszczeń, lamp rowerowych, projektorów.

### Różnice w stosunku do małych LED

| Parametr | LED 5mm (standardowa) | LED mocy 1W | LED mocy 10W |
|----------|----------------------|-------------|--------------|
| Prąd | 10-20 mA | **350 mA** | **1000-3000 mA** |
| Napięcie Vf | 2-3.5 V | 3.0-3.5 V | 9-12 V (3 diody wewnątrz) |
| Moc | 0.02-0.06 W | **1 W** | **10-30 W** |
| Radiator | Nie potrzebny | **Konieczny** | **Większy radiator + wentylator** |
| Zasilanie | Rezystor | **Stabilizator prądu** | **Zasilacz LED, driver CC** |

### Czy można użyć rezystora do LED mocy?

**Krótka odpowiedź:** Technicznie tak, ale **nie powinno się** – marnujesz dużo energii i ryzykujesz niestabilną pracę.

**Przykład:** LED 1W (Vf = 3.3V, If = 350 mA), zasilanie 12V

**Rezystor:**
- R = (12V - 3.3V) / 0.35A = **25 Ω**
- Moc na rezystorze: P = 8.7V× 0.35A = **3 W** (!!!)

**Problem:**
- Rezystor rozpraszza **3W** ciepła (więcej niż sam LED!)
- Sprawność: 1W / 4W = **25%** (marnotrawstwo energii)
- Napięcie baterii/zasilacza zmienia się → prąd LED niestabilny

**Lepsze rozwiązanie:** Użyj **sterownika LED (LED driver)** – układu stabilizującego prąd (np. LM317 w trybie CC, dedykowane chipy CC jak AL8807, PT4115). Sprawność ~85-95%.

## Napięcie przewodzenia LED (Vf) – tabela dla różnych kolorów

Napięcie przewodzenia (forward voltage, Vf) to spadek napięcia na LED podczas pracy. Zależy od **koloru** (długości fali, materiału półprzewodnika):

| Kolor LED | Długość fali | Materiał | Vf typowe | Vf zakres |
|-----------|--------------|----------|-----------|-----------|
| **Podczerwona (IR)** | 850-940 nm | GaAs | 1.5 V | 1.2-1.8 V |
| **Czerwona** | 620-630 nm | AlGaInP | 2.0 V | 1.8-2.2 V |
| **Pomarańczowa** | 605-620 nm | AlGaInP | 2.1 V | 2.0-2.2 V |
| **Żółta** | 585-595 nm | AlGaInP | 2.1 V | 2.0-2.2 V |
| **Zielona (żółto-zielona)** | 560-570 nm | GaP | 2.2 V | 2.0-2.4 V |
| **Zielona (czysta)** | 520-530 nm | InGaN | 2.5 V | 2.0-3.0 V |
| **Niebieska** | 460-470 nm | InGaN/GaN | 3.2 V | 3.0-3.5 V |
| **Biała** | Niebieski + fosfor | InGaN + YAG | 3.3 V | 3.0-3.6 V |
| **Ultrafioletowa (UV)** | 365-405 nm | InGaN/AlGaN | 3.5 V | 3.0-4.0 V |

**Uwagi:**

- **Biała LED** to w rzeczywistości **niebieska LED + luminofor** (fosfor żółty Y3Al5O12:Ce), dlatego Vf jest podobne do niebieskiej
- **LED RGB** to 3 osobne diody (czerwona ~2V, zielona ~2.5V, niebieska ~3.2V) – każda potrzebuje osobnego rezystora!
- Im krótsza długość fali (bliżej ultrafioletu), tym wyższe Vf

## Typowe prądy dla LED – 10mA, 20mA, 30mA?

Większość małych LED (3mm, 5mm, THT) ma **maksymalny prąd ciągły 20-30 mA**. Ale można je zasilać mniejszym prądem – będą świecić słabiej, ale żyją dłużej.

### Tabela zależności prądu od jasności

| Prąd | Jasność względna | Żywotność | Zastosowanie |
|------|------------------|-----------|--------------|
| 5 mA | ~30% | Bardzo długa (100 000 h) | Diody wskaźnikowe (ON/OFF) |
| 10 mA | ~50% | Długa | Podświetlenie przycisków |
| **20 mA** | **100%** (nominał) | **50 000 h** | **Typowe zastosowania** |
| 30 mA | ~120% | Krótsza (~20 000 h) | Maksimum dla standardowych LED |
| >30 mA | – | Bardzo krótka | ❌ Przegrzanie, degradacja |

**Praktyczna wskazówka:**

- Jeśli nie potrzebujesz max. jasności, ustaw prąd **15 mA** – LED będzie świecić długo i oszczędnie
- Dla projektów battery-powered (bateria guzikowa) używaj **5-10 mA** – LED świeci miesiącami

## Połączenie szeregowe vs. równoległe LED – co wybrać?

### Połączenie szeregowe (napięcia się sumują, prąd stały)

```
(+Vs) ──[R]──>|──>|──>|──── (GND)
            LED LED LED
```

**Wzór:**
- Vf_total = Vf1 + Vf2 + Vf3
- R = (Vs - Vf_total) / If

**Zalety:**
- Jeden rezystor na cały łańcuch
- Wszystkie LED świecą tak samo jasno (ten sam prąd)
- Oszczędność elementów

**Wady:**
- Potrzebne wyższe napięcie (Vs > suma Vf)
- Jeśli jedna LED się przepali (otwiera obwód), cały łańcuch gaśnie

**Przykład:** 3× biała LED (Vf=3.3V) przy 12V
- Vf_total = 3 × 3.3V = 9.9V
- R = (12V - 9.9V) / 0.02A = **105 Ω** → użyj **120 Ω**

### Połączenie równoległe (każda LED ma swój rezystor)

```
        ┌──[R1]──>|── (GND)
(+Vs)───┼──[R2]──>|── (GND)
        └──[R3]──>|── (GND)
```

**Zalety:**
- Nie trzeba wysokiego napięcia
- Jeśli jedna LED się przepali, reszta działa
- Można mieszać różne kolory LED (każda ma swój rezystor)

**Wady:- Więcej elementów (każda LED = osobny rezystor)
- Większy prąd całkowity (sumują się)

**Przykład:** 3× biała LED, każda z rezystorem 470 Ω przy 12V
- Prąd na 1 LED: 20 mA
- Prąd całkowity: **3 × 20 mA = 60 mA**

## Wskazówki praktyczne i najlepsze praktyki

### 1. Zawsze dodaj margines bezpieczeństwa

- **Rezystor:** Wybierz wartość o 10-20% większą niż minimalna
- **Moc:** Użyj rezystora o mocy 2× większej niż obliczona

### 2. Mierz napięcie Vf multimetrem (tryb "diode test")

Jeśli masz multimetr z funkcją pomiaru diod, możesz zmierzyć rzeczywiste Vf swojej LED – często różni się od wartości z datasheet.

### 3. Przy zasilaniu bateryjnym pamiętaj o spadku napięcia

Baterie rozładowują się – napięcie spada:

- Bateria 9V: nowa 9.5V → rozładowana 7V
- Akumulator Li-Ion: naładowany 4.2V → rozładowany 3.0V

**Rozwiązanie:** Oblicz rezystor dla **niższego napięcia** (rozładowana bateria), żeby LED świecił do końca.

### 4. Dla projektów Arduino/ESP32 – sprawdź napięcie GPIO!

- **Arduino Uno/Nano:** GPIO 5V
- **ESP32, ESP8266:** GPIO **3.3V** (nie 5V!)
- **Raspberry Pi:** GPIO **3.3V**

### 5. Temperatura wpływa na LED

LED nagrzewają się podczas pracy. Przy wysokiej temperaturze:

- Napięcie Vf **spada** (~-2 mV/°C)
- Jasność **maleje**
- Żywotność **skraca się**

Dla LED mocy używaj radiatorów!

### 6. Używaj szeregu E12/E24 – łatwiej dostępne

Nie szukaj egzotycznych wartości rezystorów (np. 523 Ω) – użyj standardowych z szeregu E12 (np. 560 Ω). Są tańsze i łatwiej dostępne.

## Podsumowanie – kluczowe informacje

| Napięcie | Kolor LED | Rezystor | Moc | Zastosowanie |
|----------|-----------|----------|-----|--------------|
| **5V** | Czerwona | 220 Ω | 1/4 W | Arduino, USB |
| **5V** | Biała | 100 Ω | 1/4 W | Projekty 5V |
| **12V** | Czerwona | 560 Ω | **1/2 W** | Samochód |
| **12V** | Biała | 470 Ω | **1/2 W** | Taśmy LED |
| **3V** | Czerwona | 47 Ω | 1/8 W | Baterie AA |

**Najważniejsze zasady:**

✅ **Zawsze używaj rezystora** – bez niego LED się przepali  
✅ **Dobierz moc rezystora** – przy 12V użyj 1/2 W, nie 1/4 W  
✅ **Wybieraj wyższą wartość** – bezpieczniej niż za niski rezystor  
✅ **Każda LED ma swój rezystor** – nie łącz wielu LED równolegle przez jeden rezystor  
✅ **Sprawdź polaryzację** – długa nóżka to anoda (+)  

**Użyj kalkulatora powyżej**, żeby szybko obliczyć rezystor dla dowolnego napięcia, koloru LED i prądu – wyniki są gotowe do użycia w twoim projekcie!
