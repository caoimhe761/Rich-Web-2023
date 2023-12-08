import React, { useState, useEffect } from 'react';
import './style.css';

function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [noteColor, setNoteColor] = useState('#ff5733');
    const [noteText, setNoteText] = useState('');

    const deleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };
    const addNote = () => {
        setNotes([{ color: noteColor, text: noteText }, ...notes]);
        setNoteText('');
    };

    const editNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes[index].editing = true;
        setNotes(updatedNotes);
    };

    const saveEdit = (index, newText) => {
        const updatedNotes = [...notes];
        updatedNotes[index].text = newText;
        updatedNotes[index].editing = false;
        setNotes(updatedNotes);
    };

    return (
        <div className="container">
            <h1>Note Taking App</h1>
            <div className="notes">
                {notes.map((note, index) => (
                    <div key={index} className="note" style={{ backgroundColor: note.color }}>
                        <button onClick={() => deleteNote(index)}>Delete</button>
                        <button onClick={() => editNote(index)}>Edit</button>
                        {note.editing ? (
                            <div>
                                <input
                                    type="text"
                                    value={note.text}
                                    onChange={(e) =>
                                        setNotes(
                                            notes.map((n, i) =>
                                                i === index ? { ...n, text: e.target.value } : n
                                            )
                                        )
                                    }
                                />
                                <button onClick={() => saveEdit(index, note.text)}>Save</button>
                            </div>
                        ) : (
                            <p>{note.text}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="controls">
                <input
                    type="color"
                    id="colorPicker"
                    value={noteColor}
                    onChange={(e) => setNoteColor(e.target.value)}
                />
                <input
                    type="text"
                    id="noteText"
                    placeholder="Type your note"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                />
                <button onClick={addNote}>Add Note</button>
                
            </div>

        </div>
    );
}

export default NoteApp;
