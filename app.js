class App {
  constructor(zipCode) {
    this.handleGetWeatherSuccess = this.handleGetWeatherSuccess.bind(this)
    this.handleGetWeatherError = this.handleGetWeatherError.bind(this)
    this.handleGetLocationSuccess = this.handleGetLocationSuccess.bind(this)
    this.handleGetLocationError = this.handleGetLocationError.bind(this)
  }
  handleGetWeatherError(error) {
    console.error(error)
  }
  handleGetWeatherSuccess(data) {
    var weatherOutput = document.getElementById("weatherOutput");
    var weatherForecast = "";
    var weatherElement = document.createElement("p");

    $.each(data.list, function (index, val) {
      weatherForecast += val.main.temp;
    })

    weatherElement.textContent = weatherForecast;
    weatherOutput.append(weatherElement);
  }
  getWeather(zipCode) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&appid=d8c2bb12af67678ecbbb1c4e8977df25",
      async: true,
      dataType: "json",
      success: this.handleGetWeatherSuccess,
      error: this.handleGetWeatherError,
    })
  }
  handleGetLocationError(error) {
    console.error(error)
  }
  handleGetLocationSuccess(data) {
    lnglat = data.results[0].geometry.location;
    return lnglat;
  }
  getLocation(zipCode) {
    $.ajax({
      type: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "|country:US&key=AIzaSyD2apacQ6gjcKfQNOxYiJyKi2gGs5911CI",
      async: true,
      success: this.handleGetLocationSuccess,
      error: this, handleGetLocationError
    })
  }
}
