var inputField = document.querySelector('#city');
var button = document.querySelector('#get-weather');
var issueContainer = document.getElementById('forecast');
var forecastCards = document.getElementById('forecastCards');

// function to convert temp to F
function convertTemp(temp) {
    return Math.floor((temp) - 273.15) * 9 / 5 + 32;
}

// to get dates for forecast
var myDate = new Date();
console.log('myDate', myDate);

function fetchData() {
    var cityName = inputField.value;
    var apiKey = 'b04cc2de859ae3c5c525426c1b0511bb';
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            console.log('weatherData', weatherData);

            var city = document.createElement('h2');
            var TempK = document.createElement('p');
            var windSpeed = document.createElement('p');
            var humidity = document.createElement('p');
            // var uvIndex = document.createElement('p');
            var weatherLogo = document.createElement('img');

            city.textContent = cityName + ' (' + moment().format("MM/DD/YYYY") + ')';
            TempK.textContent = 'Temp: ' + convertTemp(weatherData.main.temp) + ' F';
            windSpeed.textContent = 'Wind: ' + weatherData.wind.speed.toFixed(0) + ' MPH';
            humidity.textContent = 'Humidity: ' + weatherData.main.humidity + ' %';
            // uvIndex.textContent = 'UV Index: ' + weatherData.uvi;
            weatherIcon = weatherData.weather[0].icon;
            weatherLogo.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';

            issueContainer.append(city);
            issueContainer.append(weatherLogo);
            issueContainer.append(TempK);
            issueContainer.append(windSpeed);
            issueContainer.append(humidity);
            // issueContainer.append(uvIndex);

            inputField.value = '';

        });


    function displayForecast(cityName) {
        var cityName = inputField.value;
        var apiKey = 'b04cc2de859ae3c5c525426c1b0511bb';
        var requestUrl5Day = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey;

        fetch(requestUrl5Day)
            .then(function (response) {
                return response.json()
            })
            .then(function (forecastData) {

                console.log('forecastData', forecastData);

                // var days = forecastData.list
                weatherIcon = forecastData.list[0].weather[0].icon;
                forecastIcon = 'http://openweathermap.org/img/w/' + weatherIcon + '.png'

                //current date
                var dt = new Date();

                for (let i = 0; i < 6; i++) {
                    dt.setDate(dt.getDate() + 1);

                    var col = document.createElement('col');
                    var card = document.createElement('div');
                    var cardBody = document.createElement('div');
                    var city = document.createElement('h2');
                    var TempK = document.createElement('p');
                    var windSpeed = document.createElement('p');
                    var humidity = document.createElement('p');
                    var weatherIcon = document.createElement('img');

                    col.setAttribute('class', 'card-deck');
                    col.classList.add('cards');
                    card.setAttribute('class', 'card');
                    cardBody.setAttribute('class', 'card-body');
                    city.setAttribute('class', 'card-title');
                    TempK.setAttribute('class', 'card-text');
                    windSpeed.setAttribute('class', 'card-text');
                    humidity.setAttribute('class', 'card-text')

                    city.textContent = cityName + ' (' + dt + ')';
                    TempK.textContent = "Temp: " + convertTemp(forecastData.list[i].main.temp) + " F";
                    windSpeed.textContent = "Wind: " + forecastData.list[i].wind.speed.toFixed(0) + " MPH";
                    humidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + " %";
                    weatherIcon = forecastData.list[i].weather[0].icon;
                    // weatherLogo.src = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

                    forecastCards.append(col);
                    forecastCards.append(card);
                    forecastCards.append(cardBody);
                    cardBody.append(city, TempK, windSpeed, humidity);

                    inputField.value = '';

                }

            });

    }

    displayForecast();

}

button.addEventListener('click', fetchData)
