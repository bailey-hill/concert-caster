class App {
  constructor(formInfo, zipCodeInput) {
    this.formInfo = formInfo
    this.zipCodeInput = zipCodeInput
    this.coord = null;
    this.startMap = this.startMap.bind(this);
    this.initMap = this.initMap.bind(this);
    this.handleGetEventSuccess = this.handleGetEventSuccess.bind(this)
    this.handleGetEventError = this.handleGetEventError.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.handleGetWeatherError = this.handleGetWeatherError.bind(this)
    this.handleGetWeatherSuccess = this.handleGetWeatherSuccess.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.handleGetLocationError = this.handleGetLocationError.bind(this)
    this.handleGetLocationSuccess = this.handleGetLocationSuccess.bind(this)
    this.ticketmasterEvent = this.ticketmasterEvent.bind(this)
    this.formInfo.tieAPIs(this.getWeather, this.getLocation, this.ticketmasterEvent)
  }
  handleGetWeatherError(error) {
    console.error(error)
  }
  handleGetWeatherSuccess(data) {
    var temperatureOutput = document.getElementById("temperatureRow");
    var weatherForecast = "";
    var weatherRow = document.getElementById("weatherRow");
    var dateRow = document.getElementById("dateRow");

    for (var i = 0; i < data.list.length; i += 8) {
      var tempTd = document.createElement("td");
      var temp = data.list[i].main.temp;
      var mainTest = data.list[i].weather[0].main;
      var dateInfo = data.list[i].dt_txt.slice(0, 10);
      var mainTd = document.createElement("td");
      mainTd.textContent = mainTest;
      var dateTd = document.createElement("th");
      dateTd.textContent = dateInfo;
      tempTd.textContent = temp + "°F";
      temperatureRow.append(tempTd);
      weatherRow.append(mainTd);
      dateRow.append(dateTd);
    }
  }
  getWeather(zipCode) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=d8c2bb12af67678ecbbb1c4e8977df25",
      success: this.handleGetWeatherSuccess,
      error: this.handleGetWeatherError
    })
  }
  handleGetLocationError(error) {
    console.error(error)
  }
  handleGetLocationSuccess(data) {
    this.coord = data.results[0].geometry.location;
    // setTimeout(() => {
    // }, 1000);
    this.initMap(this.coord);
    console.log(this.coord);
    return this.coord;
  }
  getLocation(zipCode) {
    $.ajax({
      type: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "|country:US&key=AIzaSyD2apacQ6gjcKfQNOxYiJyKi2gGs5911CI",
      async: true,
      success: this.handleGetLocationSuccess,
      error: this.handleGetLocationError
    })
  }
  initMap(coord) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: coord,
      zoom: 13
    });
  }
  handleGetEventError(error) {
    console.log(error)
  }
  handleGetEventSuccess(data) {
    console.log(data)
    var concertBody = document.getElementById("concertBody");
    var weatherForecast = "";
    for (var i = 0; i < data._embedded.events.length; i++) {
      var newConcertRow = document.createElement("tr");
      var datesTd = document.createElement("td");
      var dates = data._embedded.events[i].dates.start.localDate;
      var artistsTd = document.createElement("td");
      var artists = data._embedded.events[i].name;
      var venueTd = document.createElement("td");
      var venue = data._embedded.events[i]._embedded.venues[0].name;
      datesTd.textContent = dates;
      artistsTd.textContent = artists;
      venueTd.textContent = venue;
      newConcertRow.append(datesTd);
      newConcertRow.append(artistsTd);
      newConcertRow.append(venueTd);
      concertBody.append(newConcertRow);
    }
  }
  ticketmasterEvent(zipCode) {
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationGenre=Fairs&Festivals&postalCode=" + zipCode.value + "&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
      success: this.handleGetEventSuccess,
      error: this.handleGetEventError
    })
  }
  startMap() {
    var script = document.createElement('script');
    script.async = true;
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2apacQ6gjcKfQNOxYiJyKi2gGs5911CI');
    document.querySelector('body').appendChild(script);
    navigator.geolocation.getCurrentPosition((coord) => {
      var coords = {lat: coord.coords.latitude, lng: coord.coords.longitude}
      this.initMap(coords);
    });
  }
}
