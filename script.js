let entries = JSON.parse(localStorage.getItem('entries')) || [];

function addEntry() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && !isNaN(amount)) {
        const newEntry = { id: Date.now(), description, amount, type };
        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));
        resetFields();
        displayEntries();
    } else {
        alert('Please enter valid description and amount.');
    }
}

function displayEntries(filter = 'all') {
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';

    const filteredEntries = filter === 'all' ? entries : entries.filter(entry => entry.type === filter);

    filteredEntries.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'flex justify-between bg-white p-2 rounded shadow mb-2';
        li.innerHTML = `
            <span>${entry.description} - $${entry.amount.toFixed(2)}</span>
            <div>
                <button onclick="editEntry(${entry.id})" class="bg-yellow-500 text-white p-1 mr-1">Edit</button>
                <button onclick="deleteEntry(${entry.id})" class="bg-green-500 text-white p-1">Delete</button>
            </div>
        `;
        entryList.appendChild(li);
    });

    updateSummary();
}

function filterEntries() {
    const filterValue = document.querySelector('input[name="filter"]:checked').value;
    displayEntries(filterValue);
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
}

function editEntry(id) {
    const entry = entries.find(entry => entry.id === id);
    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;
    deleteEntry(id);
}

function updateSummary() {
    const totalIncome = entries.filter(entry => entry.type === 'income').reduce((sum, entry) => sum + entry.amount, 0);
    const totalExpenses = entries.filter(entry => entry.type === 'expense').reduce((sum, entry) => sum + entry.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    document.getElementById('totalIncome').innerText = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('netBalance').innerText = netBalance.toFixed(2);
}

function resetFields() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}

document.addEventListener('DOMContentLoaded', () => {
    displayEntries();
});
