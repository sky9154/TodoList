import React, { useEffect } from 'react';
import { initialization, changeTab, addTodo, deleteChang, inputEnter, clear } from '../functions/todoList';
import '../css/style.css';

const Title: React.FC = () => (
  <h1 className="default">TODO LIST</h1>
);

const Input: React.FC = () => (
  <div className="card input">
    <input type="text" placeholder="請輸入待辦事項" id="inputText" onKeyDown={inputEnter} />
    <a className="btn_add" id="addBtn" onClick={addTodo}>+</a>
  </div>
);

const Tab: React.FC = () => (
  <ul className="tab" id="tab" onClick={changeTab}>
    <li className="active pointer" id="all">全部</li>
    <li className="pointer" id="conduct">待完成</li>
    <li className="pointer" id="finish">已完成</li>
  </ul>
);

const Content: React.FC = () => (
  <div className="cart_content">
    <ul className="list" id="todoList" onClick={deleteChang}></ul>
    <div className="list_footer">
      <p className="default"><span id="num">0</span> 個待完成項目</p>
      <a id="clearBtn" onClick={clear}>清除已完成項目</a>
    </div>
  </div>
);

const App: React.FC = () => {
  useEffect(() => initialization());

  return (
    <>
      <Title />
      <Input />
      <div className="card card_list">
        <Tab />
        <Content />
      </div>
    </>
  );
}

export default App;