
document.addEventListener("DOMContentLoaded", () => {
    const addContactButton = document.querySelector("#addContact");
    const errorDiv = document.querySelector("#error");
    const searchInput = document.querySelector("#search");
    let contacts = [];
 
    addContactButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const nameInput = document.querySelector("#name");
        const mobileInput = document.querySelector("#mobile");
        const emailInput = document.querySelector("#email");

        const name = nameInput.value.trim();
        const mobile = mobileInput.value.trim();
        const email = emailInput.value.trim();

        addContact(name, mobile, email);
       
    });

    function addContact(name, mobile, email) {   
        // Check for empty fields
        if (!name || !mobile || !email) {
            errorDiv.textContent = "All fields are required.";
            errorDiv.style.display = "block";
            return;
        }
        const validationError = validateContact(name, mobile, email);

        if (validationError) {
            // Display the error message to the user, e.g., in an alert or on the page
            errorDiv.textContent = (validationError);
            errorDiv.style.display = "block";
            return;
        }

        const contact = { name, mobile, email };
        contacts.push(contact);
        // Add contact to the table
        const tableBody = document.querySelector("#contactTable");
        const newRow = tableBody.insertRow(-1);// Insert at the end of the table
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = mobile;
        newRow.insertCell(2).textContent = email;
    

        // Reset input fields
        // Reset the input fields
        const nameInput = document.querySelector("#name");
        const mobileInput = document.querySelector("#mobile");
        const emailInput = document.querySelector("#email");
        nameInput.value = "";      
        mobileInput.value = ""; 
        emailInput.value = "";      
    }
       
    // Event listener for the search input field
    searchInput.addEventListener("input", () => {
        const searchInput = document.querySelector("#searchInput");
        const searchTerm = searchInput.value.trim();
        filterTable(searchTerm);
    });

    
    
    function validateContact(name, mobile, email) {
        const nameRegex = /^[A-Za-z ]+$/; // Regular expression to match alphabets and spaces only
        const mobileRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

        
        const nameLength = 20;
        const emailLength = 40;

        if (!name.match(nameRegex)) {
            return "Name contains invalid characters.";
        }

        if (name.length > nameLength) {
            return `Name must be less than or equal to ${nameLength} characters.`;
        }

        if (!mobile.match(mobileRegex)) {
            return "Mobile number must be exactly 10 digits.";
        }

        if (!email.match(emailRegex)) {
            return "Invalid email address format.";
        }

        if (email.length > emailLength) {
            return `Email must be less than or equal to ${emailLength} characters.`;
        }

        return null; // All validations passed
    }
});




///NOTTTT workinggggggggg
function filterTable(searchTerm) {
    const noResultDiv = document.querySelector("#noResult");
       
    const table = document.querySelector("#contactTable");
    const rows = table.querySelectorAll("tr");
    let oddRow = false; // Variable to track odd rows

    rows.forEach((row, index) => {
        if (index === 0) {
            // Skip the header row
            return;
        }

        const mobileCell = row.querySelector("td:nth-child(2)"); // Assuming mobile number is in the second column
        const mobileText = mobileCell.textContent.toLowerCase();

        if (mobileText.includes(searchTerm)) {
            row.style.display = "table-row"; // Show matching row
            // Apply odd-even row background color
            row.style.backgroundColor = oddRow ? "#f2f2f2" : "";
            oddRow = !oddRow; // Toggle oddRow for the next iteration
        } else {
            row.style.display = "none"; // Hide non-matching row
        }
    });

    // Show or hide the 'noResult' div based on search results
    noResultDiv.style.display = filteredContacts.length === 0 ? "block" : "none";

    // // Show or hide the 'noResult' div based on search results
    // if (document.querySelectorAll("#contactTable tr:not(:first-child):visible").length === 0) {
    //     noResultDiv.style.display = "block"; // Show 'noResult' div
    // } else {
    //     noResultDiv.style.display = "none"; // Hide 'noResult' div
    // }
}    
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("contactTable");
    switching = true;
    dir = "asc";

    while (switching) {
        
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
        
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
            switchcount ++;
            } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }  
}