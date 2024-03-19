
const apiKey = "8f0d819242438ae01375ead8c6e76244";
//Noon was on the 3rd record in the list, which were 8 records long per day. So the counter starts on two and as seen in the getForecast function, increments by 8
let weatherIndex = 2;
//this was originally wrapped in a funciton to include functionality for pulling info from localStorage to remember previous saved searches, but I ran out of time.
function setup(){
    //set dates
    const week = [
        dayjs().add(1, "day").format("MM/DD/YY"),
        dayjs().add(2, "day").format("MM/DD/YY"),
        dayjs().add(3, "day").format("MM/DD/YY"),
        dayjs().add(4, "day").format("MM/DD/YY"),
        dayjs().add(5, "day").format("MM/DD/YY")
    ];
    $('#currentDate').text(dayjs().format("MM/DD/YY"));
    $('.forecastDay').each(function(index){
        //there were only h4 elements on the forecast cards, so no more specific criteria were required.
        $( this ).find('h4').text(week[index]);
    });

}
//button for search, triggers the search for weather both current and forecast and also adds a new button to the search history
$('#citySearchButton').on('click', function(){
    //pull city from the search input
    city = $('#citySearchInput').val();
    addButton(city);
    getWeather(city);
    getForecast(city);
});
//button for previous search buttons. Differs in that it reads the city name from a different place and doesn't add a new button.
$('#cityList').on('click', function(event){
    if(event.target.nodeName=='BUTTON'){
        let city=$(event.target).text();
        getWeather(city);
        getForecast(city);
    }
})
//this function adds a new button to the list of previous searches
function addButton(city){
    //creating a new list item and button to append one to the other and then both to the list
    var newli = $('<li class="list-group-item"></li>');
    var newButton = $('<button type="button" class="btn btn-primary btn-lg"></button>')
    newButton.text(city);
    newli.append(newButton);
    $('#cityList').append(newli);
}
//this calls the openweather api for the current weather in the passed city in imperial units and writes that information to the DOM
function getWeather(city){
    $('#cityName').text(city)
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(requestUrl)
        .then(function (response){
            return response.json();

        })
        .then(function (response){
            let cloud = response.clouds.all;
            $('#currentDate').text(`${dayjs().format("MM/DD/YY")}  ${getEmoji(cloud)}`);
            let temp = response.main.temp;
            $('#currentTemp').text(`Temp: ${temp} degrees`);
            let wind = response.wind.speed;
            $('#currentWind').text(`Wind: ${wind} MPH`);
            let humidity = response.main.humidity;
            $('#currentHumidity').text(`Humidity: ${humidity}%`)
        })
        .catch(function(error){
            console.log(error)
        })
}
//this calls the openweather api for the 5-day forecast at noon in passed city in imperial units and writes that information to the DOM
function getForecast(city){
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response){
            $('.forecastDay').each(function(){
                let weatherItem = response.list[weatherIndex];
                let cloud = weatherItem.clouds.all;
                $(this).children().eq(1).text(getEmoji(cloud));
                let temp = weatherItem.main.temp;
                $(this).children().eq(2).text(`Temp: ${temp} degrees`);
                let wind = weatherItem.wind.speed;
                $(this).children().eq(3).text(`Wind: ${wind} MPH`);
                let humidity = weatherItem.main.humidity;
                $(this).children().eq(4).text(`Humidity: ${humidity}%`)
                weatherIndex+=8;
            })
            //gotta reset the weatherIndex to 2 for future button presses
            weatherIndex=2;
        })
        .catch(function (error){
            console.log(error);
        });

}
//this was simply a consise outsourcing of the decision of which emoji to put for cloud cover.
function getEmoji(cloud){
    const emoji=['☀️', '⛅', '☁️'];
    if(cloud<30){
        return emoji[0];
    }else if(cloud<70){
        return emoji[1];
    }else{
        return emoji[2];
    }
}
setup();
























