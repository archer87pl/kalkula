export type CalculatorIconKey = "pcc" | "notarial" | "loan" | "cash" | "bmi" | "vat" | "alcohol" | "bonds" | "resistor" | "landregister" | "yearend" | "capacitor" | "inflation";

export type CalculatorItem = {
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  seoDescription: string;
  helperText: string;
  category: "Finanse" | "Prawo" | "Zdrowie" | "Elektronika" | "Narzędzia";
  icon: CalculatorIconKey;
  keywords: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const CALCULATORS: CalculatorItem[] = [
  {
    href: "/prawo/pcc",
    title: "Kalkulator PCC",
    shortTitle: "PCC",
    description: "Ile zapłacisz podatku przy kupnie mieszkania lub auta? Sprawdź szybko.",
    seoDescription:
      "Kupujesz mieszkanie lub samochód od osoby prywatnej? Ten kalkulator w kilka sekund powie Ci, ile wyniesie podatek PCC – bez czytania przepisów i bez wizyty u doradcy.",
    helperText:
      "Jeśli kupujesz coś od osoby prywatnej (nie od firmy), na przykład mieszkanie, działkę czy samochód, to musisz zapłacić podatek PCC. Wynosi on zazwyczaj 2% od ceny, którą płacisz. Wpisz kwotę i od razu zobaczysz, ile to będzie.",
    category: "Prawo",
    icon: "pcc",
    keywords: ["pcc", "podatek pcc", "kalkulator pcc", "podatek od samochodu", "podatek od nieruchomości"],
    faq: [
      {
        question: "Co to w ogóle jest ten podatek PCC?",
        answer: "PCC to podatek, który płacisz kiedy kupujesz coś wartościowego od innej osoby prywatnej – na przykład używane auto, mieszkanie z rynku wtórnego albo działkę. Wynosi zwykle 2% ceny zakupu i płacisz go sam, składając odpowiedni formularz w urzędzie skarbowym."
      },
      {
        question: "Czy muszę płacić PCC, gdy kupuję nowe mieszkanie od dewelopera?",
        answer: "Nie. Jeśli kupujesz nowe mieszkanie od dewelopera, który jest podatnikiem VAT, to PCC nie obowiązuje – w cenie masz już wliczony VAT. PCC dotyczy głównie zakupów z rynku wtórnego, czyli od innych osób prywatnych."
      },
      {
        question: "Skąd mam wiedzieć, jaką kwotę wpisać?",
        answer: "Wpisz cenę, za którą faktycznie kupujesz daną rzecz – taką, jaka jest zapisana w umowie. Urząd skarbowy może zakwestionować kwotę, jeśli znacząco odbiega od ceny rynkowej, dlatego najlepiej wpisać realną wartość."
      },
      {
        question: "Kiedy i jak zapłacić PCC?",
        answer: "Masz na to 14 dni od dnia podpisania umowy. Składasz deklarację PCC-3 (można to zrobić przez internet na e-Urząd Skarbowy) i przelewasz wyliczoną kwotę na konto swojego urzędu skarbowego."
      },
      {
        question: "Czy wynik kalkulatora jest pewny?",
        answer: "Kalkulator daje Ci dobre przybliżenie, żebyś wiedział, czego się spodziewać. Ostateczna kwota zależy od konkretnych okoliczności twojej transakcji, więc przed wpłatą warto to potwierdzić – na przykład z notariuszem lub przez infolinię urzędu skarbowego."
      }
    ]
  },
  {
    href: "/prawo/taksa-notarialna",
    title: "Taksa notarialna",
    shortTitle: "Taksa",
    description: "Zanim pójdziesz do notariusza – sprawdź, ile mniej więcej zapłacisz.",
    seoDescription:
      "Wizyta u notariusza to zazwyczaj kilka tysięcy złotych. Ten kalkulator pomoże Ci z grubsza oszacować koszty zanim jeszcze zadzwonisz do kancelarii – bez niespodzianek przy podpisaniu aktu.",
    helperText:
      "Podaj wartość transakcji i wybierz rodzaj czynności, a kalkulator pokaże szacunkowy koszt wizyty u notariusza. Możesz też dodać wypisy aktu, wpisać hipotekę i podatek PCC, żeby zobaczyć pełniejszy obraz wydatków.",
    category: "Prawo",
    icon: "notarial",
    keywords: ["taksa notarialna", "kalkulator notarialny", "koszt notariusza", "notariusz mieszkanie"],
    faq: [
      {
        question: "Czym jest taksa notarialna i dlaczego zależy od wartości mieszkania?",
        answer: "Taksa to wynagrodzenie notariusza za sporządzenie umowy. Prawo określa maksymalne stawki – im droższa transakcja, tym wyższe wynagrodzenie notariusza, ale procentowo coraz mniejsze. Notariusz nie może wziąć więcej niż przewidują przepisy, choć może zaoferować niższą stawkę."
      },
      {
        question: "Co to są wypisy aktu i ile kosztują?",
        answer: "Wypis to kopia podpisanego aktu notarialnego. Każda strona kosztuje 6 zł netto. Przy typowej umowie kupna mieszkania akt ma kilka–kilkanaście stron, a bank i różne instytucje potrzebują osobnych egzemplarzy – dlatego bierzesz ich kilka. Kalkulator uwzględnia tę kwotę."
      },
      {
        question: "Co kryje się za opłatą sądową (wniosek KW)?",
        answer: "Przy zakupie nieruchomości notariusz składa w twoim imieniu wniosek do sądu wieczystoksięgowego o wpisanie cię jako nowego właściciela. Ta opłata sądowa wynosi 200 zł – i to jest stała stawka niezależna od wartości zakupu."
      },
      {
        question: "Czy muszę też płacić notariuszowi podatek PCC?",
        answer: "Przy umowie kupna-sprzedaży notariusz pobiera podatek PCC od razu, w trakcie podpisywania aktu, i wpłaca go do urzędu skarbowego za ciebie. Przy darowiznach, umowach przedwstępnych czy hipotekach PCC co do zasady nie obowiązuje – kalkulator automatycznie to uwzględnia."
      },
      {
        question: "Dlaczego warto znać koszt z wyprzedzeniem?",
        answer: "Wielu kupujących skupia się na cenie mieszkania i zapomina, że do notariusza trzeba przyjść z gotówką na kilka tysięcy złotych w kosztach dodatkowych. Ten kalkulator pomaga zaplanować budżet z odpowiednim wyprzedzeniem, żeby nie być zaskoczonym w dniu podpisania umowy."
      }
    ]
  },
  {
    href: "/finanse/kredyt",
    title: "Kalkulator kredytu",
    shortTitle: "Kredyt",
    description: "Ile wyniesie Twoja miesięczna rata? Sprawdź zanim złożysz wniosek.",
    seoDescription:
      "Zastanawiasz się, czy stać Cię na kredyt? Wpisz kwotę, oprocentowanie i liczbę rat – kalkulator natychmiast pokaże miesięczną ratę i całkowity koszt kredytu, żebyś mógł porównać oferty banków.",
    helperText:
      "Wpisz kwotę kredytu, oprocentowanie roczne i na ile miesięcy chcesz go rozłożyć. Kalkulator pokaże Ci, ile będziesz płacić co miesiąc i ile łącznie oddasz bankowi. To dobry punkt startowy przed rozmową z doradcą.",
    category: "Finanse",
    icon: "loan",
    keywords: ["kalkulator kredytu", "rata kredytu", "kredyt hipoteczny", "kalkulator rat"],
    faq: [
      {
        question: "Co to znaczy, że rata jest stała?",
        answer: "Kalkulator liczy ratę równą (zwaną annuitetową) – przez cały okres spłaty płacisz co miesiąc tę samą kwotę. Na początku większość raty to odsetki, z czasem spłacasz coraz więcej kapitału. To najpopularniejszy model oferowany przez banki."
      },
      {
        question: "Skąd wziąć oprocentowanie do kalkulatora?",
        answer: "Oprocentowanie znajdziesz w ofercie banku lub w tabeli RRSO. Pamiętaj, że składa się z marży banku i wskaźnika WIRON (lub dawniej WIBOR). Możesz wpisać aktualną wartość z oferty, którą porównujesz, albo wpisać różne wartości i zobaczyć, jak zmienia się rata."
      },
      {
        question: "Dlaczego całkowity koszt jest dużo wyższy niż kwota kredytu?",
        answer: "Bo przez lata spłaty płacisz odsetki – to zarobek banku. Im dłużej spłacasz i im wyższe oprocentowanie, tym więcej zapłacisz ponad pożyczoną kwotę. Stąd często opłaca się wziąć kredyt na krótszy okres albo spłacać wcześniej, jeśli banki to umożliwiają."
      },
      {
        question: "Czy kalkulator uwzględnia prowizje i ubezpieczenia?",
        answer: "Nie – kalkulator pokazuje czystą ratę od kapitału i odsetek. Banki często doliczają prowizję za udzielenie kredytu, ubezpieczenie nieruchomości lub na życie, które realnie zwiększają koszt. Dlatego zawsze patrz na RRSO (całkowity koszt kredytu wyrażony w procentach), nie tylko na ratę."
      },
      {
        question: "Ile miesięcy wpisać, żeby dostać rok, pięć lat, dwadzieścia lat?",
        answer: "Po prostu pomnóż lata przez 12: rok to 12 miesięcy, 5 lat to 60, 10 lat to 120, 20 lat to 240, a 30 lat to 360 miesięcy. Możesz sprawdzić różne warianty i zobaczyć, o ile niższa jest rata przy dłuższym kredycie – i jak zmienia się łączny koszt."
      }
    ]
  },
  {
    href: "/finanse/pozyczka",
    title: "Kalkulator pożyczki",
    shortTitle: "Pożyczka",
    description: "Policz ratę pożyczki gotówkowej i sprawdź, czy pasuje do budżetu.",
    seoDescription:
      "Rozważasz pożyczkę gotówkową? Sprawdź miesięczną ratę i całkowity koszt, zanim podpiszesz umowę. Kalkulator działa w przeglądarce, bez podawania danych osobowych.",
    helperText:
      "Wpisz kwotę, oprocentowanie i liczbę miesięcy. Zobaczysz ratę miesięczną i ile łącznie oddasz. Porównaj kilka scenariuszy, żeby wybrać opcję dopasowaną do Twojego budżetu domowego.",
    category: "Finanse",
    icon: "cash",
    keywords: ["kalkulator pożyczki", "rata pożyczki", "pożyczka gotówkowa", "koszt pożyczki"],
    faq: [
      {
        question: "Czym różni się pożyczka od kredytu?",
        answer: "W praktyce codziennej te słowa są używane zamiennie. Formalnie kredytu udziela bank na konkretny cel, a pożyczkę może dać każdy – bank, firma pożyczkowa lub znajomy. Kalkulator liczy ratę tak samo dla obu, bo wzór matematyczny jest identyczny."
      },
      {
        question: "Dlaczego przy tych samych kwotach pożyczka bywa droższa niż kredyt bankowy?",
        answer: "Firmy pożyczkowe często pożyczają bez sprawdzania zdolności kredytowej i bez zabezpieczeń, więc ryzyko dla pożyczkodawcy jest większe – i to ryzyko zamieniają w wyższe oprocentowanie. Zawsze porównuj RRSO, nie tylko reklamowaną ratę."
      },
      {
        question: "Co zrobić, gdy rata wychodzi za wysoka?",
        answer: "Możesz wydłużyć okres spłaty – rata będzie niższa, ale łącznie zapłacisz więcej. Albo pożycz mniejszą kwotę. Kalkulator pozwala w kilka sekund sprawdzić kilka wariantów – zmień liczby i obserwuj, jak zmienia się wynik."
      },
      {
        question: "Czy kalkulator uwzględnia RRSO?",
        answer: "Nie – kalkulator liczy czystą ratę z kapitału i odsetek. RRSO (Rzeczywista Roczna Stopa Oprocentowania) zawiera dodatkowo prowizje, opłaty i inne koszty. Znajdziesz je w umowie lub ofercie – zawsze sprawdź RRSO przed podpisaniem."
      },
      {
        question: "Kiedy warto wcześniej spłacić pożyczkę?",
        answer: "Prawie zawsze się to opłaca, bo płacisz mniej odsetek. Ustawa o kredycie konsumenckim daje ci prawo do wcześniejszej spłaty bez ponoszenia wysokich kar. Sprawdź jednak w umowie, czy bank nie nalicza prowizji za nadpłatę."
      }
    ]
  },
  {
    href: "/zdrowie/bmi",
    title: "Kalkulator BMI",
    shortTitle: "BMI",
    description: "Wpisz wagę i wzrost – dowiedz się, czy Twoja masa ciała jest w normie.",
    seoDescription:
      "Chcesz wiedzieć, czy Twoja waga jest prawidłowa? Kalkulator BMI w dwie sekundy podaje wynik i wyjaśnia, co oznacza – prosto i bez medycznego żargonu.",
    helperText:
      "Wpisz swoją wagę w kilogramach i wzrost w centymetrach. Kalkulator policzy BMI i powie Ci, w jakiej jesteś kategorii. Pamiętaj, że BMI to tylko jeden z wielu czynników i nie zastępuje wizyty u lekarza.",
    category: "Zdrowie",
    icon: "bmi",
    keywords: ["bmi", "kalkulator bmi", "wskaźnik masy ciała", "waga prawidłowa"],
    faq: [
      {
        question: "Co to jest BMI i czy faktycznie coś mówi o zdrowiu?",
        answer: "BMI (indeks masy ciała) to prosta liczba, która porównuje Twoją wagę do wzrostu. Daje szybki sygnał, czy waga jest mniej więcej w normie – ale to tylko orientacyjny wskaźnik. Nie uwzględnia np. składu ciała: sportowiec z dużą masą mięśniową może mieć zbyt wysokie BMI, a ktoś z małą wagą i dużą ilością tłuszczu – prawidłowe."
      },
      {
        question: "Co oznaczają przedziały BMI?",
        answer: "Poniżej 18,5 to niedowaga, 18,5–24,9 to prawidłowa masa ciała, 25–29,9 to nadwaga, a 30 i więcej to otyłość. Te progi dotyczą dorosłych. U dzieci i nastolatków obowiązują inne siatki centylowe."
      },
      {
        question: "Moje BMI jest w normie, ale czuję się gruby. Czy to możliwe?",
        answer: "Tak, to tzw. otyłość sarkopenia – prawidłowa waga, ale zbyt mało mięśni i za dużo tłuszczu. BMI nie widzi różnicy między kilogramem mięśni a kilogramem tłuszczu. Jeśli chcesz to sprawdzić dokładniej, możesz zrobić badanie składu ciała (np. metodą BIA)."
      },
      {
        question: "Czy kalkulator działa dla dzieci?",
        answer: "Wzór jest ten sam, ale interpretacja jest inna. U dzieci i nastolatków BMI ocenia się na podstawie siatek centylowych uwzględniających wiek i płeć – dlatego ten kalkulator nie jest odpowiedni dla osób poniżej 18. roku życia. W razie wątpliwości warto porozmawiać z pediatrą."
      },
      {
        question: "Moje BMI jest poza normą – co powinienem zrobić?",
        answer: "Nie martw się od razu – jeden wskaźnik nie daje pełnego obrazu zdrowia. Jeśli chcesz działać, dobrym krokiem jest rozmowa z lekarzem rodzinnym lub dietetykiem. Małe, regularne zmiany w diecie i aktywności fizycznej potrafią zdziałać więcej niż radykalne diety."
      }
    ]
  },
  {
    href: "/finanse/vat",
    title: "Kalkulator VAT",
    shortTitle: "VAT",
    description: "Szybko przelicz netto na brutto lub brutto na netto przy VAT 23%.",
    seoDescription:
      "Wystawiasz fakturę albo dostajesz ofertę i nie wiesz, czy cena jest z VAT czy bez? Ten kalkulator przelicza w jednym kliknięciu – w obu kierunkach.",
    helperText:
      "Wybierz, czy masz kwotę netto (bez VAT) czy brutto (z VAT), wpisz wartość i gotowe. Kalkulator pokaże drugą kwotę i dokładną wartość samego podatku VAT.",
    category: "Finanse",
    icon: "vat",
    keywords: ["kalkulator vat", "vat 23%", "netto brutto", "brutto netto", "podatek vat"],
    faq: [
      {
        question: "Co to znaczy netto i brutto?",
        answer: "Netto to cena bez podatku VAT – taka, którą płaci firma i odlicza sobie VAT. Brutto to cena z VAT już wliczonym – to zazwyczaj kwota, którą płacisz jako konsument w sklepie. Na fakturze widzisz obie wartości."
      },
      {
        question: "Kiedy podają cenę netto, a kiedy brutto?",
        answer: "W relacjach między firmami (B2B) ceny są podawane netto, bo firmy mogą odliczyć VAT. W sklepach i ofertach dla konsumentów (B2C) ceny są zawsze brutto – to kwota, którą faktycznie zapłacisz z własnej kieszeni."
      },
      {
        question: "Jak szybko policzyć VAT w głowie?",
        answer: "Żeby wyliczyć brutto z netto, pomnóż przez 1,23. Żeby wyliczyć netto z brutto, podziel przez 1,23. Żeby wyciągnąć sam VAT z kwoty brutto, pomnóż brutto przez 0,187 (czyli 23/123). Albo po prostu użyj tego kalkulatora – będzie szybciej i dokładniej."
      },
      {
        question: "Czy istnieją inne stawki VAT niż 23%?",
        answer: "Tak. W Polsce obowiązuje też 8% (m.in. usługi budowlane, część żywności, leki), 5% (podstawowe artykuły spożywcze, książki, czasopisma) i 0% (m.in. eksport). Ten kalkulator liczy stawkę podstawową 23%, która obowiązuje przy większości usług i towarów."
      },
      {
        question: "Czy muszę płacić VAT, jeśli sprzedaję coś jako osoba prywatna?",
        answer: "Zazwyczaj nie. VAT płacą przedsiębiorcy prowadzący działalność gospodarczą. Jeśli sprzedajesz prywatne rzeczy (np. na OLX), z reguły nie jesteś podatnikiem VAT i nie musisz go doliczać. Jeśli jednak prowadzisz sprzedaż regularnie i zarabiasz na tym, to może być inaczej – warto sprawdzić z księgowym."
      }
    ]
  },
  {
    href: "/zdrowie/alkohol",
    title: "Kalkulator promili",
    shortTitle: "Promile",
    description: "Sprawdź orientacyjnie, ile może mieć promili po wypiciu alkoholu.",
    seoDescription:
      "Wypiłeś coś na imprezie i zastanawiasz się, czy możesz wsiąść za kierownicę lub jak długo alkohol będzie w Twoim organizmie? Ten kalkulator da Ci szacunkową odpowiedź – ale pamiętaj: jedynym pewnym pomiarem jest alkotest.",
    helperText:
      "Wpisz swoją wagę, płeć, co piłeś i ile czasu minęło. Kalkulator pokaże orientacyjne stężenie alkoholu we krwi (w promilach) i w wydychanym powietrzu. To tylko szacunek – metabolizm alkoholu zależy od wielu czynników, które trudno przewidzieć.",
    category: "Zdrowie",
    icon: "alcohol",
    keywords: ["kalkulator promili", "promile kalkulator", "stężenie alkoholu", "widmark", "alkohol we krwi"],
    faq: [
      {
        question: "Ile to jest 0,2 promila? Można poczuć taki poziom?",
        answer: "0,2 promila to mniej więcej tyle, ile możesz mieć po jednym małym piwie (0,33 l). Większość ludzi nie czuje żadnego efektu, ale już przy tej granicy zaczynają się prawne konsekwencje w polskim prawie drogowym. Dlatego zasada: wypiłem – nie prowadzę."
      },
      {
        question: "Jaka jest granica w Polsce? Co grozi za jazdę po alkoholu?",
        answer: "W Polsce są dwa progi. Stan po spożyciu to 0,2–0,5 promila (lub 0,1–0,25 mg w wydychanym powietrzu) – to wykroczenie, grozi mandatem i zakazem jazdy. Stan nietrzeźwości to 0,5 promila lub więcej – to już przestępstwo, mogą zabrać prawo jazdy i grozi kara pozbawienia wolności."
      },
      {
        question: "Jak szybko alkohol znika z organizmu?",
        answer: "Przeciętnie organizm rozkłada około 0,1–0,15 promila na godzinę. Kawa, zimny prysznic, energia – nic z tego nie przyspiesza tego procesu. Jedyne co pomaga, to czas. Dlatego kalkulator pyta o liczbę godzin od ostatniego drinka."
      },
      {
        question: "Dlaczego kobiety mają więcej promili przy tej samej ilości alkoholu?",
        answer: "Kobiety mają średnio więcej tkanki tłuszczowej i mniej wody w organizmie w stosunku do masy ciała. Alkohol rozpuszcza się w wodzie, więc przy mniejszej ilości wody stężenie jest wyższe. Dlatego kalkulator pyta o płeć – i dlatego te same drinki działają na kobiety mocniej niż na mężczyzn tej samej wagi."
      },
      {
        question: "Czy mogę zaufać temu kalkulatorowi i wsiąść za kierownicę?",
        answer: "Absolutnie nie. Kalkulator daje szacunek, który może się różnić od rzeczywistości nawet o 20–30% w zależności od tego, co jadłeś, jak się czujesz, jakie masz leki, jak Twój wątroba pracuje danego dnia. Jedynym wiarygodnym pomiarem jest alkotest lub badanie krwi. Jeśli piłeś – nie prowadź. Zawołaj taksówkę."
      }
    ]
  },
  {
    href: "/finanse/inflacja",
    title: "Kalkulator inflacji",
    shortTitle: "Inflacja",
    description: "Sprawdź jak inflacja wpłynęła na wartość pieniądza w latach 1990-2026.",
    seoDescription:
      "Oblicz jak inflacja zmieniła siłę nabywczą Twoich pieniędzy. Wpisz kwotę i dwa lata, a kalkulator pokaże ile są warte Twoje oszczędności po uwzględnieniu inflacji. Dane GUS 1990-2026 z pełną tabelą rocznych wskaźników inflacji.",
    helperText:
      "Wprowadź kwotę początkową i wybierz dwa lata (np. 2010 i 2025). Kalkulator wyliczy jak inflacja wpłynęła na wartość pieniądza oraz pokaże ile potrzebujesz dziś, żeby mieć tę samą siłę nabywczą. Zawiera pełną tabelę wskaźników inflacji w Polsce od 1990 roku.",
    category: "Finanse",
    icon: "inflation",
    keywords: [
      "kalkulator inflacji",
      "inflacja w polsce",
      "siła nabywcza",
      "wartość pieniądza",
      "wskaźnik inflacji",
      "inflacja gus",
      "inflacja historyczna",
      "kalkulator wartości pieniądza"
    ],
    faq: [
      {
        question: "Jak inflacja wpływa na wartość pieniądza?",
        answer: "Inflacja oznacza wzrost cen towarów i usług, co sprawia, że za tę samą kwotę możesz kupić mniej niż wcześniej. Jeśli inflacja wynosi 5% rocznie, to za rok za 100 zł kupisz tyle, ile dziś za 95 zł. Kalkulator pokazuje, jak ta wartość zmieniała się w wybranych latach."
      },
      {
        question: "Co to jest siła nabywcza pieniądza?",
        answer: "Siła nabywcza to rzeczywista wartość pieniądza – ile rzeczywiście możesz za niego kupić. Kalkulator pokazuje ile złotych z roku docelowego odpowiada wartości Twojej kwoty początkowej. Przykład: 1000 zł z 2010 roku ma taką samą siłę nabywczą jak około 1700 zł w 2025."
      },
      {
        question: "Skąd pochodzą dane o inflacji?",
        answer: "Dane historyczne pochodzą z Głównego Urzędu Statystycznego (GUS) i dotyczą inflacji rok do roku. Dane za lata 2025-2026 to prognozy oparte na bieżących wskaźnikach i prognozach Narodowego Banku Polskiego. Wszystkie wartości są aktualizowane na podstawie oficjalnych statystyk."
      },
      {
        question: "Dlaczego inflacja w Polsce była tak wysoka w latach 90-tych?",
        answer: "W latach 90-tych Polska przechodziła transformację gospodarczą z systemu centralnie planowanego na gospodarkę rynkową. W 1990 roku inflacja wyniosła aż 249,3%, ale systematycznie spadała – w 2000 roku było to już 8,5%. Od początku XXI wieku inflacja ustabilizowała się na poziomie 0-5% rocznie (z wyjątkiem 2022 roku)."
      },
      {
        question: "Jak chronić oszczędności przed inflacją?",
        answer: "Trzymanie pieniędzy w domu lub na koncie bez oprocentowania oznacza realną stratę wartości. Aby zachować siłę nabywczą, warto rozważyć lokaty bankowe, obligacje skarbowe (COI, EDO indeksowane inflacją), fundusze inwestycyjne lub inne instrumenty, które przynoszą zysk wyższy niż inflacja."
      }
    ]
  },
  {
    href: "/finanse/obligacje",
    title: "Kalkulator obligacji skarbowych",
    shortTitle: "Obligacje",
    description: "Sprawdź, ile zarobisz na obligacjach OTS, ROR, DOR, TOS, COI, EDO, ROS, ROD.",
    seoDescription:
      "Rozważasz zakup obligacji skarbowych? Sprawdź, ile wyniesie Twój zysk po okresie oszczędzania. Kalkulator uwzględnia wszystkie typy obligacji: OTS, ROR, DOR, TOS, COI, EDO, ROS i ROD – ze stałym i zmiennym oprocentowaniem, z wykresem wzrostu kapitału.",
    helperText:
      "Wybierz typ obligacji (OTS, ROR, DOR, TOS, COI, EDO, ROS lub ROD), wpisz kwotę i zobacz, ile zarobisz. Kalkulator automatycznie wypełni oprocentowanie i marżę dla wybranego typu. Możesz zmienić stopę NBP lub inflację, żeby zasymulować różne scenariusze.",
    category: "Finanse",
    icon: "bonds",
    keywords: [
      "obligacje skarbowe",
      "kalkulator obligacji",
      "ots",
      "ror",
      "dor",
      "edo",
      "tos",
      "coi",
      "ros",
      "rod",
      "tos",
      "obligacje oszczędnościowe",
      "obligacje skarbowe kalkulator"
    ],
    faq: [
      {
        question: "Co to są obligacje skarbowe i czy są bezpieczne?",
        answer:
          "Obligacje skarbowe to pożyczka, którą dajesz państwu polskiemu. W zamian państwo wypłaca Ci odsetki i po pewnym czasie oddaje całą kwotę. To jedna z najbezpieczniejszych form oszczędzania – ryzyko, że państwo nie wypłaci pieniędzy, jest praktycznie zerowe."
      },
      {
        question: "Czym różnią się OTS, ROR, DOR, TOS, EDO i inne typy obligacji?",
        answer:
          "Każdy typ różni się okresem oszczędzania i sposobem oprocentowania. OTS to krótkie 3-miesięczne obligacje ze stałą stopą (2%). ROR i DOR mają zmienne oprocentowanie oparte na stopie NBP. TOS to 3-letnie ze stałym oprocentowaniem 4,4%. COI (4-letnie), EDO (10-letnie), ROS (6-letnie) i ROD (12-letnie) są indeksowane inflacją z odpowiednią marżą – chroniąc Twoje oszczędności przed utratą wartości."
      },
      {
        question: "Czy mogę wypłacić obligacje przed terminem?",
        answer:
          "Tak, możesz wykupić obligacje wcześniej, ale zwykle tracisz odsetki z ostatniego okresu odsetkowego (np. z ostatniego roku). Obligacje skarbowe nie mają kar za wcześniejszy wykup poza utratą naliczonych odsetek – kapitał dostajesz w całości."
      },
      {
        question: "Jak działa indeksacja inflacją w obligacjach COI, EDO, ROS i ROD?",
        answer:
          "Obligacje indeksowane inflacją wypłacają odsetki na poziomie inflacji ogłaszanej przez GUS plus dodatkową marżę (od 1,5% do 2,5% w zależności od typu). Dzięki temu Twoje oszczędności rosną co najmniej tak szybko jak inflacja – nie tracisz siły nabywczej pieniędzy."
      },
      {
        question: "Czy muszę płacić podatek od odsetek z obligacji?",
        answer:
          "Nie. Odsetki od obligacji skarbowych detalicznych (OTS, ROR, DOR, TOS, COI, EDO, ROS, ROD) są zwolnione z podatku Belki (19%). Dostajesz pełną kwotę bez potrąceń – to czyni obligacje jeszcze bardziej opłacalnymi w porównaniu do lokat bankowych."
      }
    ]
  },
  {
    href: "/elektronika/rezystor",
    title: "Dekoder kodów barwnych rezystorów",
    shortTitle: "Rezystory",
    description: "Odkoduj wartość rezystora na podstawie kolorowych pasków (4, 5 lub 6 pasmowych).",
    seoDescription:
      "Nie wiesz, jaką wartość ma rezystor? Wybierz kolory pasków, a dekoder od razu poda rezystancję, tolerancję i współczynnik temperaturowy. Obsługuje rezystory 4, 5 i 6-pasmowe – idealne dla elektroników i hobbyistów.",
    helperText:
      "Wybierz ilość pasków na rezystorze (4, 5 lub 6), a następnie wskaż kolory poszczególnych pasków. Dekoder automatycznie wyliczy wartość rezystancji w omach, tolerancję i (dla 6-pasmowych) współczynnik temperaturowy.",
    category: "Elektronika",
    icon: "resistor",
    keywords: [
      "dekoder rezystorów",
      "kalkulator rezystorów",
      "kody barwne rezystorów",
      "kolor rezystor",
      "rezystor kalkulator",
      "paski rezystor",
      "rezystancja kalkulator",
      "4 pasmowy rezystor",
      "5 pasmowy rezystor",
      "6 pasmowy rezystor"
    ],
    faq: [
      {
        question: "Jak czytać kolory na rezystorze?",
        answer:
          "Kolory na rezystorze odczytujesz od lewej do prawej. Pierwsze 2-3 paski to cyfry wartości, kolejny to mnożnik, dalej tolerancja (złoty to ±5%, srebrny ±10%, brązowy ±1%), a w rezystorach 6-pasmowych ostatni pasek to współczynnik temperaturowy."
      },
      {
        question: "Czym różnią się rezystory 4, 5 i 6-pasmowe?",
        answer:
          "Rezystor 4-pasmowy ma 2 cyfry wartości, mnożnik i tolerancję – typowo ±5% lub ±10%. Rezystor 5-pasmowy ma 3 cyfry wartości i zwykle większą precyzję (±1% lub ±2%). Rezystor 6-pasmowy dodatkowo informuje o współczynniku temperaturowym, pokazując jak rezystancja zmienia się z temperaturą."
      },
      {
        question: "Jak poznać, od której strony czytać kolory?",
        answer:
          "Pasek tolerancji (złoty, srebrny lub brązowy) jest zazwyczaj umieszczony odrobinę dalej od pozostałych pasków lub jest na końcu obwodu. Czytaj od przeciwnego końca – zaczynając od pasków bliżej siebie."
      },
      {
        question: "Co to jest tolerancja rezystora?",
        answer:
          "Tolerancja to dopuszczalne odchylenie rzeczywistej wartości rezystancji od wartości nominalnej. Jeśli rezystor ma 1 kΩ ±5%, to jego rzeczywista wartość może być między 950 Ω a 1050 Ω. Im niższa tolerancja, tym bardziej precyzyjny (i zazwyczaj droższy) jest rezystor."
      },
      {
        question: "Jakie kolory odpowiadają jakim cyfrom?",
        answer:
          "Czarny=0, Brązowy=1, Czerwony=2, Pomarańczowy=3, Żółty=4, Zielony=5, Niebieski=6, Fioletowy=7, Szary=8, Biały=9. Mnożniki: Złoty=×0.1, Srebrny=×0.01, Czarny=×1, Brązowy=×10, Czerwony=×100 itd. Złoty i srebrny pasek na końcu oznacza tolerancję (5% i 10%)."
      }
    ]
  },
  {
    href: "/elektronika/kondensator",
    title: "Dekoder kodów kondensatorów",
    shortTitle: "Kondensatory",
    description: "Odkoduj wartość kondensatora na podstawie 3-cyfrowego kodu (np. 104 = 100 nF).",
    seoDescription:
      "Nie wiesz jaką pojemność ma kondensator ceramiczny? Wpisz kod z obudowy (np. 104, 223, 0R5), a dekoder natychmiast przeliczy go na pikofarady, nanofarady i mikrofarady. Obsługuje standardowe kody 3-cyfrowe i notację z literą R.",
    helperText:
      "Wpisz kod kondensatora (np. 104, 223, 471), a dekoder automatycznie wyliczy pojemność w pikofaradach, nanofaradach i mikrofaradach. Kod składa się z dwóch cyfr wartości i cyfry mnożnika – np. 104 to 10 × 10^4 = 100000 pF = 100 nF.",
    category: "Elektronika",
    icon: "capacitor",
    keywords: [
      "kalkulator kondensatorów",
      "kod kondensatora",
      "pojemność kondensatora",
      "dekoder kondensatorów",
      "104 kondensator",
      "kondensator ceramiczny",
      "pikofarady",
      "nanofarady",
      "mikrofarady"
    ],
    faq: [
      {
        question: "Jak czytać kod kondensatora?",
        answer:
          "Kod kondensatora ceramicznego składa się zwykle z 3 cyfr. Pierwsze dwie to wartość bazowa, a trzecia to mnożnik (liczba zer do dodania). Wynik jest zawsze w pikofaradach (pF). Przykład: 104 = 10 × 10^4 = 100 000 pF = 100 nF = 0.1 µF."
      },
      {
        question: "Co oznacza kod 104 na kondensatorze?",
        answer:
          "Kod 104 to jeden z najpopularniejszych - oznacza 10 × 10^4 = 100 000 pikofaradów, czyli 100 nanofaradów (100 nF) lub 0.1 mikrofarada (0.1 µF). Jest to standardowa pojemność kondensatora sprzęgającego lub odsprzęgającego w układach elektronicznych."
      },
      {
        question: "Czym różnią się pikofarady, nanofarady i mikrofarady?",
        answer:
          "To różne jednostki pojemności. 1 nanofarad (nF) = 1000 pikofaradów (pF), a 1 mikrofarad (µF) = 1000 nanofaradów = 1 000 000 pikofaradów. Kalkulator automatycznie przelicza między tymi jednostkami i pokazuje wynik w najbardziej czytelnej formie."
      },
      {
        question: "Co znaczy litera R w kodzie kondensatora?",
        answer:
          "Litera R zastępuje przecinek dziesiętny w kodach kondensatorów o małych pojemnościach. Przykłady: 0R5 = 0.5 pF, 1R0 = 1.0 pF, R47 = 0.47 pF. Jest to standardowa notacja dla kondensatorów poniżej 10 pikofaradów."
      },
      {
        question: "Jakie są najpopularniejsze wartości kondensatorów?",
        answer:
          "Najpopularniejsze to: 104 (100 nF), 103 (10 nF), 102 (1 nF), 223 (22 nF), 473 (47 nF), 101 (100 pF). W układach cyfrowych często spotyka się kondensatory odsprzęgające 100 nF (104) przy zasilaniu układów scalonych. Kalkulator pokazuje listę popularnych wartości do szybkiego wyboru."
      }
    ]
  },
  {
    href: "/prawo/ksiega-wieczysta",
    title: "Kalkulator cyfry kontrolnej księgi wieczystej",
    shortTitle: "Księga wieczysta",
    description: "Oblicz cyfrę kontrolną lub sprawdź poprawność numeru księgi wieczystej.",
    seoDescription:
      "Potrzebujesz cyfry kontrolnej do numeru księgi wieczystej? Wybierz kod sądu, wpisz numer i od razu otrzymasz pełny numer KW z cyfrą kontrolną. Możesz też sprawdzić, czy podany numer jest poprawny – kalkulator obsługuje wszystkie wydziały ksiąg wieczystych w Polsce.",
    helperText:
      "Wybierz kod wydziału księgi wieczystej (np. KR1P dla Krakowa), wpisz numer, a kalkulator obliczy cyfrę kontrolną. Możesz też sprawdzić poprawność numeru, który już masz – wystarczy wpisać pełny numer z ukośnikami.",
    category: "Prawo",
    icon: "landregister",
    keywords: [
      "księga wieczysta",
      "cyfra kontrolna",
      "numer księgi wieczystej",
      "kalkulator księgi wieczystej",
      "kod sądu",
      "ekw",
      "elektroniczna księga wieczysta",
      "sprawdź księgę wieczystą",
      "numer KW"
    ],
    faq: [
      {
        question: "Co to jest cyfra kontrolna księgi wieczystej?",
        answer:
          "Cyfra kontrolna to ostatni znak w numerze księgi wieczystej (po drugim ukośniku). Służy do wykrywania błędów przy przepisywaniu numeru – jeśli pomylisz jedną cyfrę lub literę, cyfra kontrolna się nie zgodzi. Format to: KOD_SĄDU/NUMER/CYFRA (np. KR1P/00012345/6)."
      },
      {
        question: "Skąd wziąć kod sądu dla mojej nieruchomości?",
        answer:
          "Kod sądu (4 znaki, np. KR1P, WA1M, GD1G) znajdziesz w dokumentach dotyczących nieruchomości – w akcie notarialnym, umowie, wypisie z księgi wieczystej. Kody oznaczają konkretne wydziały ksiąg wieczystych przy sądach rejonowych w całej Polsce. W kalkulatorze masz pełną listę wszystkich kodów."
      },
      {
        question: "Jak sprawdzić księgę wieczystą online?",
        answer:
          "Wejdź na stronę ekw.ms.gov.pl (portal Ministerstwa Sprawiedliwości), wpisz pełny numer księgi wieczystej z cyfrą kontrolną i wybierz \"Wyszukaj\". Otrzymasz aktualny odpis – bezpłatnie, bez logowania. Jeśli nie masz cyfry kontrolnej, użyj tego kalkulatora, żeby ją obliczyć."
      },
      {
        question: "Co zrobić, gdy kalkulator pokazuje błąd?",
        answer:
          "Upewnij się, że wybrałeś właściwy kod sądu (sprawdź dokument nieruchomości) i że numer wpisałeś bez ukośników, spacji ani liter – tylko cyfry. Jeśli weryfikujesz istniejący numer, wpisz go dokładnie w formacie KOD/NUMER/CYFRA. Jeśli nadal nie działa, możliwe że numer jest źle przepisany z dokumentu."
      },
      {
        question: "Czy mogę ufać obliczonej cyfrze kontrolnej?",
        answer:
          "Tak – kalkulator stosuje oficjalny algorytm używany przez polskie sądy. Cyfra kontrolna jest obliczana automatycznie na podstawie kodu sądu i numeru księgi, dlatego wynik jest zawsze prawidłowy. Możesz go bezpiecznie użyć do wyszukania księgi wieczystej na ekw.ms.gov.pl."
      }
    ]
  },
  {
    href: "/narzedzia/dni-do-konca-roku",
    title: "Kalkulator dni do końca roku",
    shortTitle: "Dni do końca roku",
    description: "Sprawdź ile dni, tygodni i miesięcy zostało do końca roku.",
    seoDescription:
      "Chcesz wiedzieć, ile czasu zostało do końca roku? Kalkulator pokaże dokładną liczbę dni do Sylwestra, procent miniony roku, ile zostało dni roboczych i weekendów. Sprawdź postęp realizacji swoich rocznych planów!",
    helperText:
      "Kalkulator automatycznie pokazuje, ile dni pozostało do końca bieżącego roku. Zobacz postęp roku w procentach, dowiedz się ile zostało dni roboczych, weekendów i tygodni. Możesz też wybrać własną datę, żeby sprawdzić ile czasu zostało z dowolnego momentu.",
    category: "Narzędzia",
    icon: "yearend",
    keywords: [
      "dni do końca roku",
      "ile dni do sylwestra",
      "koniec roku",
      "kalkulator dni",
      "postęp roku",
      "dni do nowego roku",
      "ile zostało do końca roku",
      "dni robocze do końca roku"
    ],
    faq: [
      {
        question: "Jak działa kalkulator dni do końca roku?",
        answer:
          "Kalkulator automatycznie pobiera dzisiejszą datę i oblicza ile dni zostało do 31 grudnia. Pokazuje też dodatkowe informacje: procent roku, który już minął, ile zostało dni roboczych (poniedziałek-piątek), weekendów, tygodni i pełnych miesięcy. Wszystko aktualizuje się automatycznie każdego dnia."
      },
      {
        question: "Czy mogę sprawdzić dni do końca roku z dowolnej daty?",
        answer:
          "Tak! Wystarczy zaznaczyć opcję 'Wybierz własną datę' i wpisać dowolny dzień. Kalkulator pokaże ile dni pozostało do końca roku z tej daty. Przydatne przy planowaniu długoterminowym lub sprawdzaniu postępów z przeszłości."
      },
      {
        question: "Do czego może się przydać ten kalkulator?",
        answer:
          "Kalkulator pomaga śledzić postęp realizacji rocznych celów – czy to osobistych, zawodowych czy biznesowych. Możesz zobaczyć ile dni roboczych zostało na dokończenie projektów, zaplanować pozostały czas lub po prostu sprawdzić jak szybko rok mija. Świetny do motywacji i planowania!"
      },
      {
        question: "Czy kalkulator uwzględnia dni świąteczne?",
        answer:
          "Kalkulator pokazuje czyste dni robocze (poniedziałek-piątek) i weekendy (sobota-niedziela), ale nie odejmuje świąt państwowych. W praktyce dni roboczych będzie nieco mniej ze względu na święta, które w Polsce wypadają w tygodniu (np. Boże Narodzenie, Nowy Rok)."
      },
      {
        question: "Co to znaczy, że rok jest przestępny?",
        answer:
          "Rok przestępny ma 366 dni zamiast standardowych 365 – dodatkowy dzień (29 lutego) pojawia się co 4 lata. Kalkulator automatycznie wykrywa czy aktualny rok jest przestępny i odpowiednio dostosowuje obliczenia. Następny rok przestępny to 2028."
      }
    ]
  }
];

export function getCalculatorByHref(href: string): CalculatorItem {
  const calculator = CALCULATORS.find((item) => item.href === href);
  if (!calculator) {
    throw new Error(`Brak kalkulatora dla ścieżki: ${href}`);
  }
  return calculator;
}
