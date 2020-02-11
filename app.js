class App {
  constructor(zipCode, venueText) {
    this.handleGetWeatherSuccess = this.handleGetWeatherSuccess.bind(this)
    this.handleGetWeatherError = this.handleGetWeatherError.bind(this)
    this.handleGetLocationSuccess = this.handleGetLocationSuccess.bind(this)
    this.handleGetLocationError = this.handleGetLocationError.bind(this)
  }
  handleGetWeatherError(error) {
    console.error(error)
  }
  handleGetWeatherSuccess(data) {
    console.log(data);
    // var weatherOutput = document.getElementById("weatherOutput");
    // var weatherForecast = "";
    // var weatherElement = document.createElement("p");

    // for (var i = 0; i < data.list.length; i++) {
    //   var weatherElement = document.createElement("p");
    //   var temp = data.list[i].main.temp;
    //   weatherElement.textContent = temp;

    // $.each(data.list, function (index, val) {
    //   weatherForecast += val.main.temp;
    // })
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
      console.log(mainTest);


      var dateTd = document.createElement("th");
      dateTd.textContent = dateInfo;
      console.log(dateInfo);

      // var degrees = "u2109";
      // var degrees = document.write("&#8457");
      tempTd.textContent = temp + "°F";
      console.log(temp);

      temperatureRow.append(tempTd);
      weatherRow.append(mainTd);
      dateRow.append(dateTd);
    }
    }
  getWeather(zipCode) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=d8c2bb12af67678ecbbb1c4e8977df25&cnt=5",
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
