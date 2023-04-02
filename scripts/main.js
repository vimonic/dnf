function loadFile() {
    let file = document.getElementById("file").files[0];
    let reader = new FileReader();
    
    reader.onload = (e) => {
    let result = e.target.result.split("\r\n").map(function (x) {
    return x.split(' ');
    });

    validator = new Validator(result);
    let validateData = validator.validate();
    if (validateData !== false) {
      dnf = new Dnf(result);
      document.querySelector("#file-status").innerText = "Wczytano plik."
    }
};

reader.readAsText(file);
}

function solve() {
if (typeof dnf === "undefined") {
alert("Najpierw wczytaj poprawnie plik");
return false;
}
let result = dnf.solve();
displayResult(result);
}

function displayResult(result) {
document.querySelector("#result-box").innerText = "Wynik" + result;
}

document.addEventListener("DOMContentLoaded", () => {
let loadFileBtn = document.querySelector("#loadFile");
loadFileBtn.addEventListener("click", () => {
loadFile();
});

let solveDnfBtn = document.querySelector("#solveDnf");
solveDnfBtn.addEventListener("click", () => {
solve();
});
});