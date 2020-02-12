class SearchForm {
  constructor(submitButton, zipCodeInput) {
    this.getWeather = null;
    this.getLocation = null;
    this.ticketmasterEvent = null;
    this.zipCodeInput = zipCodeInput
    this.tieAPIs = this.tieAPIs.bind(this)
    this.formValidation = this.formValidation.bind(this)
    this.submitButton = submitButton;
    this.submitButton.addEventListener('click', this.formValidation)
  }
  tieAPIs(getWeather, getLocation, ticketmasterEvent) {
    this.getWeather = getWeather;
    this.getLocation = getLocation;
    this.ticketmasterEvent = ticketmasterEvent;
  }
  formValidation(event) {
    event.preventDefault();
    var zipCode = this.zipCodeInput;
    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode.value) ? zipCode.vaue = zipCode.value : zipCode.value = ''; zipCode.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;
    this.getLocation(zipCode.value);
    this.getWeather(zipCode.value);
    this.ticketmasterEvent(zipCode);
    console.log("Return Zip:", zipCode);
    return zipCode;
  }
}
