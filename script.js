// weather.js

const apiKey = "09cdba6a304d728790e073bfbe0ef904"; // Your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.getElementById("loader"); // Loader element

// Show the loader
function showLoader() {
    loader.style.display = "block";
}

// Hide the loader
function hideLoader() {
    loader.style.display = "none";
}

async function checkWeather(city) {
    showLoader(); // Show loader while fetching data
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("Are you sure this is the right city name?");
        }

        const data = await response.json();

        // Update the temperature, city, humidity, and wind speed
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

        // Update the weather icon based on the weather conditions
        const weatherCondition = data.weather[0].main;

        if (weatherCondition === "Clouds") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163620.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005938.png";
        } else {
            weatherIcon.src = "https://cdn-icons-png.freepik.com/256/3658/3658510.png?semt=ais_hybrid"; // Default icon
        }

    } catch (error) {
        alert("You have probably entered a wrong city name, or typed a typo!");
    } finally {
        hideLoader(); // Hide loader after the request completes
    }
}

searchButton.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

// Optional: Allow pressing Enter to search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});