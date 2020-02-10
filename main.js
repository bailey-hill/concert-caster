var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
function formValidation() {
  // console.log(zipCodeInput);
  var zipCodeInput = document.getElementById('zipCode');
  // var cityInput = document.getElementById('cityInput').textContent;
  var venueInput = document.getElementById('venue');
  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeInput.value) ? zipCodeInput.value = zipCodeInput.value : zipCodeInput.value = ''; zipCodeInput.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;
};
submitButton.addEventListener('click', formValidation);
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}