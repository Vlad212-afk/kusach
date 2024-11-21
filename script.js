const inventoryTable = document.getElementById('inventoryTable').querySelector('tbody');

// Завантажуємо масив inventory з localStorage або використовуємо початкові значення
let inventory = JSON.parse(localStorage.getItem('inventory')) || [
    { id: 1, name: 'Шафа', quantity: 2, invNumber: 'INV001' },
    { id: 2, name: 'Стілець', quantity: 5, invNumber: 'INV002' }
];

function renderTable() {
    inventoryTable.innerHTML = '';
    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.invNumber}</td>
            <td>
                <button onclick="editRow(${index})">Редагувати</button>
                <button onclick="deleteRow(${index})">Видалити</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    });
}

function addRow() {
    const name = prompt('Назва майна:');
    const quantity = prompt('Кількість:');
    const invNumber = prompt('Інвентарний номер:');
    if (name && quantity && invNumber) {
        const newItem = { id: inventory.length + 1, name, quantity: parseInt(quantity), invNumber };
        inventory.push(newItem);
        saveToLocalStorage(); // Зберігаємо в localStorage
        renderTable();
    }
}

function editRow(index) {
    const item = inventory[index];
    const name = prompt('Назва майна:', item.name);
    const quantity = prompt('Кількість:', item.quantity);
    const invNumber = prompt('Інвентарний номер:', item.invNumber);
    if (name && quantity && invNumber) {
        inventory[index] = { ...item, name, quantity: parseInt(quantity), invNumber };
        saveToLocalStorage(); // Зберігаємо в localStorage
        renderTable();
    }
}

function deleteRow(index) {
    if (confirm('Ви впевнені, що хочете видалити?')) {
        inventory.splice(index, 1);
        saveToLocalStorage(); // Зберігаємо в localStorage
        renderTable();
    }
}

// Функція для збереження масиву inventory в localStorage
function saveToLocalStorage() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

document.addEventListener('DOMContentLoaded', renderTable);
