let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function save() {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addIncome() {
    let name = document.getElementById("incomeName").value;
    let type = document.getElementById("incomeType").value;
    let amount = Number(document.getElementById("incomeAmount").value);

    if (!name || amount <= 0) return;

    incomes.push({ name, type, amount });
    save();
    update();
}

function addExpense() {
    let name = document.getElementById("expenseName").value;
    let type = document.getElementById("expenseType").value;
    let amount = Number(document.getElementById("expenseAmount").value);

    if (!name || amount <= 0) return;

    expenses.push({ name, type, amount });
    save();
    update();
}

function update() {
    let incomeTotal = incomes.reduce((sum, item) => sum + item.amount, 0);
    let expenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
    let balance = incomeTotal - expenseTotal;

    document.getElementById("incomeTotal").textContent =
        incomeTotal.toLocaleString("no-NO") + " kr";

    document.getElementById("expenseTotal").textContent =
        expenseTotal.toLocaleString("no-NO") + " kr";

    let balanceElement = document.getElementById("balance");

    balanceElement.textContent =
        balance.toLocaleString("no-NO") + " kr";

    balanceElement.className =
        balance < 0 ? "negative" : "positive";

    let list = document.getElementById("list");
    list.innerHTML = "";

    incomes.forEach(item => {
        list.innerHTML += `
            <li>+ ${item.name} (${item.type}):
            ${item.amount.toLocaleString("no-NO")} kr</li>
        `;
    });

    expenses.forEach(item => {
        list.innerHTML += `
            <li>- ${item.name} (${item.type}):
            ${item.amount.toLocaleString("no-NO")} kr</li>
        `;
    });
}

update();