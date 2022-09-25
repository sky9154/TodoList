import { KeyboardEvent } from 'react';
import '../css/style.css';

type todo = {
  text: string,
  id: number,
  checked: string
};

let todoData: todo[] = [];
let toggleStatus = 'all';

/**
 * 更新列表
 */
const updataList = () => {
  let showData: todo[] = [];

  if (toggleStatus === 'all') {
    showData = todoData;
  } else if (toggleStatus === 'conduct') {
    showData = todoData.filter((item: todo) => item.checked === '');
  } else {
    showData = todoData.filter((item: todo) => item.checked === 'checked');
  }

  const todoLength = todoData.filter((item: todo) => item.checked === '');

  render(showData, String(todoLength.length));
}

/**
 * 新增待辦事項
 */
export const addTodo = () => {
  let text: string = (document.getElementById('inputText') as HTMLInputElement).value;
  (document.getElementById('inputText') as HTMLInputElement).value = '';

  if (!!text) {
    const todo: {
      text: string,
      id: number,
      checked: string
    } = {
      text: text,
      id: new Date().getTime(),
      checked: ''
    };

    if (!!todo) {
      todoData.unshift(todo);
      text = '';
    };

    updataList();
  }
};

/**
 * Enter 輸入待辦事項
 * @param event event
 */
export const inputEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  if ((event as KeyboardEvent).key === 'Enter') {
    addTodo();
  }
}

/**
 * 渲染介面
 * @param arr 待辦事項
 * @param number 待辦事項數量
 */
const render = (arr: todo[], number: string) => {
  let todoList: string = '';

  arr.forEach((item: todo) => {
    todoList += `
      <li data-id="${item.id}">
        <label class="checkbox">
          <input type="checkbox" ${item.checked}/>
          <span>${item.text}</span>
        </label>

        <a href="/#" class="delete"></a>
      </li>
    `
  });

  (document.getElementById('todoList') as HTMLElement).innerHTML = todoList;
  (document.getElementById('num') as HTMLElement).textContent = number;
};

/**
 * 變更導航欄
 * @param event event
 */
export const changeTab = (event: any) => {
  toggleStatus = event.target.id;

  const tabs = document.querySelectorAll("#tab li");

  tabs.forEach((item: Element) => item.classList.remove("active"));
  event.target.classList.add("active");

  updataList();
}

/**
 * 刪除 & 切換 checked 狀態
 * @param event event
 */
export const deleteChang = (event: any) => {
  const id: number = Number((event.target.closest('li') as HTMLLIElement).dataset.id);

  if (event.target.classList.value === 'delete') {
    event.preventDefault();

    todoData = todoData.filter((item: todo) => item.id !== id);
  } else {
    todoData.forEach((item: todo, index: number) => {
      if (item.id === id) {
        todoData[index].checked = todoData[index].checked === 'checked' ? '' : 'checked';
      }
    });
  }

  updataList();
}

/**
 * 清除已完成項目
 * @param event event
 */
export const clear = (event: React.SyntheticEvent) => {
  event.preventDefault();
  todoData = todoData.filter((item: todo) => item.checked !== "checked");

  updataList();
};