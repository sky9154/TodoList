let inputText = document.getElementById("inputText");
let addBtn = document.getElementById("addBtn");
let todoData = [];
if (todoData != []) {
    todoData = JSON.parse(getCookie());
}
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
    updataList();
};

// 使用 enter 新增 todoData
inputText.addEventListener("keypress", e => {if (e.key == "Enter") addTodo();});


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
    updataList();
}

// 刪除 & 切換 checked 狀態
todoList.addEventListener("click", deleteChange);

function deleteChange(e) {
    let id = e.target.closest("li").dataset.id;
    console.log(id)
    if (e.target.classList.value == "delete") {
        e.preventDefault();
        todoData = todoData.filter(i => i.id != id);
    }else {
        // 切換 checked 狀態功能
        todoData.forEach((i, index) => {
            if (i.id == id) {
                if (todoData[index].checked == "checked") todoData[index].checked = "";
                else todoData[index].checked = "checked";
            }
        });
    }
    updataList();
}

// 更新待辦清單
function updataList() {
    let showData = [];
    if (toggleStatus == "all") showData = todoData;
    else if (toggleStatus == "conduct") showData = todoData.filter(i => i.checked == "");
    else showData = todoData.filter(i => i.checked == "checked");
    const num =document.getElementById("num");
    let todoLength = todoData.filter(i => i.checked == "");
    num.textContent = todoLength.length;
    render(showData);
    setCookie(todoData);
}

// 初始化
updataList();

// 清除已完成項目
const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", clear);

function clear (e) {
    e.preventDefault();
    todoData = todoData.filter(i => i.checked != "checked");
    updataList();
};

// 存入 cookie
function setCookie(value) {
    let Days = 365;    //此 cookie 將被儲存的天數
    let exp  = new Date();  //建立一個時間日期物件;
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = "todoData="+  JSON.stringify(value) + ";expires=" + exp.toGMTString();
}

//取cookies函式        
function getCookie() {
    let cookies = document.cookie;
    let list = cookies.split("; ");    // 解析出名/值對列表
    for(let i =0; i < list.length; i++) {
    let arr = list[i].split("=");    // 解析出名和值
    if(arr[0]== "todoData") return decodeURIComponent(arr[1]);    // 對cookie值解碼
    }
    return "";
}