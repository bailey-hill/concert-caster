class SearchForm {
  constructor(submitButton, zipCodeInput) {
    this.formValidation = this.formValidation.bind(this)
    this.submitButton = submitButton.addEventListener('click', this.formValidation);

  }
  formValidation(event, zipCodeInput, venueInput){
    event.preventDefault();

    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeInput.value) ? zipCodeInput.value = zipCodeInput.value : zipCodeInput.value = ''; zipCodeInput.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;

    var zipCode = zipCodeInput.value;
    getWeather(zipCode);
    getLocation(zipCode);
    // initMap(coord)
    return zipCode;
  }
}
