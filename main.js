var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCodeInput = document.getElementById('zipCode');
// var cityInput = document.getElementById('cityInput').textContent;
var venueInput = document.getElementById('venue');

var map;
var coord;

var formInfo = new SearchForm(submitButton, zipCodeInput);
var app = new App(formInfo, zipCodeInput, coord);
console.log("App.coord:", app.coord);

function initMap(coord) {
  console.log(coord);

  //Instantiate new Map object (class is from Google)
  map = new google.maps.Map(document.getElementById('map'), {
    center: app.newCoord,
    zoom: 10
  });
}
