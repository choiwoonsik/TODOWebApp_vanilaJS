const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOs_LS = "toDos";

let toDos = [];

function deleteToDo(event)
{
    const btn = event.target;
    const li = btn.parentNode; // 클릭한 객체의 li

    toDoList.removeChild(li);
    
    // 배열 요소에 대해서 filter의 매개변수 함수(filterFn)의 인자로 보내서
    // true를 반환하는 요소에 대해서만 반환한다
    const cleanToDos = toDos.filter(function(toDo) {
        console.log(toDo.id, li.id);
        // 클릭한 li의 id와 다른 toDo만 true를 반환
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos()
{
    // localStorage에 저장하기위해 객체를 string으로 변환
    localStorage.setItem(TODOs_LS, JSON.stringify(toDos));
}

function paintToDo(text)
{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text+" ";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();

    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDo()
{
    const loadedToDos = localStorage.getItem(TODOs_LS);
    if (loadedToDos !== null)
    {
        //JSON = javascript object noatation(표기법)
        const parsedToDos = JSON.parse(loadedToDos); // string을 객체로 변환

        // forEach - 매개변수로 함수가 오고 해당 함수의 인자로 각 값들을 전달
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init()
{
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();