$(document).ready(function() {

  //get geolocation(could be deprecated); cache location & api info
  // if geolocation no longer works : http://ipinfo.io/
  $.getJSON('http://ipinfo.io', function(data) {
    //console.log(data)
    data.city + data.region
    var locationArr = data.loc.split(',');
    var lat = locationArr[0];
    var lon = locationArr[1];
    //set location
    $("#location").html(data.city + ' ' + data.region);

    var apiKey = "7f7ac04d02aeb07ff1fdce9eb35ca237"
    var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    var t = $("#temp");

    //ajax request
    $.getJSON(api, function(json) {
      var tempC = Math.round(json.main.temp - 273.15);
      t.html(tempC);

      //set temperature C
      $("#cels").click(function() {
        t.html(tempC);
      });

      //set temperature F
      $("#faren").click(function() {
        var far = Math.round((json.main.temp - 273.15) * 1.8 + 32);
        t.html(far);
      });

      //brief weather description
      $("#weath").html(json.weather[0].main + ": " + json.weather[0].description);

      // seach api for icon corresponding to weather description

      var image = document.getElementById("myImg");
      switch (json.weather[0].main) {
        case "Thunderstorm":
          image.src = 'http://openweathermap.org/img/w/11d.png';
          break;
        case "Drizzle":
          image.src = 'http://openweathermap.org/img/w/09d.png';
          break;
        case "Rain":
          image.src = "http://openweathermap.org/img/w/10d.png";
          break;
        case "Snow":
          image.src = 'http://openweathermap.org/img/w/13d.png';
          break;
        case "Clear":
          image.src = 'http://openweathermap.org/img/w/01d.png';
        case "Clouds":
          image.src = 'http://openweathermap.org/img/w/03d.png';
          break;
        case "Atmosphere":
          image.src = 'http://openweathermap.org/img/w/50d.png';
          break;
        default:
          image.src = "http://vignette3.wikia.nocookie.net/spore/images/6/6c/Question-mark.png/revision/latest?cb=20110427230528";
      };
    });
  })
})