
function assignSelection(container) {
    const image = container.querySelector(".checkbox");
    image.src = "images/checked.png"
    container.removeEventListener("click", changeToFull);
    container.classList.remove("notSelected");
    container.classList.add("selected");

    if (selectedList.length === 0) { //se la lista dei selezionati e' vuota inserisci l'elemento corrente
        selectedList.push(container);
    }

    if (!isPresent(container)) {
        selectedList.push(container); //se il contatore non e' stato incrementato vuol dire che quella domanda non aveva ancora risposta
    }

    const choiceId = container.dataset.choiceId; //prendo il choice-id del div selezionato
    const choiceGrid = container.parentNode; //prendo la section choice-grid relativa al div che e' stato cliccato
    const gridDivs = choiceGrid.querySelectorAll("div"); //metto tutti i div contenuti nella choice-grid in una lista
    for (const gridDiv of gridDivs) {
        if (gridDiv.dataset.choiceId !== choiceId) {  //se l'elemento corrente ha un id diverso da quello dell'elemento selezionato
            gridDiv.classList.remove("selected");  //rimuovo la classe selected all'elemento non piu' selezionato
            gridDiv.classList.add("notSelected"); //aggiungo la classe non selected all'elemento non piu' selezionato
            gridDiv.querySelector(".checkbox").src = "images/unchecked.png";
            gridDiv.addEventListener("click", changeToFull);
        }
    }
}

function isPresent(container) {

    var cont = 0; //USO DI VAR
    for (const item of selectedList) {
        if (item.dataset.questionId === container.dataset.questionId) { //se il question-id dell'elemento corrente e' presente incrementa un contatore
            cont = cont + 1;
            var index = selectedList.indexOf(item);  //prendo l'indice nella lista dei selezionati per rimuovere l'elemento corrente che non e' piu' il selezionato
        }
    }
    if (cont) {
        selectedList.splice(index, 1, container); //rimuovo l'elemento che non e' piu' selezionato
    }
    return cont;
}

function changeToFull(event) {
    assignSelection(event.currentTarget);

    if (isQuizFull()) {
        for (const checkbox of checkboxes) {
            checkbox.removeEventListener("click", changeToFull); //rimuovo gli eventListener da tutti gli elementi
        }
        displayPersonality();
    }
}

function isQuizFull() {
    return selectedList.length === 3;
}

function getResult() {
    var giaFatto;
    var occorrenze;
    var maxKey;
    var maxValue;
    if (isQuizFull()) {
        for (let i = 0; i < selectedList.length; i++) {
            giaFatto = 0;
            for (let j = 0; j < i; j++) {
                if (selectedList[i].dataset.choiceId === selectedList[j].dataset.choiceId) {
                    giaFatto = 1;
                }
            }
            if (giaFatto === 0) {
                occorrenze = 0;
                for (let k = 0; k < selectedList.length; k++) {
                    if (selectedList[i].dataset.choiceId === selectedList[k].dataset.choiceId) {
                        occorrenze++;
                    }
                }
                var choice = selectedList[i].dataset.choiceId;
                frequencyList[choice] = occorrenze;
            }
        }
    }
    maxValue = 0;
    for (let key in frequencyList) {
        if (frequencyList[key] > maxValue) {
            maxKey = key;
            maxValue = frequencyList[key];
        }
    }
    if (maxValue === 1) {
        for (let item of selectedList) {
            if (item.dataset.questionId === "one") {
                maxKey = item.dataset.choiceId;
            }
        }
    }
    return maxKey;
}

function displayPersonality() {
    const personality = getResult();
    const resultContainer = document.querySelector("#results");
    const header = document.createElement("h1");
    const p = document.createElement("p");
    const button = document.createElement("button");
    header.textContent = RESULTS_MAP[personality].title;
    p.textContent = RESULTS_MAP[personality].contents;
    button.textContent = "Ricomincia il quiz"
    resultContainer.appendChild(header);
    resultContainer.appendChild(p);
    resultContainer.appendChild(button);
    button.addEventListener("click", reset);
}

function reset() {
    selectedList.splice(0, selectedList.length);
    for (let k in frequencyList) {
        delete frequencyList[k];
    }
    for (const checkbox of checkboxes) {
        checkbox.classList.remove("notSelected");
        checkbox.classList.remove("selected");
        checkbox.addEventListener("click", changeToFull);
        checkbox.querySelector(".checkbox").src = "images/unchecked.png";
    }
    const header = document.querySelector("#results h1");
    const p = document.querySelector("#results p");
    const button = document.querySelector("#results button");
    header.remove();
    p.remove();
    button.remove();
}

const checkboxes = document.querySelectorAll(".choice-grid div");


const selectedList = []; //lista atta a contenere i div selezionati
const frequencyList = {};

for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", changeToFull);
}

