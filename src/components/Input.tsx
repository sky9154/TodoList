import React, { useState } from 'react';
import { todo } from './App';

type TodoList = {
  todoData: todo[];
  setTodoData: (todoData: todo[]) => void;
}

export const Input: React.FC<TodoList> = ({ todoData, setTodoData }) => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const addTodo = () => {
    if (!!text) {
      const newTodoData: todo = {
        text: text,
        id: new Date().getTime(),
        checked: false
      };

      todoData.unshift(newTodoData);

      setText('');
      setTodoData([...todoData]);

      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
  }

  return (
    <div className="card input">
      <input type="text" placeholder="Add new task..." value={text} onChange={handleChange} />
      <a className="btn_add" onClick={addTodo}>+</a>
    </div>
  );
}

export default Input;