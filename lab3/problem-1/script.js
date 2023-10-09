
document.addEventListener("DOMContentLoaded", () => {
    const addContactButton = document.querySelector("#addContact");
    const contactTable = document.getElementById("contactTable");
    const errorDiv = document.querySelector("#error");
    // const name = document.querySelector("#name");
    // const mobile = document.querySelector("#mobile");
    // const email = document.querySelector("#email");

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
            return ;
        }
        const validationError = validateContact(name, mobile, email);

        if (validationError) {
            // Display the error message to the user, e.g., in an alert or on the page
            errorDiv.textContent = (validationError);
            errorDiv.style.display = "block";
            return
        }

        const contact = { name, mobile, email };
        contacts.push(contact);

       

        // // Add contact to the table
        const tableBody = document.querySelector("#contactTable tbody");
        const newRow = tableBody.insertRow(-1);// Insert at the end of the table
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = mobile;
        newRow.insertCell(2).textContent = email;

         // Reset input fields
         name.value = "";
         mobile.value = "";
         email.value = "";
        // Sort table by name
        //sortTable(0);

    }

    
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