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
    var temperatureRow = document.getElementById("temperatureRow");
    var weatherRow = document.getElementById("weatherRow");
    var dateRow = document.getElementById("dateRow");
    var H2 = document.getElementById("weatherHeader");
    H2.classList.remove("hidden");
    $('#weatherTable tr').empty()
    for (var i = 0; i < data.list.length; i += 8) {
      var tempTd = document.createElement("td");
      var temp = data.list[i].main.temp;
      var mainTest = data.list[i].weather[0].main;
      var dateInfo = data.list[i].dt_txt.slice(5, 10);
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
    this.initMap(this.coord);
    return this.coord;
  }
  getLocation(zipCode) {
    $.ajax({
      type: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "|country:US&key=AIzaSyA_I-JMuk7e9ZFjzIjtX5ax2UnGopLEXJk",
      async: true,
      success: this.handleGetLocationSuccess,
      error: this.handleGetLocationError
    })
  }
  initMap(coord) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: coord,
      zoom: 13
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
  })
}
  handleGetEventError(error) {
    console.error(error)
  }
  handleGetEventSuccess(data) {
    var dataArray = data._embedded.events;
    var sortedArray;
    var concertH2 = document.getElementById("concertHeader");
    concertH2.classList.remove("hidden");
    var concertBody = document.getElementById("concertBody");
    while (concertBody.firstChild) {
      concertBody.removeChild(concertBody.firstChild);
    }
    for (var i = 0; i < dataArray.length; i++) {
      var object = data._embedded.events[i];
    }
    sortedArray = dataArray.sort(function (object1, object2) {
      if (object1.dates.start.localDate > object2.dates.start.localDate) {
        return 1
      } else {
        return -1;
      }
    });
    var concertRowHeader = document.createElement("tr");
    var concertDate = document.createElement("th");
    var concertEvent = document.createElement("th");
    var concertVenue = document.createElement("th");
    concertDate.textContent = "Date";
    concertEvent.textContent = "Performer";
    concertVenue.textContent = "Venue";
    concertRowHeader.append(concertDate);
    concertRowHeader.append(concertEvent);
    concertRowHeader.append(concertVenue);
    concertBody.append(concertRowHeader);
    if (!data._embedded) {
      document.getElementById('noEventText').classList.remove('hidden');
    } else {
      for (var i = 0; i < sortedArray.length; i++) {
        var newConcertRow = document.createElement("tr");
        var datesTd = document.createElement("td");
        var dates = data._embedded.events[i].dates.start.localDate.slice(5, 10);
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
        document.getElementById('noEventText').classList.add('hidden');
      }
    }
  }
  ticketmasterEvent(zipCode) {
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationGenre=Fairs&Festivals&postalCode=" + zipCode + "&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
      success: this.handleGetEventSuccess,
      error: this.handleGetEventError
    })
  }
  startMap() {
    var script = document.createElement('script');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_I-JMuk7e9ZFjzIjtX5ax2UnGopLEXJk');
    document.querySelector('body').appendChild(script);
    navigator.geolocation.getCurrentPosition((coord) => {
      var coords = { lat: coord.coords.latitude, lng: coord.coords.longitude }
      this.initMap(coords);
    });
  }
}
