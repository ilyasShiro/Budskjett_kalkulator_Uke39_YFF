let incomes = [];
let expenses = [];


// Legger til inntekt
function addIncome() {

    const name = document.getElementById("incomeName").value;
    const amount = Number(document.getElementById("incomeAmount").value);

    if (name === "" || amount <= 0) {
        alert("Skriv inn navn og et gyldig beløp.");
        return;
    }

    incomes.push({
        name: name,
        amount: amount
    });

    document.getElementById("incomeName").value = "";
    document.getElementById("incomeAmount").value = "";

    updatePage();
}


// Legger til utgift
function addExpense() {

    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("expenseAmount").value);

    if (name === "" || amount <= 0) {
        alert("Skriv inn navn og et gyldig beløp.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    updatePage();
}


// Oppdaterer hele siden
function updatePage() {

    let totalIncome = 0;
    let totalExpenses = 0;


    // Regner ut alle inntekter
    for (let income of incomes) {
        totalIncome += income.amount;
    }


    // Regner ut alle utgifter
    for (let expense of expenses) {
        totalExpenses += expense.amount;
    }


    // Regner ut saldo
    const balance = totalIncome - totalExpenses;


    // Viser tallene
    document.getElementById("totalIncome").textContent =
        totalIncome.toLocaleString("no-NO") + " kr";

    document.getElementById("totalExpenses").textContent =
        totalExpenses.toLocaleString("no-NO") + " kr";

    document.getElementById("balance").textContent =
        balance.toLocaleString("no-NO") + " kr";


    // Oppdaterer farge på saldo
    const balanceElement = document.getElementById("balance");

    if (balance < 0) {
        balanceElement.classList.add("negative");
    } else {
        balanceElement.classList.remove("negative");
    }


    // Viser inntekter
    const incomeList = document.getElementById("incomeList");

    incomeList.innerHTML = "";

    for (let income of incomes) {

        const li = document.createElement("li");

        li.textContent =
            income.name + " – " +
            income.amount.toLocaleString("no-NO") +
            " kr";

        incomeList.appendChild(li);
    }


    // Viser utgifter
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    for (let expense of expenses) {

        const li = document.createElement("li");

        li.textContent =
            expense.name + " – " +
            expense.amount.toLocaleString("no-NO") +
            " kr";

        expenseList.appendChild(li);
    }
}