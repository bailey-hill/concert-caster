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