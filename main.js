var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

$.ajax({
  method: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // Parse the response.
    // Do other things.
  },
  error: function (xhr, status, err) {
    console.error(err);
  }
});
$.ajax({
  method: "GET",
  url: 'https://api.openweathermap.org/data/2.5/forecast?zip=92870,us&appid=d8c2bb12af67678ecbbb1c4e8977df25',
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // Parse the response.
    // Do other things.
  },
  error: function (xhr, status, err) {
    console.error(err);
  }
});

$('form').serializeArray();

var submitButton = document.getElementById('submitButton');
var events = {
  formValidation() {
    var zipCodeInput = document.getElementById('zipCode').textContent;
    // var cityInput = document.getElementById('cityInput').textContent;
    // var eventInput = document.getElementById('eventInput').textContent;
    // var dateInput = document.getElementById('dateInput').textContent;
    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeInput) ? zipCodeInput = zipCodeInput : zipCodeInput = 'Please enter a valid zip code'; //RegEx Zipcode test, returns boolean;

  },
  resetForm(event) {
    event.preventDefault();
    // var formData = new FormData(event.target);
    event.target.reset();
  },
  submitEvent() {
    submitButton.addEventListener('click', this.formValidation);
  },
  resetEvent() {
    resetButton.addEventListener('click', this.resetForm);
  }
}
events.submitEvent();
