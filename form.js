class SearchForm {
  constructor(submitButton, zipCodeInput) {
    this.getWeather = null;
    this.getLocation = null;
    this.zipCodeInput = zipCodeInput
    this.tieWeatherAndLocation = this.tieWeatherAndLocation.bind(this)
    this.formValidation = this.formValidation.bind(this)
    this.submitButton = submitButton;
    this.submitButton.addEventListener('click', this.formValidation)
  }
  tieWeatherAndLocation(getWeather, getLocation) {
    this.getWeather = getWeather;
    this.getLocation = getLocation;
  }
  formValidation(event) {
    event.preventDefault();
    var zipCode = this.zipCodeInput;
    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode.value) ? zipCode.vaue = zipCode.value : zipCode.value = ''; zipCode.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;
    this.getLocation(zipCode.value);
    this.getWeather(zipCode.value);
  }
}
