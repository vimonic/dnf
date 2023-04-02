class Validator {
    constructor(data) {
        this.data = data;
    }
    //metoda sprawdza, czy dane mają odpowiednią liczbę kolumn i wierszy i format składajacy sie ze znakow
    //1, 0, spacji i nowej linii
    validate() {
        let rows = this.data.length;
        let columns = this.data[0].length;

        for (let i = 0; i < rows; i++) {
            if (this.data[i].length !== columns) {
                alert("Błąd plikuu. Liczba kolumn nie jest taka sama dla każdej cechy.");
                return false;
            }
        }

        let string = JSON.stringify(this.data);
        let pattern = /^(\[\[){1}("0",|"1",|"0"],|"1"],|\["0",|\["1",|"1"|"0"){1,}\]]$/;

        if (!pattern.test(string)) {
            alert("Błędny format. Dozwolone są jedynie znaki: spacja, 0 ,1 i przejście do nowej linii");
            return false;
        }

        this.convertToInt();
        return this.data;
    }
    //jesli dane sie zgadzaja, metoda konwertuje stringi do integerow
    convertToInt() {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                this.data[i][j] = parseInt(this.data[i][j]);
            }
        }
    }
}