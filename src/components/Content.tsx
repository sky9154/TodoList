import React, { SyntheticEvent } from 'react';
import { todo } from './App';

type TodoList = {
  toggleStatus: string;
  todoData: todo[];
  setTodoData: (todoData: todo[]) => void;
}

const Content: React.FC<TodoList> = ({ toggleStatus, todoData, setTodoData }) => {
  // note: change 'any' type.
  const handleClick = (event: any) => {
    const id: number = Number(event.currentTarget.getAttribute('data-id'));
    
    if (event.target.classList.value === 'delete') {
      event.preventDefault();

      todoData = todoData.filter((item: todo) => item.id !== id);
    } else {
      todoData.map((item, index) => {
        if (item.id === id) {
          todoData[index].checked = todoData[index].checked === true ? false : true;
        }
      });
    }

    setTodoData([...todoData]);

    localStorage.setItem('todoData', JSON.stringify(todoData));
  }

  const clear = (event: SyntheticEvent) => {
    event.preventDefault();

    todoData = todoData.filter((item: todo) => item.checked === false);

    setTodoData([...todoData]);

    localStorage.setItem('todoData', JSON.stringify(todoData));
  };

  const TodoList: React.FC = () => {
    let showData: todo[] = [];
    const todoList: JSX.Element[] = [];

    if (toggleStatus === 'all') {
      showData = todoData;
    } else if (toggleStatus === 'active') {
      showData = todoData.filter((item: todo) => !item.checked);
    } else {
      showData = todoData.filter((item: todo) => item.checked);
    }

    showData.map((item: todo) => {
      const { text, id, checked } = item;

      todoList.push(
        <li data-id={id} key={id} onClick={handleClick}>
          <label className="checkbox">
            <input type="checkbox" checked={checked} onChange={() => true} />
            <span>{text}</span>
          </label>
          <a className="delete"></a>
        </li>
      );
    });

    return (
      <>
        {todoList}
      </>
    );
  }

  return (
    <div className="cart_content">
      <ul className="list">
        <TodoList />
      </ul>
      <div className="list_footer">
        <p>{todoData.length} items left</p>
        <a onClick={clear}>Clear Completed</a>
      </div>
    </div>
  );
}

export default Content;