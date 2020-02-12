var submitButton = document.getElementById('buttonSubmit');
var resetButton = document.getElementById('buttonReset');
var zipCodeInput = document.getElementById('zipCode');
console.log(zipCodeInput)
// var cityInput = document.getElementById('cityInput').textContent;
var venueInput = document.getElementById('venue');

var map;
var coord;

var formInfo = new SearchForm(submitButton, zipCodeInput);

//dynamically create a script element
// append it to



function initMap(coord) {
  console.log(coord);

  //Instantiate new Map object (class is from Google)
  map = new google.maps.Map(document.getElementById('map'), {
    center: app.newCoord,
    zoom: 10
  });
}

var app = new App(formInfo, zipCodeInput, initMap);



// function getWeather(zipCode) {
//   $.ajax({
//     type: "GET",
//     url: "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode+ "&units=imperial&appid=d8c2bb12af67678ecbbb1c4e8977df25",
//     async: true,
//     dataType: "json",
//     success: function (data) {
//       console.log(data)
//       var temperatureOutput = document.getElementById("temperatureRow");
//       var weatherForecast = "";
//       var weatherRow = document.getElementById("weatherRow");
//       var dateRow = document.getElementById("dateRow");

//       for (var i = 0; i < data.list.length; i+=8) {

//         var tempTd = document.createElement("td");
//         var temp = data.list[i].main.temp;


//         var mainTest = data.list[i].weather[0].main;


//         var dateInfo = data.list[i].dt_txt.slice(0, 10);


//         var mainTd = document.createElement("td");
//         mainTd.textContent = mainTest;
//         console.log(mainTest);


//         var dateTd = document.createElement("th");
//         dateTd.textContent = dateInfo;
//         console.log(dateInfo);

//         // var degrees = "u2109";
//         // var degrees = document.write("&#8457");
//         tempTd.textContent = temp + "°F";
//         console.log(temp);

//         temperatureRow.append(tempTd);
//         weatherRow.append(mainTd);
//         dateRow.append(dateTd);
//       }
//     },
//     error: function (error) {
//       console.error(error)
//     }
//   })
// }

// var venueText;
// & keyword=" + venueText

function ticketmasterEvent(zipCode) {
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationGenre=Fairs&Festivals&postalCode=" + zipCode + "&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
    success: function (data) {
      console.log(data)
      var concertDatesRow = document.getElementById("concertDatesRow");
      var concertRow = document.getElementById("concertRow");
      var venueRow = document.getElementById("venueRow");
      var weatherForecast = "";
      for (var i = 0; i < data._embedded.events.length; i++) {
        var datesTd = document.createElement("td");
        var dates = data._embedded.events[i].dates.start.localDate;
        var artistsTd = document.createElement("td");
        var artists = data._embedded.events[i].name;
        var venueTd = document.createElement("td");
        var venue = data._embedded.events[i]._embedded.venues[0].name;
        datesTd.textContent = dates;
        artistsTd.textContent = artists;
        venueTd.textContent = venue;
        concertDatesRow.append(datesTd);
        concertRow.append(artistsTd);
        venueRow.append(venueTd);
      }
    },
    error: function (error) {
      console.error(error)
    }
  })
}
