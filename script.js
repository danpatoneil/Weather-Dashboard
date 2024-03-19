
const apiKey = "8f0d819242438ae01375ead8c6e76244";
let weatherIndex = 2;
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
        $( this ).find('h4').text(week[index]);
    });

}
$('#citySearchButton').on('click', function(){
    //replace this with code that reads input
    city = $('#citySearchInput').val();
    addButton(city);
    getWeather(city);
    getForecast(city);
});
$('#cityList').on('click', function(event){
    console.log(event.target.nodeName);
    console.log($(event.target).text());
    if(event.target.nodeName=='BUTTON'){
        let city=$(event.target).text();
        getWeather(city);
        getForecast(city);
    }
})
function addButton(city){
    var newli = $('<li class="list-group-item"></li>');
    var newButton = $('<button type="button" class="btn btn-primary btn-lg"></button>')
    newButton.text(city);
    newli.append(newButton);
    $('#cityList').append(newli);
}
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
function getForecast(city){
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    console.log(`searching for ${city}`)
    fetch(requestUrl)
        .then(function (response) {
            console.log('step 1 good');
            return response.json();
        })
        .then(function (response){
            console.log(response.list[weatherIndex]);
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
            weatherIndex=2;
        })
        .catch(function (error){
            console.log(error);
        });

}
function getEmoji(cloud){
    const emoji=['☀️', '⛅', '☁️'];
    if(cloud<30){
        console.log(`${cloud}, returning ${emoji[0]}`);
        return emoji[0];
    }else if(cloud<70){
        console.log(`${cloud}, returning ${emoji[1]}`);
        return emoji[1];
    }else{
        console.log(`${cloud}, returning ${emoji[2]}`);
        return emoji[2];
    }
}
setup();
























