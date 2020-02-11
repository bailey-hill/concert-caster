var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCodeInput = document.getElementById('zipCode');
// var cityInput = document.getElementById('cityInput').textContent;
var venueInput = document.getElementById('venue');

var map;
var coord;
console.log(coord);

function initMap(coord) {
  console.log(coord);

  //Instantiate new Map object (class is from Google)
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.9098939, lng: -117.81626},
    zoom: 10
  });
}

var formInfo = new SearchForm(submitButton);
function getWeather(zipCode) {
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&appid=d8c2bb12af67678ecbbb1c4e8977df25",
    async: true,
    dataType: "json",
    success: function (data) {
      console.log(data);
      // var weatherOutput = document.getElementById("weatherOutput");
      // var weatherForecast = "";
      // for (var i = 0; i < data.list.length; i++) {
      //   var weatherElement = document.createElement("p");
      //   var temp = data.list[i].main.temp;
      //   weatherElement.textContent = temp;
      //   console.log(temp);
      //   weatherOutput.append(weatherElement);
      // }
      // $.each(data.list, function (key, value) {
      // weatherForecast += value.main.temp;
      // })
      // weatherOutput.append(weatherElement);
    },
    error: function (error) {
      console.error(error)
    }
  })
}

function ticketmasterEvent() {
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationGenre=Fairs&Festivals&keyword=" + venueText + "&postalCode=" + zipCode + "&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
    success: function (data) {
      console.log(data)
    },
    error: function (error) {
      console.error(error)
    }
  })
}
