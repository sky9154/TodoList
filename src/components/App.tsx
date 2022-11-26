import React, { useState } from 'react';
import Input from './Input';
import Tab from './Tab';
import Content from './Content';

export type todo = {
  text: string,
  id: number,
  checked: boolean
};

const App: React.FC = () => {
  const localStorageData: string = localStorage.getItem('todoData');

  const [toggleStatus, setToggleStatus] = useState('all');
  const [todoData, setTodoData] = useState((!!localStorageData) ? JSON.parse(localStorageData) : []);

  return (
    <>
      <h1>TODO LIST</h1>
      <Input todoData={todoData} setTodoData={setTodoData} />
      <div className="card card_list">
        <Tab setToggleStatus={setToggleStatus} />
        <Content toggleStatus={toggleStatus} todoData={todoData} setTodoData={setTodoData} />
      </div>
    </>
  );
}

export default App;