class App {
  constructor(formInfo, zipCodeInput, initMap) {
    this.formInfo = formInfo
    this.zipCodeInput = zipCodeInput
    this.initMap = initMap
    this.coord = null;
    this.handleGetEventSuccess = this.handleGetEventSuccess.bind(this)
    this.handleGetEventError = this.handleGetEventError.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.handleGetWeatherError = this.handleGetWeatherError.bind(this)
    this.handleGetWeatherSuccess = this.handleGetWeatherSuccess.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.handleGetLocationError = this.handleGetLocationError.bind(this)
    this.handleGetLocationSuccess = this.handleGetLocationSuccess.bind(this)
    this.formInfo.tieWeatherAndLocation(this.getWeather, this.getLocation)
    // this.newCoord = null;
    // this.redefineCoordProperty = this.redefineCoordProperty.bind(this)
  }
  //Get Weather

  handleGetWeatherError(error) {
    console.error(error)
  }
  handleGetWeatherSuccess(data) {
    var weatherOutput = document.getElementById("weatherOutput");
    var weatherForecast = "";
    var weatherElement = document.createElement("p");

    for (var i = 0; i < data.list.length; i++) {
      var weatherElement = document.createElement("p");
      var temp = data.list[i].main.temp;
      weatherElement.textContent = temp;

      // console.log("Temperature:", temp);
      weatherOutput.append(weatherElement);

      $.each(data.list, function (index, val) {
      weatherForecast += val.main.temp;
      })

      weatherElement.textContent = weatherForecast;
      weatherOutput.append(weatherElement);
    }
  }
  getWeather(zipCode) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=d8c2bb12af67678ecbbb1c4e8977df25&cnt=5",
      success: this.handleGetWeatherSuccess,
      error: this.handleGetWeatherError
    })
  }

  //Get Location
//   redefineCoordProperty(coord) {
//   this.newCoord = this.coord;
//   console.log("NewCoord:", this.newCoord);
// }
  handleGetLocationError(error) {
    console.error(error)
  }
  handleGetLocationSuccess(data) {
    console.log(data)
    this.coord = data.results[0].geometry.location;

    console.log("getLocationSuccess:", this.coord);
    this.initMap(this.coord)

    // this.redefineCoordProperty(this.coord);

    // this.coord = this.coord
    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: this.coord,
    //   zoom: 10
    // });
    return this.coord;

  }
  getLocation(zipCode) {
    $.ajax({
      type: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?components=" + zipCode + "|country:US&key=AIzaSyD2apacQ6gjcKfQNOxYiJyKi2gGs5911CI",
      async: true,
      success: this.handleGetLocationSuccess,
      error: this.handleGetLocationError
    })
  }

  //Get Event

  handleGetEventError(error){
      console.log(error)
  }
  handleGetEventSuccess(data){
      console.log(data)
  }
  ticketmasterEvent() {
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationGenre=Fairs&Festivals&keyword=" + venueText + "&postalCode=" + zipCode + "&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
      success: this.handleGetEventSuccess,
      error: this.handleGetEventError
    })
  }
}
