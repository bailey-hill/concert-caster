var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCode;
var map;
var lnglat;
console.log(lnglat);
function initMap(latlng) {
  console.log(latlng);
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:	33.9098939, lng:	-117.81626},
    zoom: 10
  });
}

function getWeather(zipCode) {
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&appid=d8c2bb12af67678ecbbb1c4e8977df25",
    async: true,
    dataType: "json",
    success: function (data) {
      var weatherOutput = document.getElementById("weatherOutput");
      var weatherForecast = "";
      var weatherElement = document.createElement("p");
      $.each(data.list, function (index, val) {
        weatherForecast += val.main.temp;
      })
      weatherElement.textContent = weatherForecast;
      weatherOutput.append(weatherElement);
    },
    error: function (error) {
      console.error(error)
    }
  })
}

function getLocation(zipCode) {
  $.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "|country:US&key=AIzaSyD2apacQ6gjcKfQNOxYiJyKi2gGs5911CI",
    async: true,
    success: function (data) {
      lnglat = data.results[0].geometry.location;
      return lnglat;
    },
    error: function (error) {
      console.error(error)
    }
  })
}

function formValidation(event) {
  event.preventDefault();
  var zipCodeInput = document.getElementById('zipCode');
  // var cityInput = document.getElementById('cityInput').textContent;
  var venueInput = document.getElementById('venue');
  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeInput.value) ? zipCodeInput.value = zipCodeInput.value : zipCodeInput.value = ''; zipCodeInput.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;
  zipCode = zipCodeInput.value;
  getWeather(zipCode);
  getLocation(zipCode);
  // initMap(latlng)
  return zipCode;
};
submitButton.addEventListener('click', formValidation);

