// Weather API
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=2b66bb1041cf5c2ab89f9477dd5f8008"

// Lat/Long API
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=2b66bb1041cf5c2ab89f9477dd5f8008"

var lat;
var lon;
var cityName = document.querySelector("#searchInput").value;
var stateCode;
var countryCode;
var limit;
var searchBtn = document.querySelector(".btn-primary");

searchBtn.addEventListener("click", function () {
    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
})
