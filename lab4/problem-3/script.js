document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.querySelector(".notes");
    const addNoteButton = document.querySelector("#addNote");
    const colorPicker = document.querySelector("#colorPicker");
    const noteTextInput = document.querySelector("#noteText");

    const notes = new Set(); // Using a Set to keep track of all notes

    addNoteButton.addEventListener("click", () => {
        const noteColor = colorPicker.value;
        const noteText = noteTextInput.value;
        const parentNote = null; // Top-level note initially has no parent

        const newNote = createNoteElement(noteColor, noteText, parentNote);
        notes.add(newNote);

        // Clear the text input after adding a note
        noteTextInput.value = "";
    });

    function createNoteElement(color, text, parent) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.style.backgroundColor = color;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteNoteAndChildren(noteElement);
        });

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            enableEditing(noteElement, text);
        });

        const noteTextElement = document.createElement("p");
        noteTextElement.innerText = text;

        noteElement.appendChild(deleteButton);
        noteElement.appendChild(editButton);
        noteElement.appendChild(noteTextElement);

        noteElement.parentNote = parent; // Assigning the parent property

        notesContainer.appendChild(noteElement);
        return noteElement;
    }

    function deleteNoteAndChildren(noteElement) {
        const parentNote = noteElement.parentNote;

        // Delete the note and its children
        notes.delete(noteElement);
        notesContainer.removeChild(noteElement);

        // Delete the children recursively
        for (const childNote of notes) {
            if (childNote.parentNote === noteElement) {
                deleteNoteAndChildren(childNote);
            }
        }
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
    
        const deleteButton = document.createElement("button");
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
        noteElement.appendChild(deleteButton);
    }
    
    
    // ... (If there's more code after enableEditing, include it here.)
});
