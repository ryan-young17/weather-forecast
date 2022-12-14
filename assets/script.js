var searchBtn = document.querySelector(".btn");
var featuredCard = document.querySelector(".featured-card");
var forecastCards = document.querySelector(".forecast-cards");
var searchForm = document.querySelector("form");

var getCityCoordinates = function () {
    var cityName = document.querySelector("#searchInput");
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "&limit=1&appid=2b66bb1041cf5c2ab89f9477dd5f8008";
    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getWeatherForecast(data[0].lat, data[0].lon);
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
        console.log(data);
        displayWeather(data, data.list);
    })
    .catch(function (error) {
        console.log(error);
    });
};

var displayWeather = function (data, list) {
    featuredCard.innerHTML = null;
    forecastCards.innerHTML = null;
    // FEATURE CARD
    var featureCardEl = document.createElement("div");
    featureCardEl.className = "card m-5 bg-success text-light";
    // FEATURE CARD BODY
    var featureCardBody = document.createElement("div");
    featureCardBody.className = "card-body";
    // FEATURE CARD HEADER
    var featureCardHeader = document.createElement("h5");
    featureCardHeader.className = "card-title";
    if (data.list[0].weather.main === "clear") {
        featureCardHeader.textContent = data.city.name + " " + "(" + list[0].dt_txt.slice(0, -9) + ")" + " \u2600\uFE0F";
    } else if (data.list[0].weather.main === "clouds") {
        featureCardHeader.textContent = data.city.name + " " + "(" + list[0].dt_txt.slice(0, -9) + ")" + " \u2601\uFE0F";
    } else {
        featureCardHeader.textContent = data.city.name + " " + "(" + list[0].dt_txt.slice(0, -9) + ")" + " \uD83C\uDF27\uFE0F";
    }
    // FEATURE CARD TEMP LINE
    var featureCardTemp = document.createElement("p");
    featureCardTemp.className = "card-text";
    featureCardTemp.textContent = "Temp: " + list[0].main.temp + "\u00B0 F";
    // FEATURE CARD HUMIDITY LINE
    var featureCardHumidity = document.createElement("p");
    featureCardHumidity.className = "card-text";
    featureCardHumidity.textContent = "Humidity: " + list[0].main.humidity + " %";
    // FEATURE CARD WIND LINE
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
        cardHeader.textContent = list[i].dt_txt.slice(0, -9);
        // CARD WEATHER ICON
        var cardWeatherIcon = document.createElement("p");
        if (data.list[i].weather.main === "clear") {
            cardWeatherIcon.textContent = " \u2600\uFE0F";
        } else if (data.list[i].weather.main === "clouds") {
            cardWeatherIcon.textContent = " \u2601\uFE0F";
        } else {
            cardWeatherIcon.textContent = " \uD83C\uDF27\uFE0F";
        }
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
        cardBody.append(cardHeader, cardWeatherIcon, cardTemp, cardHumidity, cardWind);
    }

};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCityCoordinates();
    var cityName = document.querySelector("#searchInput");
    localStorage.setItem("City", cityName.value);
    displayPastSearch(cityName.value);
});

var displayPastSearch = function (value) {
    localStorage.getItem(value);
    var cityBtnContainer = document.createElement("div");
    cityBtnContainer.className = "d-grid gap-2 mt-1";
    var cityBtn = document.createElement("button");
    cityBtn.className = "btn btn-outline-light";
    cityBtn.textContent = value;

    searchForm.appendChild(cityBtnContainer);
    cityBtnContainer.append(cityBtn);

    cityBtn.addEventListener("click", function(event) {
        event.preventDefault();
        cityBtn.value = cityBtn.textContent;
        var cityName = cityBtn.textContent;
        var newSearchUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=2b66bb1041cf5c2ab89f9477dd5f8008";
        fetch(newSearchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getWeatherForecast(data[0].lat, data[0].lon);
        })
        .catch(function (error) {
            console.log(error);
        });
        displayWeather();
    });

};

