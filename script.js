const weatherApi = {
    key: "566b60ef3dbbdde5589a013ed682720a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

console.log(weatherApi)
const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {

    if (event.key == 'Enter') {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});
// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => {
            console.log(`fetched ${city}`);
            return response.json();
        })
        .then(showWeatherReport);
}
// Show weather report 
function showWeatherReport(weather) {
    // console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (in) /
   ${Math.ceil(weather.main.temp_max)}&deg;C (Max)`;
    let humidity = document.getElementById("humid")
    humidity.innerHTML = `Humidity: ${weather.main.humidity}`
    let weatherType = document.getElementById('weather');
    weatherType.innerText = ` ${weather.weather[0].main}`
    console.log(weatherType.innerText);

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    if (weatherType.innerText =="Clear") {
        console.log(weatherType.textContents)
        document.body.style.backgroundImage = "url('clearday.jpeg')"
    } else if (weatherType.innerText == 'Clouds') {
        document.body.style.backgroundImage = "url('cloudy.jpeg')"
    }
    else if (weatherType.innerText == 'Rain') {
        document.body.style.backgroundImage = "url('rain.jpeg')"
    }
    else if (weatherType.innerText == 'Snow') {
        document.body.style.backgroundImage = "url('snow.jpeg')"
    }
    else if (weatherType.innerText == 'Mist') {
        document.body.style.backgroundImage = "url('mist.jpeg')"
    }
    else if (weatherType.innerText == 'Smoke') {
        document.body.style.backgroundImage = "url('smoke1.jpeg')"
    }
    else if (weatherType.innerText == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('thunderstorm.jpeg')"
    }
}
// Date manage
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} ${day}, ${year}`;
} 
