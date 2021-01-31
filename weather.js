const weather = document.querySelector(".js-weather");

const API_KEY = "40902336c0c8957b1c8edf46cbaaa79d";
const COORDS = "currentCoordinates";

function getWeather(lat, long)
{
    // then: API에서 정보를 가져올때가지 기다렸다가 이후를 처리
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json();
        }).then(function(json) {
            const tmperator = json.main.temp;
            const place = json.name;
            weather.innerText = `${tmperator}°C @ ${place}`;
        });
}

function saveCoords(coordsObj)
{
    // 숫자를 문자열로 변환하여 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position)
{
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError()
{
    console.log("error");
}

function askForCoords()
{
   navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();