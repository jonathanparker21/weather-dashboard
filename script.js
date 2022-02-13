// $(document).ready(function () {

var inputField = document.querySelector('#city')
var button = document.querySelector('#get-weather')
var issueContainer = document.getElementById('forecast');

function convertTemp(temp) {
    return Math.floor((temp) - 273.15) * 9/5 +32;
}

function fetchData() {
    var cityName = inputField.value
    var apiKey = 'b04cc2de859ae3c5c525426c1b0511bb'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function(weatherData) {
        console.log(weatherData)
        
        var city = document.createElement('h3');
        var highTempK = document.createElement('p');
        var lowTempK = document.createElement('p');
        var windSpeed = document.createElement('p');
        var humidity = document.createElement('p');
        // var uvIndex = document.createElement('p');
        var weatherIconElement = document.createElement('img');
        
        city.textContent = cityName + ' (' + moment().format("MMM Do YY") + ')';
        highTempK.textContent = 'High: ' + convertTemp(weatherData.main.temp_max) + ' F';
        lowTempK.textContent = 'Low: ' + convertTemp(weatherData.main.temp_min) + ' F';
        windSpeed.textContent = 'Wind: ' + weatherData.wind.speed.toFixed(0) + ' MPH';
        humidity.textContent = 'Humidity: ' + weatherData.main.humidity + ' %';
        // uvIndex.textContent = 'UV Index: ' + weatherData.uvi;
        weatherIcon = weatherData.weather[0].icon;
        weatherIconElement.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png'
        console.log(weatherData)
        
        issueContainer.append(city);
        issueContainer.append(weatherIconElement);
        issueContainer.append(highTempK);
        issueContainer.append(lowTempK);
        issueContainer.append(windSpeed);
        issueContainer.append(humidity);
        // issueContainer.append(uvIndex);
        
        inputField.value = ''
        
    })
    
    
    function displayForecast(cityName) {
        var cityName = inputField.value
        var apiKey = 'b04cc2de859ae3c5c525426c1b0511bb'
        var requestUrl5Day = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey
        
        fetch(requestUrl5Day)
        .then(function (response) {
            return response.json()
        })
        .then(function(forecastData) {
    
            console.log(forecastData)

            var days = forecastData.list
            weatherIcon = forecastData.list[0].weather[0].icon;
            forecastIcon = 'http://openweathermap.org/img/w/' + weatherIcon + '.png'

            for (let i = 0; i < 5; i++) {
                
                var column = $('<div>').addClass('col-md-4');
                var card = $('<div>').addClass('card');
                var cardBody = $('<div>').addClass('card-body');
                var cardDate = $('<h4>').addClass('card-title').text(days[i].dt_txt);
                // var cardIcon = $('<img>').('src', forecastIcon).text(days[i].forecastIcon)
                var cardTemp = $('<p>').addClass('card-text').text('Temp: ' + days[i].main.temp + ' F')
                var cardWind = $('<p>').addClass('card-text').text('Wind: ' + days[i].wind.speed.toFixed(0) + ' MPH')
                var cardHumidity = $('<p>').addClass('card-text').text('Humiditiy: ' + days[i].main.humidity + ' %')
                
                column.append(card.append(cardBody.append(cardDate, cardTemp, cardWind, cardHumidity)));
                $('#forecast').append(column)

            }
    
        })


    }

    displayForecast();

}

button.addEventListener('click', fetchData)

// });