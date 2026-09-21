/*
    Disse to listene skal lagre det brukeren legger inn.

    incomes = alle inntekter
    expenses = alle utgifter

    [] betyr at listene starter tomme.
*/

let incomes = [];
let expenses = [];



/*
    Denne funksjonen brukes når brukeren
    trykker på "Legg til inntekt".
*/
function addIncome() {


    /*
        Henter det brukeren har skrevet
        i feltet med id "incomeName".
    */
    const name =
        document.getElementById("incomeName").value;


    /*
        Henter beløpet brukeren har skrevet.

        Number() gjør teksten om til et tall.
        Dette er viktig fordi vi senere skal regne
        med beløpet.
    */
    const amount =
        Number(document.getElementById("incomeAmount").value);



    /*
        Sjekker om brukeren har skrevet inn
        navn og et gyldig beløp.

        === "" betyr at feltet er tomt.

        amount <= 0 betyr at beløpet er 0
        eller mindre.
    */
    if (name === "" || amount <= 0) {

        /*
            Viser en melding til brukeren.
        */
        alert("Skriv inn navn og et gyldig beløp.");

        /*
            Stopper funksjonen.
        */
        return;
    }



    /*
        Legger den nye inntekten inn i
        incomes-listen.

        push() legger noe til i listen.
    */
    incomes.push({

        /* Navnet på inntekten */
        name: name,

        /* Beløpet */
        amount: amount
    });



    /*
        Tømmer navnefeltet etter at
        inntekten er lagt til.
    */
    document.getElementById("incomeName").value = "";


    /*
        Tømmer beløpsfeltet.
    */
    document.getElementById("incomeAmount").value = "";



    /*
        Oppdaterer nettsiden slik at
        den nye inntekten vises.
    */
    updatePage();
}




/*
    Denne funksjonen fungerer på samme måte
    som addIncome(), men brukes til utgifter.
*/
function addExpense() {


    /*
        Henter navnet på utgiften.
    */
    const name =
        document.getElementById("expenseName").value;


    /*
        Henter beløpet og gjør det om til et tall.
    */
    const amount =
        Number(document.getElementById("expenseAmount").value);



    /*
        Sjekker om brukeren har skrevet
        inn riktig informasjon.
    */
    if (name === "" || amount <= 0) {

        alert("Skriv inn navn og et gyldig beløp.");

        return;
    }



    /*
        Legger utgiften inn i expenses-listen.
    */
    expenses.push({

        name: name,

        amount: amount
    });



    /*
        Tømmer navnefeltet.
    */
    document.getElementById("expenseName").value = "";


    /*
        Tømmer beløpsfeltet.
    */
    document.getElementById("expenseAmount").value = "";



    /*
        Oppdaterer siden.
    */
    updatePage();
}




/*
    Denne funksjonen oppdaterer informasjonen
    som vises på nettsiden.

    Den:
    - regner ut totale inntekter
    - regner ut totale utgifter
    - regner ut saldo
    - viser inntektene
    - viser utgiftene
    - gjør saldoen rød hvis den er negativ
*/
function updatePage() {


    /*
        Vi starter med 0 kr i inntekter.
    */
    let totalIncome = 0;


    /*
        Vi starter med 0 kr i utgifter.
    */
    let totalExpenses = 0;



    /*
        Går gjennom alle inntektene
        som ligger i incomes-listen.
    */
    for (let income of incomes) {

        /*
            Legger hver inntekt sammen.
        */
        totalIncome += income.amount;
    }



    /*
        Går gjennom alle utgiftene.
    */
    for (let expense of expenses) {

        /*
            Legger alle utgiftene sammen.
        */
        totalExpenses += expense.amount;
    }



    /*
        Regner ut hvor mye penger brukeren har igjen.

        Inntekter - utgifter = saldo
    */
    const balance = totalIncome - totalExpenses;



    /*
        Finner HTML-elementet som viser
        totale inntekter.
    */
    document.getElementById("totalIncome").textContent =

        /*
            toLocaleString gjør at tallet
            får norsk skrivemåte.

            25000 blir for eksempel 25 000.
        */
        totalIncome.toLocaleString("no-NO") + " kr";



    /*
        Viser totale utgifter.
    */
    document.getElementById("totalExpenses").textContent =

        totalExpenses.toLocaleString("no-NO") + " kr";



    /*
        Viser saldoen.
    */
    document.getElementById("balance").textContent =

        balance.toLocaleString("no-NO") + " kr";



    /*
        Finner elementet som viser saldoen.
    */
    const balanceElement =
        document.getElementById("balance");



    /*
        Sjekker om saldoen er mindre enn 0.
    */
    if (balance < 0) {


        /*
            Hvis saldoen er negativ,
            legger vi til CSS-klassen "negative".

            CSS gjør da saldoen rød.
        */
        balanceElement.classList.add("negative");

    } else {


        /*
            Hvis saldoen ikke er negativ,
            fjerner vi den røde klassen.
        */
        balanceElement.classList.remove("negative");
    }



    /*
        Finner listen over inntekter i HTML.
    */
    const incomeList =
        document.getElementById("incomeList");


    /*
        Tømmer listen før vi legger
        inntektene inn på nytt.
    */
    incomeList.innerHTML = "";



    /*
        Går gjennom alle inntektene.
    */
    for (let income of incomes) {


        /*
            Lager et nytt <li>-element.
        */
        const li = document.createElement("li");


        /*
            Setter teksten som skal vises.

            Eksempel:
            Lønn – 25 000 kr
        */
        li.textContent =

            income.name + " – " +

            income.amount.toLocaleString("no-NO") +

            " kr";


        /*
            Legger det nye elementet
            inn i inntektslisten.
        */
        incomeList.appendChild(li);
    }



    /*
        Finner listen over utgifter.
    */
    const expenseList =
        document.getElementById("expenseList");


    /*
        Tømmer utgiftslisten.
    */
    expenseList.innerHTML = "";



    /*
        Går gjennom alle utgiftene.
    */
    for (let expense of expenses) {


        /*
            Lager et nytt listeelement.
        */
        const li = document.createElement("li");


        /*
            Lager teksten som skal vises.

            Eksempel:
            Mat – 3 500 kr
        */
        li.textContent =

            expense.name + " – " +

            expense.amount.toLocaleString("no-NO") +

            " kr";


        /*
            Legger utgiften inn på nettsiden.
        */
        expenseList.appendChild(li);
    }
}