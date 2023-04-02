//definicja klasy dnf
class Dnf {
    //Konstruktor przyjmuje dane, które są macierzą zawierającą przykłady wejściowe 
    //i ich etykiety klas. Tablice pozytywnych i negatywnych są inicjowane jako puste, 
    //a r i h są inicjowane jako puste łańcuchy znaków
    constructor(data) {
        this.data = data;
        this.positive = [];
        this.negative = [];
        this.r = '';
        this.h = '';
    }
    //generowanie wyrażenia dnf
    solve() {
        //motoda znajdująca wszystkie pozytywne przykłady
        //wywołuje positiveExamples(), aby znaleźć wszystkie pozytywne przykłady. 
        //Następnie metoda wchodzi w pętlę, która iteracyjnie wybiera cechę do dodania 
        //do wyrażenia DNF, wywołując selectF(). Pętla kontynuuje się, dopóki nie zostaną 
        //pokryte wszystkie pozytywne przykłady lub nie zostanie osiągnięta maksymalna liczba iteracji.
        this.positiveExamples();

        let im = 0;
        while (this.positive.length > 0) {
            this.negativeExamples();//N
            this.r = ''; //r

            let excluded = [];
            let featuresToCheck = [];

            let rCounter = 0;
            while (this.negative.length > 0) {
                let f = this.selectF(excluded);
				
				
                featuresToCheck.push(f);
                if (this.r.indexOf("f" + (f + 1)) === -1) {
                    this.r = this.r + " ∧ f" + (f + 1);
                }


                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i][f] === 0 && this.negative.indexOf(i) !== -1) {
						let indexToDelete = this.negative.indexOf(i);
                        let removed = this.negative.splice(indexToDelete, 1)[0];
                        excluded.push(removed);
                    }
                }
                rCounter++;
                if (im > 10000 || rCounter > this.data[0].length - 1 ) {
                    break;
                }
                im++;
            }

            this.r = this.r.replace(" ∧", '');
            this.h = this.h + " V (" + this.r + ")";

            let coverage = this.setCoverage(featuresToCheck);

            im++;
            if(coverage === false) {
                im += 10000;
            }
            if (im > 10000) {
                this.h = " DNF nie istnieje. Przegrana.";
                break;
            }
        }
        this.h = this.h.replace(" V", '');
        return this.h;
    }
    //Metody positiveExamples() i negativeExamples() iterują po 
    //danych wejściowych, aby znaleźć odpowiednio przykłady pozytywne i negatywne.
    positiveExamples() {
        for (let i = 0; i < this.data.length; i++) {
            if (parseInt(this.data[i][this.data[i].length - 1]) === 1) {
                this.positive.push(i);
            }
        }
    }
    //iterują po danych wejściowych, aby znaleźć odpowiednio przykłady pozytywne i negatywne
    negativeExamples() {
        for (let i = 0; i < this.data.length; i++) {
            if (parseInt(this.data[i][this.data[i].length - 1]) === 0) {
                this.negative.push(i);
            }
        }
    }
    //Metoda selectF() wybiera cechę, która maksymalizuje stosunek liczby przykładów pozytywnych 
    //do liczby przykładów negatywnych. Ta cecha jest następnie dodawana do wyrażenia DNF i używana 
    //do filtrowania przykładów negatywnych w kolejnej iteracji pętli.
    selectF(excluded) {
        let features = [];
        for (let i = 0; i < this.data[0].length - 1; i++) {

            let fTrue = 0;
            let fFalse = 0;

            for (let j = 0; j < this.data.length; j++) {
                if (excluded.indexOf(j) !== -1) {
                    continue;
                }

                if (this.data[j][i] === 1 && this.data[j][this.data[j].length - 1] === 1) {
                    fTrue++;
                } else if (this.data[j][i] === 1 && this.data[j][this.data[j].length - 1] === 0) {
                    fFalse++;
                }
            }


            features.push(fTrue / Math.max(fFalse, 0.0001));

        }

        return features.indexOf(Math.max(...features));
    }
    //metoda setCoverage spraedza czy bieżące dnf pokrywa wszystkie przykłądy
    //Jeśli koniunkcja cech w wyrażeniu jest spełniona przez przykład pozytywny
    //cechy są oznaczane jako pokryte, a przykład jest usuwany z tablicy pozytywnych przykładów
    setCoverage(featuresToCheck) {
        for (let i = 0; i < this.data.length; i++) {
            let trueConjunction = true;
            for (let j = 0; j < featuresToCheck.length; j++) {
                if (this.data[i][featuresToCheck[j]] === 0) {
                    trueConjunction = false;
                    break;
                }
            }

            if (trueConjunction === true) {
                for (let j = 0; j < featuresToCheck.length; j++) {
                    this.data[i][featuresToCheck[j]] = 0;
                }
                let coverage = this.positive.splice(this.positive.indexOf(i), 1);
                if(coverage.length === 0) {
                    return false;
                }

            }
        }
        return true;
    }
}