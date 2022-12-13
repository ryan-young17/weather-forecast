var searchBtn = document.querySelector(".btn");
var featuredCard = document.querySelector(".featured-card");
var forecastCards = document.querySelector(".forecast-cards");

var getCityCoordinates = function () {
    var cityName = document.querySelector("#searchInput");
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "&limit=1&appid=2b66bb1041cf5c2ab89f9477dd5f8008";
    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeatherForecast(lat, lon);
    })
    .catch(function (error) {
        console.log(error);
    });
};

var getWeatherForecast = function (lat, lon) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=2b66bb1041cf5c2ab89f9477dd5f8008&units=imperial";
    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data, data.list);
        })
        .catch(function (error) {
            console.log(error);
        });
};

var displayWeather = function (data, list) {
    // // FEATURE CARD
    var featureCardEl = document.createElement("div");
    featureCardEl.className = "card m-5 bg-success text-light";
    // // FEATURE CARD BODY
    var featureCardBody = document.createElement("div");
    featureCardBody.className = "card-body";
    // // FEATURE CARD HEADER
    var featureCardHeader = document.createElement("h5");
    featureCardHeader.className = "card-title";
    featureCardHeader.textContent = data.city.name + " " + "(" + list[0].dt_txt + ")";
    // // FEATURE CARD TEMP LINE
    var featureCardTemp = document.createElement("p");
    featureCardTemp.className = "card-text";
    featureCardTemp.textContent = "Temp: " + list[0].main.temp + "\u00B0 F";
    // // FEATURE CARD HUMIDITY LINE
    var featureCardHumidity = document.createElement("p");
    featureCardHumidity.className = "card-text";
    featureCardHumidity.textContent = "Humidity: " + list[0].main.humidity + " %";
    // // FEATURE CARD WIND LINE
    var featureCardWind = document.createElement("p");
    featureCardWind.className = "card-text";
    featureCardWind.textContent = "Wind: " + list[0].wind.speed + " MPH";

    featuredCard.appendChild(featureCardEl);
    featureCardEl.appendChild(featureCardBody);
    featureCardBody.append(featureCardHeader, featureCardTemp, featureCardHumidity, featureCardWind);
    
    for (var i = 7; i < 40; i = i + 8) {          
        // FIVE-DAY FORECAST CARDS

        var cardEl = document.createElement("div");
        cardEl.className = "card col me-3 bg-dark text-light";
        // CARD BODY
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        // CARD HEADER
        var cardHeader = document.createElement("h5");
        cardHeader.className = "card-title";
        cardHeader.textContent = list[i].dt_txt;
        // CARD TEMP LINE
        var cardTemp = document.createElement("p");
        cardTemp.className = "card-text";
        cardTemp.textContent = "Temp: " + list[i].main.temp + "\u00B0 F";
        // CARD HUMIDITY LINE
        var cardHumidity = document.createElement("p");
        cardHumidity.className = "card-text";
        cardHumidity.textContent = "Humidity: " + list[i].main.humidity + " %";
        // CARD WIND LINE
        var cardWind = document.createElement("p");
        cardWind.className = "card-text";
        cardWind.textContent = "Wind: " + list[i].wind.speed + " MPH";
        
        forecastCards.appendChild(cardEl);
        cardEl.appendChild(cardBody);
        cardBody.append(cardHeader, cardTemp, cardHumidity, cardWind);
    }
};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCityCoordinates();
});
