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
            displayWeather(data.list);
        })
        .catch(function (error) {
            console.log(error);
        });
};

var displayWeather = function (list) {
    for (var i = 0; i < 6; i++) {
        console.log(list[i].main.temp);
        console.log(list[i].main.humidity);
        console.log(list[i].wind.speed);
    }
};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCityCoordinates();
});
