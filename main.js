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
