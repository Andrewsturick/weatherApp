'use strict';




$(document).ready(init);

function init(){

  $('#cityInputSubmit').click(getClickedCityState);
  getInit();
}



function getInit(){
  $('#forecastHolder').empty();
  $('#holder').empty();
  $('#mapHolder').empty();
  var thisZip = $('#zipInput').val();
  var mapNewURL='http://api.wunderground.com/api/8b14830ed035c026/animatedradar/q/autoip.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
  var observationURL ='http://api.wunderground.com/api/8b14830ed035c026/conditions/q/autoip.json';
  var forecastURL = 'http://api.wunderground.com/api/8b14830ed035c026/forecast/q/autoip.json';
  var mapHolderNew = $('<img>').attr("src", mapNewURL);
  $('#mapHolder').append(mapHolderNew);
  $.ajax({
    method:'GET',
    url: observationURL,
    success: function(data){
      var cityCurrentURL = data.current_observation.display_location.full;

      var iconCurrentURL = data.current_observation.icon_url;
      var tempCurrent = data.current_observation.temp_f;
      var weatherCurrent = data.current_observation.weather;
      var cityHolder = $('#holder').append($('<div>').addClass('cityHolder').text(cityCurrentURL));
      var iconHolder = $('#holder').append($('<img>').attr("src", iconCurrentURL  ));
      var tempHolder = $('#holder').append($('<div>').addClass('tempHolder').text(tempCurrent + String.fromCharCode(176)));
      var weatherHolder = $('#holder').append($('<div>').addClass('weatherHolder').text(weatherCurrent));


    }
  })

  $.ajax({
    method:'GET',
    url: forecastURL,
    success: function(data){

      var forecastData = data.forecast.simpleforecast.forecastday;
      var forecastDataText = data.forecast.txt_forecast.forecastday;

      for ( var i = 0 ; i < forecastData.length; i++){
        var iconNewURL = forecastData[i].icon_url;
        var tempHiNew = forecastData[i].high.fahrenheit + String.fromCharCode(176);
        var tempLowNew = forecastData[i].low.fahrenheit + String.fromCharCode(176);
        var weatherNew =forecastData[i].conditions;
        var dayTitle= forecastData[i].date.weekday;
        var dayHolderNew = $('<div>').addClass('dayHolderNew').text(dayTitle);
        var $card = $('<div>').addClass('forecastBox');
        var iconHolderNew = $('<img>').attr("src", iconNewURL);
        var tempHolderNew = $('<div>').addClass('tempHolderNew').text("Hi: " + tempHiNew  +  " Low: " + tempLowNew  );
        var weatherHolderNew = $('<div>').addClass('weatherHolderNew').text(weatherNew);
        $card.append(dayHolderNew, iconHolderNew, tempHolderNew, weatherHolderNew);
        $('#forecastHolder').append($card);

      }

    }
  })
  $('#zipInput').val(' ');
}



function getClickedCityState(){
  $('#forecastHolder').empty();
  $('#holder').empty();
  $('#mapHolder').empty();
  var thisCity = $('#cityInput').val().replace(/\s+/g, '_');     ;
  var thisState = $('#stateInput').val();
  var mapNewURL='http://api.wunderground.com/api/8b14830ed035c026/animatedradar/q/' + thisState + '/' + thisCity + '.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
  var observationURL ='http://api.wunderground.com/api/8b14830ed035c026/conditions/q/' + thisState +'/'+ thisCity +'.json';
  var forecastURL = 'http://api.wunderground.com/api/8b14830ed035c026/forecast/q/'+ thisState +'/'+ thisCity + '.json';
  var newVal
  var icon
  var temp
  var status
  var mapHolderNew = $('<img>').attr("src", mapNewURL);
  $('#mapHolder').append(mapHolderNew);
  $.ajax({
    method:'GET',
    url: observationURL,
    success: function(data){

        var cityCurrentURL = data.current_observation.display_location.full;
      var iconCurrentURL = data.current_observation.icon_url;
      var tempCurrent = data.current_observation.temp_f;
      var weatherCurrent = data.current_observation.weather;
      var cityHolder = $('#holder').append($('<div>').addClass('cityHolder').text(cityCurrentURL));
      var iconHolder = $('#holder').append($('<img>').attr("src", iconCurrentURL  ));
      var tempHolder = $('#holder').append($('<div>').addClass('tempHolder').text(tempCurrent + String.fromCharCode(176)));
      var weatherHolder = $('#holder').append($('<div>').addClass('weatherHolder').text(weatherCurrent));

      var mapHolderNew = $('<img>').attr("src", mapNewURL);

    }
  })

  $.ajax({
    method:'GET',
    url: forecastURL,
    success: function(data){
      var forecastData = data.forecast.simpleforecast.forecastday;
      var forecastDataText = data.forecast.txt_forecast.forecastday;
      for ( var i = 0 ; i < forecastData.length; i++){
        var iconNewURL = forecastData[i].icon_url;
        var tempHiNew = forecastData[i].high.fahrenheit + String.fromCharCode(176);
        var tempLowNew = forecastData[i].low.fahrenheit + String.fromCharCode(176);
        var weatherNew =forecastData[i].conditions;
        var dayTitle= forecastData[i].date.weekday;
        var dayHolderNew = $('<div>').addClass('dayHolderNew').text(dayTitle);
        var $card = $('<div>').addClass('forecastBox');
        var iconHolderNew = $('<img>').attr("src", iconNewURL);
        var tempHolderNew = $('<div>').addClass('tempHolderNew').text("Hi: " + tempHiNew  +  " Low: " + tempLowNew  );
        var weatherHolderNew = $('<div>').addClass('weatherHolderNew').text(weatherNew);
        $card.append(dayHolderNew, iconHolderNew, tempHolderNew, weatherHolderNew);
        $('#forecastHolder').append($card);

      }

    }
  })

  $('#stateInput').val('');
  $('#cityInput').val(' ');
  document.getElementById('stateInput').placeholder = 'state(CA)';
}
