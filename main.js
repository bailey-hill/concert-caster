var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCode;
function formValidation(event) {
  event.preventDefault();
  // console.log(zipCodeInput);
  var zipCodeInput = document.getElementById('zipCode');
  // var cityInput = document.getElementById('cityInput').textContent;
  var venueInput = document.getElementById('venue');
  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeInput.value) ? zipCodeInput.value = zipCodeInput.value : zipCodeInput.value = ''; zipCodeInput.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;
  zipCode = zipCodeInput.value;
  getWeather(zipCode);
  return zipCode;
};
submitButton.addEventListener('click', formValidation);
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

function getWeather(zipCode) {
  console.log(zipCode);
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=d8c2bb12af67678ecbbb1c4e8977df25",
    async: true,
    dataType: "json",
    success: function (data) {
      console.log(data);
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
