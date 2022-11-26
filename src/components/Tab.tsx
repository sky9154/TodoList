import React from 'react';

type TodoList = {
  setToggleStatus: (state: string) => void;
}

const Tab: React.FC<TodoList> = ({ setToggleStatus }) => {

  const changeTab = (event: any) => {
    const tabs: NodeListOf<Element> = document.querySelectorAll('#tab li');
    const id: string = event.target.id;

    tabs.forEach((item) => item.classList.remove('active'));
    event.target.classList.add('active');

    setToggleStatus(id);
  }

  return (
    <ul className="tab" id="tab" onClick={changeTab}>
      <li className="active" id="all">All</li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>
  );
}

export default Tab;