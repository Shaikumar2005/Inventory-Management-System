// Function to toggle between login and signup forms
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const authSection = document.getElementById('auth-section');
const inventorySection = document.getElementById('inventory-section');

// Event listeners for switching forms
switchToSignup.addEventListener('click', () => {
    loginContainer.classList.add('hidden');
    signupContainer.classList.remove('hidden');
});

switchToLogin.addEventListener('click', () => {
    signupContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Function to store user in localStorage (Sign Up)
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailOrPhone = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Simulate saving user in a database
    localStorage.setItem('user', JSON.stringify({ emailOrPhone, password }));

    alert('Sign-up successful! You can now log in.');
    signupContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Function to validate user from localStorage (Login)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailOrPhone = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.emailOrPhone === emailOrPhone && savedUser.password === password) {
        alert('Login successful!');
        authSection.classList.add('hidden');
        inventorySection.classList.remove('hidden');
    } else {
        alert('Invalid email/phone or password.');
    }
});

// Simulate adding items to an inventory list
let inventory = [];

document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    const existingItemIndex = inventory.findIndex(item => item.id === itemId);
    if (existingItemIndex !== -1) {
        // Update existing item
        inventory[existingItemIndex] = { id: itemId, name: itemName, price: itemPrice, quantity: itemQuantity };
        alert('Item updated successfully!');
    } else {
        // Add new item
        inventory.push({ id: itemId, name: itemName, price: itemPrice, quantity: itemQuantity });
        alert('Item added successfully!');
    }

    renderInventory();
});

// View inventory list
document.getElementById('viewList').addEventListener('click', function() {
    renderInventory();
});

// Function to render inventory
function renderInventory() {
    const inventoryTableBody = document.querySelector('#inventoryTable tbody');
    inventoryTableBody.innerHTML = '';

    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td><button onclick="deleteItem('${item.id}')">Delete</button></td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

// Delete item function
function deleteItem(itemId) {
    inventory = inventory.filter(item => item.id !== itemId);
    renderInventory();
}