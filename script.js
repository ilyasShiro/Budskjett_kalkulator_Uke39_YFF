
/*
    Her lagres alle inntektene brukeren
    legger inn.
*/
let incomes = [];
let expenses = [];

function saveData() {

    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}



function loadData() {

    const savedIncomes =
        localStorage.getItem("incomes");


  
    const savedExpenses =
        localStorage.getItem("expenses");



    
    if (savedIncomes) {

        incomes = JSON.parse(savedIncomes);
    }


   
    if (savedExpenses) {

        expenses = JSON.parse(savedExpenses);
    }


    
    updatePage();
}

function formatMoney(amount) {

    return amount.toLocaleString("no-NO") + " kr";
}

function addIncome() {

    
    const name =
        document.getElementById("incomeName")
        .value
        .trim();
    const category =
        document.getElementById("incomeCategory")
        .value;


    
    const amount =
        Number(
            document.getElementById("incomeAmount")
            .value
        );
    if (name === "") {

        alert("Skriv inn navnet på inntekten.");

        return;
    }


    /*
        Sjekker om beløpet er gyldig.
    */
    if (amount <= 0 || isNaN(amount)) {

        alert("Skriv inn et gyldig beløp.");

        return;
    }



    /*
        Lager en ny inntekt.
    */
    const income = {

        /*
            ID brukes når vi skal slette
            en bestemt inntekt.
        */
        id: Date.now(),

        name: name,

        category: category,

        amount: amount
    };


    /*
        Legger inntekten til listen.
    */
    incomes.push(income);


    /*
        Lagrer den nye informasjonen.
    */
    saveData();


    /*
        Tømmer input-feltene.
    */
    document.getElementById("incomeName").value = "";

    document.getElementById("incomeAmount").value = "";


    /*
        Oppdaterer nettsiden.
    */
    updatePage();
}



/* =====================================
   LEGG TIL UTGIFT
===================================== */


/*
    Denne funksjonen kjører når brukeren
    trykker på "Legg til utgift".
*/
function addExpense() {

    const name =
        document.getElementById("expenseName")
        .value
        .trim();


    const category =
        document.getElementById("expenseCategory")
        .value;


    const amount =
        Number(
            document.getElementById("expenseAmount")
            .value
        );


    /*
        Sjekker at navnet er fylt ut.
    */
    if (name === "") {

        alert("Skriv inn navnet på utgiften.");

        return;
    }


    /*
        Sjekker at beløpet er gyldig.
    */
    if (amount <= 0 || isNaN(amount)) {

        alert("Skriv inn et gyldig beløp.");

        return;
    }



    /*
        Lager en ny utgift.
    */
    const expense = {

        id: Date.now(),

        name: name,

        category: category,

        amount: amount
    };


    /*
        Legger utgiften til listen.
    */
    expenses.push(expense);


    /*
        Lagrer utgiften i nettleseren.
    */
    saveData();


    /*
        Tømmer input-feltene.
    */
    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";


    /*
        Oppdaterer nettsiden.
    */
    updatePage();
}



/* =====================================
   SLETT INNTEKT
===================================== */


function deleteIncome(id) {

    /*
        Fjerner inntekten med riktig ID.
    */
    incomes = incomes.filter(function (income) {

        return income.id !== id;

    });


    /*
        Lagrer endringen.
    */
    saveData();


    /*
        Oppdaterer siden.
    */
    updatePage();
}



/* =====================================
   SLETT UTGIFT
===================================== */


function deleteExpense(id) {

    /*
        Fjerner utgiften med riktig ID.
    */
    expenses = expenses.filter(function (expense) {

        return expense.id !== id;

    });


    /*
        Lagrer endringen.
    */
    saveData();


    /*
        Oppdaterer siden.
    */
    updatePage();
}



/* =====================================
   OPPDATER SIDEN
===================================== */


/*
    Denne funksjonen regner ut alle
    tallene og viser dem på nettsiden.
*/
function updatePage() {

    /*
        Starter totalsummene på 0.
    */
    let totalIncome = 0;

    let totalExpenses = 0;



    /*
        Legger sammen alle inntektene.
    */
    for (let income of incomes) {

        totalIncome += income.amount;
    }



    /*
        Legger sammen alle utgiftene.
    */
    for (let expense of expenses) {

        totalExpenses += expense.amount;
    }



    /*
        Regner ut månedlig saldo.

        INNTEKTER - UTGIFTER = SALDO
    */
    const balance =
        totalIncome - totalExpenses;



    /*
        Viser total inntekt.
    */
    document.getElementById("totalIncome")
        .textContent =
        formatMoney(totalIncome);



    /*
        Viser totale utgifter.
    */
    document.getElementById("totalExpenses")
        .textContent =
        formatMoney(totalExpenses);



    /*
        Viser saldo.
    */
    const balanceElement =
        document.getElementById("balance");


    balanceElement.textContent =
        formatMoney(balance);



    /*
        Fjerner gamle farger.
    */
    balanceElement.classList.remove(
        "negative",
        "positive"
    );



    /*
        Hvis brukeren er i minus,
        blir saldoen rød.
    */
    if (balance < 0) {

        balanceElement.classList.add(
            "negative"
        );

        document.getElementById(
            "balanceMessage"
        ).textContent =
            "Du bruker mer penger enn du får inn.";

    }


    /*
        Hvis brukeren har penger igjen,
        blir saldoen grønn.
    */
    else if (balance > 0) {

        balanceElement.classList.add(
            "positive"
        );

        document.getElementById(
            "balanceMessage"
        ).textContent =
            "Du har penger igjen denne måneden.";

    }


    /*
        Hvis saldoen er akkurat 0.
    */
    else {

        document.getElementById(
            "balanceMessage"
        ).textContent =
            "Inntekter og utgifter er like store.";
    }



    /*
        Viser inntektene.
    */
    renderIncomeList();


    /*
        Viser utgiftene.
    */
    renderExpenseList();
}



