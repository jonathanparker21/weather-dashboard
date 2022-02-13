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

            city.textContent = cityName + ' (' + moment().format("MMM Do YY") + ')';
            highTempK.textContent = 'High: ' + convertTemp(weatherData.main.temp_max) + ' F';
            lowTempK.textContent = 'Low: ' + convertTemp(weatherData.main.temp_min) + ' F';
            windSpeed.textContent = 'Wind: ' + weatherData.wind.speed.toFixed(0) + ' MPH';
            humidity.textContent = 'Humidity: ' + weatherData.main.humidity + ' %';
            // uvIndex.textContent = 'UV Index: ' + weatherData.uvi;

            issueContainer.append(city);
            issueContainer.append(highTempK);
            issueContainer.append(lowTempK);
            issueContainer.append(windSpeed);
            issueContainer.append(humidity);
            // issueContainer.append(uvIndex);

            inputField.value = ''

        })
}

button.addEventListener('click', fetchData)