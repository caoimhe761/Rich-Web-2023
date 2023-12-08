import React, { useState, useEffect } from 'react';
import './style.css';

function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [noteColor, setNoteColor] = useState('#ff5733');
    const [noteText, setNoteText] = useState('');
    const [weatherLocation, setWeatherLocation] = useState('');
    const [fetchWeatherOnClick, setFetchWeatherOnClick] = useState(false);
    const [sortingDirection, setSortingDirection] = useState('asc');
    const [deletedNotes, setDeletedNotes] = useState([]);

    const deleteNote = (index) => {
        const deletedNote = notes[index];
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        setDeletedNotes([...deletedNotes, deletedNote]);
    };
    
    useEffect(() => {
        // Fetch weather when weatherLocation changes
        if (weatherLocation && fetchWeatherOnClick) {
            getWeather(weatherLocation);
        }
    }, [weatherLocation, fetchWeatherOnClick]);


    const sortNotes = () => {
        // Toggle between ascending and descending order
        const newSortingDirection = sortingDirection === 'asc' ? 'desc' : 'asc';
    
        // Create a sorted copy of the notes based on the text and sorting direction
        const sortedNotes = [...notes].sort((a, b) => {
            const compareResult = a.text.localeCompare(b.text);
            return newSortingDirection === 'asc' ? compareResult : -compareResult;
        });
    
        // Update the state with the sorted notes and new sorting direction
        setNotes(sortedNotes);
        setSortingDirection(newSortingDirection);
    };
    
    // Add a button in your render
    <button onClick={sortNotes}>Sort Notes {sortingDirection === 'asc' ? 'Ascending' : 'Descending'}</button>
    
    const addNote = () => {
        setNotes([{ color: noteColor, text: noteText }, ...notes]);
        setNoteText('');
    };

    const clearNotes = () => {
        setNotes([]);
    };

    const undoDelete = () => {
        if (deletedNotes.length > 0) {
            const lastDeletedNote = deletedNotes.pop();
            setNotes([...notes, lastDeletedNote]);
            setDeletedNotes([...deletedNotes]);
        }
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

    const getWeather = async (location) => {
        try {
            const apiKey = '06e84159fec2a9e6fb26565e931a6e77';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
            const response = await fetch(apiUrl);
    
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
    
            const data = await response.json();
    
            if (!data.weather || !data.weather[0]) {
                throw new Error('Invalid weather data');
            }
    
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
    
            // Create a note with weather information
            const noteColor = '#ff0000';
            const noteText = `Weather in ${location}: ${weatherDescription}, Temperature: ${temperature}°C`;
            createNoteElement(noteColor, noteText);
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        }
    };
    
    const createNoteElement = (color, text) => {
        setNotes([{ color, text }, ...notes]);
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
                <input
                    type="text"
                    id="weatherLocation"
                    placeholder="Enter location for weather"
                    value={weatherLocation}
                    onChange={(e) => setWeatherLocation(e.target.value)}
                />
                <button onClick={() => { setFetchWeatherOnClick(true); getWeather(weatherLocation); }}>
                    Get Weather
                </button>
            </div>
            {/* Add a CSS class for the button container */}
            <div className="button-container">
                <button onClick={clearNotes}>Clear Notes</button>
                <button onClick={sortNotes}>Sort Notes {sortingDirection === 'asc' ? 'Ascending' : 'Descending'}</button>
                <button onClick={undoDelete}>Undo Delete</button>
            </div>

        </div>
    );
}

export default NoteApp;
