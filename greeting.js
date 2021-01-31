const form = document.querySelector(".js-form"),
    input = form.querySelector("input"), // 이름 입력 js-form안에 input필드
    greeting = document.querySelector(".js-greeting"); //이름 출력 greeting

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text)
{
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event)
{
    //기본 이벤트 실행 막기
    event.preventDefault();

    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName()
{
    // HTML form에 css의 .showing을 실행 -> 블락보임
    form.classList.add(SHOWING_CN);
    // 이름 제출시 실행 함수
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text)
{
    form.classList.remove(SHOWING_CN); //HTML form에서 .showing을 지운다
    greeting.classList.add(SHOWING_CN); // greeting(h4)에 .showing추가
    greeting.innerText = `Hello ${text}`; //해당 텍스트를 변경
}

function loadName()
{
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    }else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();