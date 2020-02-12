var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCodeInput = document.getElementById('zipCode');
console.log(zipCodeInput)
var venueInput = document.getElementById('venue');
var map;
var coord;
function initMap(coord) {
console.log(coord);
map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.634930499999996,
      lng: -117.74050059999999},
    zoom: 12
  });
}
var formInfo = new SearchForm(submitButton, zipCodeInput);
var app = new App(formInfo, zipCodeInput, initMap);
