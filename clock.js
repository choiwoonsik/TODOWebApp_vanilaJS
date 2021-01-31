const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {  
    const date = new Date();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    clockTitle.innerText = 
    `${hours > 9 ? `${hours}` : `0${hours}`}:${
        min > 9 ? `${min}` : `0${min}`}:${
        sec > 9 ? `${sec}` : `0${sec}`}`;
}

function init()
{
    getTime();
    setInterval(getTime, 1000);
}

init();