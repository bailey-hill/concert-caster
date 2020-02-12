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
    console.log(this)
    event.preventDefault();
    var zipCode = this.zipCodeInput.value;
    console.log("ZipCode:", zipCode);

    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode) ? zipCode = zipCode : zipCode = ''; this.zipCodeInput.setAttribute('placeholder', 'Please enter a valid zip code'); //RegEx Zipcode test, returns boolean;

    console.log("ZipCode2:", zipCode);

    this.getLocation(zipCode);
    this.getWeather(zipCode);
    this.ticketmasterEvent(zipCode);
    console.log("Return Zip:", zipCode);
    return zipCode;
  }
}
