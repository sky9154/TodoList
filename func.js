let inputText = document.getElementById("inputText");
let addBtn = document.getElementById("addBtn");
let todoData = [];

// 新增 todoData
addBtn.addEventListener("click", addTodo);

function addTodo() {
    const todo = {
        text : inputText.value,
        id : new Date().getTime(),
        checked : ""
    };
    if (todo != "") {
        todoData.unshift(todo);
        inputText.value = "";
    };
    render(todoData);
};

// 渲染到 html
let todoList = document.getElementById("todoList");
function render(arr) {
    let str = "";
    arr.forEach(i => {
        str += `
        <li data-id="${i.id}">
            <label class="checkbox" for="">
                <input type="checkbox" ${i.checked}/>
                <span>${i.text}</span>
            </label>
            <a href="#" class="delete"></a>
        </li>
        `
    });
    todoList.innerHTML = str;
};

// tab 的切換樣式
let tab = document.getElementById("tab");
let toggleStatus = "all";
tab.addEventListener("click", changeTab);
function changeTab(e) {
    toggleStatus = e.target.dataset.tab;
    console.log(toggleStatus)
    let tabs = document.querySelectorAll("#tab li");
    tabs.forEach(i => i.classList.remove("active"));
    e.target.classList.add("active");
}