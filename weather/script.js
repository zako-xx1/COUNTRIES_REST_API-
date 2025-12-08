const apiKeys = "7051066a81e42342c7bb809bd437351c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const Icon = document.querySelector(".weather-icon");

// create async function for udpdate data.
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKeys}`);


    // this if else condition for if entry invalid number so show invalid city else if enter valid city so show data.
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
    // reponse data convert to json format.
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".himidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        Icon.src = "assets/clouds.png"
    } else if (data.weather[0].main == "Clear") {
        Icon.src = "assets/clear.png"
    } else if (data.weather[0].main == "Rain") {
        Icon.src = "assets/rain.png"
    } else if (data.weather[0].main == "Drizzle") {
        Icon.src = "assets/drizzle.png"
    } else if (data.weather[0].main == "Mist") {
        Icon.src = "assets/mist.png"
    } else if (data.weather[0].main == "Snow") {
        Icon.src = "assets/snow.png"
    } else if (data.weather[0].main == "Haze") {
        Icon.src = "assets/haze.png"
    } else if (data.weather[0].main == "Smoke") {
        Icon.src = "assets/smoke.png"
    }


}

// add event listener in button was click when button click search box value store in checkweather function parameter
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})