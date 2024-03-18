
const apiKey = "8f0d819242438ae01375ead8c6e76244";

$('#citySearchButton').on('click', function(){
    //replace this with code that reads input
    var city = '';
    city = $('#citySearchInput').val();
    console.log(city);
    // this should all get replaced with an API promise structure
    getWeather(city);
});
function addButton(city){
    var newli = $('<li class="list-group-item"></li>');
    var newButton = $('<button type="button" class="btn btn-primary btn-lg"></button>')
    newButton.text(city);
    newli.append(newButton);
    $('#cityList').append(newli);
}
function getWeather(city){
    const requstUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch (requstUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(response){
            addButton(city);
            renderWeather(response[0]);
        })
        .catch(function(error){
            console.log(error);
        })

}
function renderWeather(response){
    var lat = response.lat;
    var lon = response.lon;
    const requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response){
            var weather = response.list[0];
            console.log(weather);
        })
        .catch(function (error){
            console.log(error);
        });
}

























