document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const addContactB = document.getElementById("add-contact");
    const searchInput = document.getElementById("search");
    const noResultDiv = document.getElementById("noResult");
    const contactTable = document.getElementById("contact-table");
    const nameHeader = document.getElementById("name-header");
    const errorDiv = document.getElementById("error");

    let contacts = [];

    addContactB.addEventListener("click", function () {
        errorDiv.style.display = "none";
        noResultDiv.style.display = "none";

        const name = nameInput.value;
        const mobile = mobileInput.value;
        const email = emailInput.value;

        if (!name || !mobile || !email) {
            errorDiv.innerText = "All fields are required.";
            errorDiv.style.display = "block";
            return;
        }

        const namePattern = /^[A-Za-z ]{1,20}$/;
        const mobilePattern = /^\d{10}$/;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!name.match(namePattern) || !mobile.match(mobilePattern) || !email.match(emailPattern)) {
            errorDiv.innerText = "Invalid input format.";
            errorDiv.style.display = "block";
            return;
        }

        contacts.push({ name, mobile, email });

        // Clear input fields
        nameInput.value = "";
        mobileInput.value = "";
        emailInput.value = "";

        // Update the table
        displayContacts(contacts);
    });

    let isAscending = true;
    nameHeader.addEventListener("click", function () {
        isAscending = !isAscending;
        displayContacts();
    });

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim();
        filterContacts(searchTerm);
    });

    
    function displayContacts(filteredContacts) {
        const tableBody = contactTable.querySelector("tbody");
        tableBody.innerHTML = "";

        for (let i = 0; i < filteredContacts.length; i++) {
            const contact = filteredContacts[i];
            const row = document.createElement("tr");
            row.style.backgroundColor = i % 2 === 0 ? "#f2f2f2" : "transparent";

            const nameCell = document.createElement("td");
            nameCell.innerText = contact.name;

            const mobileCell = document.createElement("td");
            mobileCell.innerText = contact.mobile;

            const emailCell = document.createElement("td");
            emailCell.innerText = contact.email;

            row.appendChild(nameCell);
            row.appendChild(mobileCell);
            row.appendChild(emailCell);

            tableBody.appendChild(row);
        }
    }

    function filterContacts(searchTerm) {
        const filteredContacts = contacts.filter(contact => contact.mobile.includes(searchTerm));
        displayContacts(filteredContacts);
    
        if (filteredContacts.length === 0 && searchTerm !== "") {
            noResultDiv.style.display = "block";
        } else {
            noResultDiv.style.display = "none";
        }

        displayContacts(filteredContacts);
    }

    displayContacts(contacts);
});

