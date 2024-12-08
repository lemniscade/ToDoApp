import React, { useEffect, useState } from 'react';
import '../styles/global.scss'
import Navbar from './Navbar'
import { useSelector } from 'react-redux';
import { addTodo, listTodo } from '../actions/action';
import { toDo } from '../reducers/reducer';
import { useAppDispatch } from '../hooks/hook';
export default function HomePage() {
  const [inputValue, setInputValue] = useState(""); // Input'un state'i
  const [toDoName, setToDoName] = useState(""); // Input'un state'i
  const [usernameInput, setUsername] = useState("");
  const dispatch = useAppDispatch();
  // const username: string = useSelector((state: any) => state.user.user.username);
  const todos = useSelector((state: any) => state.toDo.todosByUser);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);
  }, []);
  const handleButtonClick = () => {
    setInputValue(inputValue);
    setToDoName(toDoName);
    dispatch(addTodo(inputValue, usernameInput, toDoName));
    dispatch(listTodo(usernameInput));
  };
  return (
    <div className='vertical'>
      <Navbar />
      <div className='vertical'>
        <div style={{ fontSize: "60px", fontWeight: "bolder" }}>
          TODO LIST
        </div>
        <hr />
        <input type="text" placeholder='add item ...' value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <input type="text" placeholder='toDo Name' value={toDoName}
          onChange={(e) => setToDoName(e.target.value)} />
        <button onClick={handleButtonClick}>ADD</button>
        <div className='vertical'>
          {/* <div className='horizontal'>
            <ul>
              {todos.length > 0 ? (
                todos.map((todo: toDo) => (
                  <li key={todo.id}>{todo.description}</li> // Her bir todo öğesini ekrana basıyoruz
                ))
              ) : (
                <p>Henüz todo yok.</p>
              )}
            </ul>
            <button>Delete</button>
            <button>Edit</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
