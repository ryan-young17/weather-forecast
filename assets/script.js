var searchBtn = document.querySelector(".btn");

var getCityCoordinates = function () {
    var cityName = document.querySelector("#searchInput");
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "&limit=1&appid=2b66bb1041cf5c2ab89f9477dd5f8008";
    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
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
            console.log(data);
            displayWeather(data, data.list);
        })
        .catch(function (error) {
            console.log(error);
        });
};

var displayWeather = function (data, list) {
    for (var i = 0; i < 40; i = i + 8) {
        console.log(list[i].main.temp);
        console.log(list[i].main.humidity);
        console.log(list[i].wind.speed);
        console.log(list[i].dt_txt);
        console.log(data.city.name);           
        // // FEATURE CARD
        var featureCard = document.createElement("div");
        featureCard.className = "card m-5 bg-success text-light";
        // // FEATURE CARD BODY
        var featureCardBody = document.createElement("div");
        featureCardBody.className = "card-body";
        // // FEATURE CARD HEADER
        var featureCardHeader = document.createElement("h5");
        featureCardHeader.className = "card-title";
        featureCardHeader.textContent = data.city.name;
        // // FEATURE CARD TEMP LINE
        var featureCardTemp = document.createElement("p");
        featureCardTemp.className = "card-text";
        featureCardTemp.textContent = list[0].main.temp;
        // // FEATURE CARD HUMIDITY LINE
        var featureCardHumidity = document.createElement("p");
        featureCardHumidity.className = "card-text";
        featureCardHumidity.textContent = list[0].main.humidity;
        // // FEATURE CARD WIND LINE
        var featureCardWind = document.createElement("p");
        featureCardWind.className = "card-text";
        featureCardWind.textContent = list[0].wind.speed;

        // FIVE-DAY FORECAST CARDS

        var CardEl = document.createElement("div");
        CardEl.className = "card col me-3 bg-dark text-light";
        // CARD BODY
        var CardBody = document.createElement("div");
        CardBody.className = "card-body";
        // CARD HEADER
        var CardHeader = document.createElement("h5");
        CardHeader.className = "card-title";
        CardHeader.textContent = data.city.name;
        // CARD TEMP LINE
        var CardTemp = document.createElement("p");
        CardTemp.className = "card-text";
        CardTemp.textContent = list[i].main.temp;
        // CARD HUMIDITY LINE
        var CardHumidity = document.createElement("p");
        CardHumidity.className = "card-text";
        CardHumidity.textContent = list[i].main.humidity;
        // CARD WIND LINE
        var CardWind = document.createElement("p");
        CardWind.className = "card-text";
        CardWind.textContent = list[i].wind.speed;


    }
};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCityCoordinates();
});
