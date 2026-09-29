const API_KEY = "KEY";

console.log("Weather app started");

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("getweather-btn");

const status = document.getElementById("status");
const locationName = document.getElementById("locat");
const country = document.getElementById("locat1");
const temperature = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchButton.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        status.textContent = "Please enter a city";
        return;
    }

    status.textContent = "Searching...";
    locationName.textContent = city;

    getWeather(city);
});


async function getWeather(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            status.textContent = "Unable to get weather";
            temperature.textContent = "--°C";
            humidity.textContent = "Humidity: --";
            wind.textContent = "Wind: --";
            country.textContent = "--";
            return;
        }

        status.textContent = data.weather[0].description;

        locationName.textContent = data.name;

        country.textContent = data.sys.country;

        temperature.textContent = `${Math.round(data.main.temp)}°C`;

        humidity.textContent = `Humidity: ${data.main.humidity}%`;

        wind.textContent = `Wind: ${data.wind.speed} m/s`;

    } catch (error) {

        console.error(error);

        status.textContent = "Something went wrong";
        temperature.textContent = "--°C";
        humidity.textContent = "Humidity: --";
        wind.textContent = "Wind: --";
        country.textContent = "--";
    }
}
