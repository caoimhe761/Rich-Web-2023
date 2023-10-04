document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.querySelector(".notes");
    const addNoteButton = document.querySelector("#addNote");
    const colorPicker = document.querySelector("#colorPicker");
    const noteTextInput = document.querySelector("#noteText");

    addNoteButton.addEventListener("click", () => {
        const noteColor = colorPicker.value;
        const noteText = noteTextInput.value;
        createNoteElement(noteColor, noteText);
        // Clear the text input after adding a note
        noteTextInput.value = "";
    });

    function createNoteElement(color, text) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.style.backgroundColor = color;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            notesContainer.removeChild(noteElement);
        });

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            // Enable editing when the Edit button is clicked
            enableEditing(noteElement, text);
        });

        const noteTextElement = document.createElement("p");
        noteTextElement.innerText = text;

        noteElement.appendChild(deleteButton);
        noteElement.appendChild(editButton);
        noteElement.appendChild(noteTextElement);
        notesContainer.appendChild(noteElement);
    }
    
        function enableEditing(noteElement, initialText) {
            const noteTextElement = noteElement.querySelector("p");
            const editTextInput = document.createElement("input");
            editTextInput.type = "text";
            editTextInput.value = initialText;
    
            const saveButton = document.createElement("button");
            saveButton.innerText = "Save";
            saveButton.addEventListener("click", () => {
                const newText = editTextInput.value;
                noteTextElement.innerText = newText;
                noteElement.removeChild(editTextInput);
                noteElement.removeChild(saveButton);
                noteElement.appendChild(noteTextElement);
            });
    
            const deleteButton = document.createElement("button"); // Create a Delete button
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => {
                notesContainer.removeChild(noteElement);
            });
    
            // Remove the existing edit input and save button if they exist
            const existingEditInput = noteElement.querySelector("input[type='text']");
            const existingSaveButton = noteElement.querySelector("button");
            if (existingEditInput) {
                noteElement.removeChild(existingEditInput);
            }
            if (existingSaveButton) {
                noteElement.removeChild(existingSaveButton);
            }
    
            noteElement.removeChild(noteTextElement);
            noteElement.appendChild(editTextInput);
            noteElement.appendChild(saveButton);
            noteElement.appendChild(deleteButton); // Add the Delete button
        }
    });
    