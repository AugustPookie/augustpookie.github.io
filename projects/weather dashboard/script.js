const apiKey = '4909320189ba2251b950ae548a055782'; // Replace with your OpenWeatherMap API key
const weatherOutput = document.getElementById('weather-output');

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherForTehran();
});

function fetchWeatherForTehran() {
    const location = 'Tehran,ir';
    fetchWeather(location);
}

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayTemperature(data.main.temp);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherOutput.innerHTML = 'Error fetching weather data: ' + error.message;
        });
}

function displayTemperature(temp) {
    weatherOutput.innerHTML = `دما فعلی در شهرک شیردم: ${temp}`;
}
