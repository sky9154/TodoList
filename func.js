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

// 刪除 & 切換 checked 狀態
todoList.addEventListener("click", deleteChange);

function deleteChange(e) {
    let id = e.target.closest("li").dataset.id;
    console.log(id)
    if (e.target.classList.value == "delete") {
        e.preventDefault();
        todoData = todoData.filter((i) => i.id != id);
    }else {
        // 切換 checked 狀態功能
        todoData.forEach((i, index) => {
            if (i.id == id) {
                if (todoData[index].checked == "checked") todoData[index].checked = "";
                else todoData[index].checked = "checked";
            }
        });
    }
    render(todoData);
}