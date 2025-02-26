const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const incomeElement = document.getElementById('income');
const expensesElement = document.getElementById('expenses');
const balanceElement = document.getElementById('balance');
const goalElement = document.getElementById('goal');
const progressElement = document.getElementById('progress');
const progressBarFill = document.getElementById('progress-bar-fill');

let transactions = [];
let income = 0;
let expenses = 0;
let savingsGoal = 1000;

function updateDashboard() {
    income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
    balance = income - expenses;

    incomeElement.innerText = `$${income}`;
    expensesElement.innerText = `$${expenses}`;
    balanceElement.innerText = balance;
    updateSavingsGoal();
}

function updateSavingsGoal() {
    progressElement.innerText = income;
    const progressPercentage = (income / savingsGoal) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        description: description.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateTransactionList();
    updateDashboard();
    form.reset();
}

function updateTransactionList() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description} <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount)}</span>`;
        transactionList.appendChild(li);
    });
}

form.addEventListener('submit', addTransaction);

// Chart.js - Spending habits chart
const ctx = document.getElementById('spendingChart').getContext('2d');
const spendingChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Food', 'Rent', 'Entertainment', 'Others'],
        datasets: [{
            label: 'Spending Habits',
            data: [300, 500, 200, 400],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    }
});
