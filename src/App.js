import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];

export default function App() {

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 것을 방지해줌
    e.preventDefault();

    // 할일 데이터 추가
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    // 새로운 할일 추가 
    setTodoData(prev =>
      [...prev, newTodo]
    );
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");
  }

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={handleRemoveClick}>Delete all</button>
        </div>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValue}
        />
      </div>
    </div>
  )
}