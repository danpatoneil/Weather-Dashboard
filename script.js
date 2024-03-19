
const apiKey = "8f0d819242438ae01375ead8c6e76244";
const week = [
    dayjs().add(1, "day").format("MM/DD/YY"),
    dayjs().add(2, "day").format("MM/DD/YY"),
    dayjs().add(3, "day").format("MM/DD/YY"),
    dayjs().add(4, "day").format("MM/DD/YY"),
    dayjs().add(5, "day").format("MM/DD/YY")
];
//set dates
$('#currentDate').text(dayjs().format("MM/DD/YY"));
$('.forecastDay').each(function(index){
    $( this ).find('h4').text(week[index]);
});
$('#citySearchButton').on('click', function(){
    //replace this with code that reads input
    var city = '';
    city = $('#citySearchInput').val();
    console.log(city);
    getWeather(city);
    getForecast(city);
});
function addButton(city){
    $('#cityName').text(city)
    var newli = $('<li class="list-group-item"></li>');
    var newButton = $('<button type="button" class="btn btn-primary btn-lg"></button>')
    newButton.text(city);
    newli.append(newButton);
    $('#cityList').append(newli);
}
function getWeather(city){
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(requestUrl)
        .then(function (response){
            addButton(city);
            return response.json();

        })
        .then(function (response){
            let temp = response.main.temp;
            $('#currentTemp').text(`Temp: ${temp} degrees`);
            let wind = response.wind.speed;
            $('#currentWind').text(`Wind: ${wind} MPH`);
            let humidity = response.main.humidity;
            $('#currentHumidity').text(`Humidity: ${humidity}%`)
            console.log(humidity);
        })
        .catch(function(error){
            console.log(error)
        })
}
function getForecast(city){
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response){
            var weather = response.list;
            console.log(weather);
        })
        .catch(function (error){
            console.log(error);
        });

}
function getEmoji(){
    let emoji=['☀️', '☁️', '💧', '❄️'];
}
























