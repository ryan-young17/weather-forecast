// Weather API
// var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=2b66bb1041cf5c2ab89f9477dd5f8008"

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
            // var lat = data.lat;
            // var lon = data.lon;
        })
        .catch(function (error) {
            console.log(error);
        });
};


searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCityCoordinates();
});

// document.querySelector("#searchInput").value;
