var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCodeInput = document.getElementById('zipCode');
var venueInput = document.getElementById('venue');
var formInfo = new SearchForm(submitButton, zipCodeInput);
var app = new App(formInfo, zipCodeInput);
app.startMap();