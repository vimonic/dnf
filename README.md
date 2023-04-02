# dnf
Algorytm DNF (Disjunctive Normal Form) służy do konstruowania formuł logicznych w postaci sumy iloczynów (alternatywy koniunkcji) dla zadanych przykładów i etykiet klas. Pseudokod algorytmu DNF może wyglądać następująco:

Wejście:

    data: macierz wejściowa, zawierająca przykłady i etykiety klas
    maxIterations: maksymalna liczba iteracji, po której algorytm zostanie zakończony

Wyjście:

    dnfExpression: formuła logiczna w postaci sumy iloczynów (alternatywy koniunkcji)

    Inicjalizuj pustą tablicę "positiveExamples".
    Dla każdego wiersza "example" macierzy "data":
    2.1. Jeśli etykieta klasy example jest równa 1, dodaj example do tablicy "positiveExamples".
    Inicjalizuj pustą tablicę "dnfExpression".
    Dopóki tablica "positiveExamples" nie jest pusta i liczba iteracji nie przekracza "maxIterations":
    4.1. Wybierz cechę "feature", która maksymalizuje stosunek liczby pozytywnych przykładów do liczby negatywnych przykładów dla których cecha ta jest spełniona.
    4.2. Dodaj "feature" do "dnfExpression".
    4.3. Usuń z "positiveExamples" wszystkie przykłady, które spełniają "dnfExpression".
    4.4. Zwiększ liczbę iteracji o 1.
    Zwróć "dnfExpression".
