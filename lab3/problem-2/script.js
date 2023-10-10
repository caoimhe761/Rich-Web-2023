// Add your JavaScript code here
const nameInput = document.getElementById('name');
const mobileInput = document.getElementById('mobile');
const emailInput = document.getElementById('email');
const addContactButton = document.getElementById('add-contact');
const contactTableBody = document.getElementById('contact-table-body');

const contacts = []; // Array to store valid contacts
const errorDiv = document.getElementById('error');
addContactButton.addEventListener('click', addContact);
// Add an event listener to the Name heading for sorting
const nameHeading = document.querySelector('thead th:first-child');
let ascendingOrder = true;
const searchInput = document.getElementById('search');
const noResultDiv = document.getElementById('noResult');

searchInput.addEventListener('input', filterContacts);

nameHeading.addEventListener('click', () => {
    sortTable(ascendingOrder);
    ascendingOrder = !ascendingOrder;
});


function addContact() {
    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const email = emailInput.value.trim();

    // Validation
    if (!validateName(name)) {
        showError('Name should contain only alphabets and spaces and be less than or equal to 20 characters.');
        return;
    }

    if (!validateMobile(mobile)) {
        showError('Mobile should contain only 10 numbers.');
        return;
    }

    if (!validateEmail(email)) {
        showError('Email should be in a proper format and be less than 40 characters.');
        return;
    }

    // Clear error messages if validation succeeds
    clearError();

    // Store the contact in the array
    const contact = { name, mobile, email };
    contacts.push(contact);

    // Add the contact to the table
    addContactToTable(contact);

    // Clear input fields
    nameInput.value = '';
    mobileInput.value = '';
    emailInput.value = '';
}

function validateName(name) {
    const namePattern = /^[A-Za-z\s]{1,20}$/;
    return namePattern.test(name);
}

function validateMobile(mobile) {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(mobile);
}

function validateEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email) && email.length <= 40;
}
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearError() {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}
function addContactToTable(contact) {
    // Create a new row in the table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.mobile}</td>
        <td>${contact.email}</td>
    `;

    // Append the new row to the table
    contactTableBody.appendChild(newRow);
}
function sortTable(ascending) {
    const rows = Array.from(contactTableBody.getElementsByTagName('tr'));

    // Sort the rows based on the contact name (first column)
    rows.sort((a, b) => {
        const nameA = a.getElementsByTagName('td')[0].textContent;
        const nameB = b.getElementsByTagName('td')[0].textContent;

        if (ascending) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    // Remove existing rows from the table
    rows.forEach(row => contactTableBody.removeChild(row));

    // Append sorted rows to the table
    rows.forEach(row => contactTableBody.appendChild(row));
}

function filterContacts() {
    const searchText = searchInput.value.trim().toLowerCase();

    // Hide the 'noResult' div by default
    noResultDiv.style.display = 'none';

    // Filter rows based on the mobile number
    const rows = Array.from(contactTableBody.getElementsByTagName('tr'));

    let oddRow = false; // Flag to track odd rows for background color

    rows.forEach(row => {
        const mobileColumn = row.getElementsByTagName('td')[1].textContent.toLowerCase();
        
        if (mobileColumn.includes(searchText)) {
            row.style.display = '';
            // Apply background color to odd rows
            if (oddRow) {
                row.style.backgroundColor = '#f2f2f2';
            } else {
                row.style.backgroundColor = '';
            }
            oddRow = !oddRow;
        } else {
            row.style.display = 'none';
        }
    });
    // Show 'noResult' div if no matching rows are found
    if (rows.every(row => row.style.display === 'none')) {
        noResultDiv.style.display = 'block';
    }
}