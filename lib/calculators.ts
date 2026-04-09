export type CalculatorIconKey = "pcc" | "notarial" | "loan" | "cash" | "bmi" | "vat" | "alcohol";

export type CalculatorItem = {
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  seoDescription: string;
  helperText: string;
  category: "Finanse" | "Prawo" | "Zdrowie";
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
  }
];

export function getCalculatorByHref(href: string): CalculatorItem {
  const calculator = CALCULATORS.find((item) => item.href === href);
  if (!calculator) {
    throw new Error(`Brak kalkulatora dla ścieżki: ${href}`);
  }
  return calculator;
}
