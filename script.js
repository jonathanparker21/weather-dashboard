var inputField = document.querySelector('#city')
var button = document.querySelector('#get-weather')
var issueContainer = document.getElementById('issues');
// var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

function convertTemp(temp) {
    return Math.floor((temp) - 273.15) * 9/5 +32;
}

function fetchData() {
    // console.log(inputField.value) 
        // to get the value from the input field (we have acces to the city name now)
    var cityName = inputField.value
    var apiKey = 'b04cc2de859ae3c5c525426c1b0511bb'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    // console.log(requestUrl)

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function(weatherData) {
            console.log(weatherData)

            var highTempK = document.createElement('p');
            var lowTempK = document.createElement('p');
            var weatherFeel = document.createElement('p');

            // highTempK.textContent = 'High: ' + Math.floor(((weatherData.main.temp_max) - 273.15) * 9/5 +32) + ' F';
            highTempK.textContent = 'High: ' + convertTemp(weatherData.main.temp_max) + ' F';
            // lowTempK.textContent = 'Low: ' + Math.floor(((weatherData.main.temp_min) - 273.15) * 9/5 +32) + ' F';
            lowTempK.textContent = 'Low: ' + convertTemp(weatherData.main.temp_min) + ' F';
            weatherFeel.textContent = 'Today: ' + weatherData.weather[0].main;

            issueContainer.append(highTempK);
            issueContainer.append(lowTempK);
            issueContainer.append(weatherFeel);

            inputField.value = ''

        })
}

button.addEventListener('click', fetchData)