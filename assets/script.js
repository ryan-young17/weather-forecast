// Weather API
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=2b66bb1041cf5c2ab89f9477dd5f8008"

// Lat/Long API

var lat;
var lon;
var cityName = "New York";
var limit = 1;
var searchBtn = document.querySelector(".btn");
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=2b66bb1041cf5c2ab89f9477dd5f8008";

searchBtn.addEventListener("click", function (event) {
event.preventDefault();
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
});

// document.querySelector("#searchInput").value;