/* =====================================
   VIS INNTEKTER
===================================== */


function renderIncomeList() {

    /*
        Finner listen i HTML.
    */
    const list =
        document.getElementById("incomeList");


    /*
        Tømmer listen før vi lager
        den på nytt.
    */
    list.innerHTML = "";


    /*
        Finner meldingen om at listen
        er tom.
    */
    const emptyMessage =
        document.getElementById("emptyIncome");


    /*
        Hvis det ikke finnes inntekter,
        viser vi meldingen.
    */
    if (incomes.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }


    /*
        Skjuler meldingen når det
        finnes inntekter.
    */
    emptyMessage.style.display = "none";



    /*
        Går gjennom alle inntektene.
    */
    for (let income of incomes) {

        /*
            Lager et nytt listeelement.
        */
        const li =
            document.createElement("li");

        li.className = "money-item";



        /*
            Lager området med navn
            og kategori.
        */
        const info =
            document.createElement("div");

        info.className = "money-info";


        const name =
            document.createElement("div");

        name.className = "money-name";

        name.textContent =
            income.name;


        const category =
            document.createElement("div");

        category.className = "money-category";

        category.textContent =
            income.category;


        info.appendChild(name);

        info.appendChild(category);



        /*
            Lager beløpet.
        */
        const amount =
            document.createElement("span");

        amount.className = "money-amount";

        amount.textContent =
            formatMoney(income.amount);



        /*
            Lager slett-knappen.
        */
        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-button";

        deleteButton.textContent =
            "Slett";

        deleteButton.type =
            "button";



        /*
            Når knappen trykkes,
            slettes inntekten.
        */
        deleteButton.addEventListener(
            "click",
            function () {

                deleteIncome(income.id);

            }
        );



        /*
            Legger alt inn i listeelementet.
        */
        li.appendChild(info);

        li.appendChild(amount);

        li.appendChild(deleteButton);


        /*
            Legger elementet inn i listen.
        */
        list.appendChild(li);
    }
}



/* =====================================
   VIS UTGIFTER
===================================== */


function renderExpenseList() {

    const list =
        document.getElementById("expenseList");


    list.innerHTML = "";


    const emptyMessage =
        document.getElementById("emptyExpense");


    /*
        Hvis listen er tom.
    */
    if (expenses.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }


    emptyMessage.style.display = "none";



    /*
        Går gjennom alle utgiftene.
    */
    for (let expense of expenses) {

        const li =
            document.createElement("li");

        li.className = "money-item";



        const info =
            document.createElement("div");

        info.className = "money-info";


        const name =
            document.createElement("div");

        name.className = "money-name";

        name.textContent =
            expense.name;


        const category =
            document.createElement("div");

        category.className = "money-category";

        category.textContent =
            expense.category;


        info.appendChild(name);

        info.appendChild(category);



        /*
            Viser beløpet.
        */
        const amount =
            document.createElement("span");

        amount.className = "money-amount";

        amount.textContent =
            formatMoney(expense.amount);



        /*
            Lager slett-knappen.
        */
        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-button";

        deleteButton.textContent =
            "Slett";

        deleteButton.type =
            "button";



        deleteButton.addEventListener(
            "click",
            function () {

                deleteExpense(expense.id);

            }
        );



        li.appendChild(info);

        li.appendChild(amount);

        li.appendChild(deleteButton);


        list.appendChild(li);
    }
}



/* =====================================
   UTSKRIFT
===================================== */


/*
    Når brukeren trykker på
    "Skriv ut budsjett",
    åpnes nettleserens utskriftsvindu.
*/
function printBudget() {

    window.print();
}



/* =====================================
   KNAPPER
===================================== */


/*
    Kobler knappen "Legg til inntekt"
    til addIncome-funksjonen.
*/
document
    .getElementById("addIncomeButton")
    .addEventListener(
        "click",
        addIncome
    );


/*
    Kobler knappen "Legg til utgift"
    til addExpense-funksjonen.
*/
document
    .getElementById("addExpenseButton")
    .addEventListener(
        "click",
        addExpense
    );


/*
    Kobler utskriftsknappen
    til printBudget-funksjonen.
*/
document
    .getElementById("printButton")
    .addEventListener(
        "click",
        printBudget
    );



/* =====================================
   START
===================================== */
/*
    Når nettsiden åpnes,
    hentes tidligere lagrede data.
*/
loadData();