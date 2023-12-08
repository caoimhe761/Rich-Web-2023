// weatherFunctions.js

export const createNoteElement = (color, text, setNotes, notes) => {
    setNotes([{ color, text }, ...notes]);
};

export const getWeather = async (location, createNoteElement, setNotes) => {
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
        createNoteElement(noteColor, noteText, setNotes);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
};



