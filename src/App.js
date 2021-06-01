import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import React, { useState, useEffect } from 'react';

function App() {
  

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {
    filterHandler();
    saveToLocal();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }

  const saveToLocal = () => {
    
      localStorage.setItem('todos', JSON.stringify(todos));
    
  }
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]))
    }
    else {
      const localTodo = JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodo);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>My To Do List
        </h1>
      </header>
      <Form 
      inputText={inputText}
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      />
      <TodoList setTodos={setTodos} 
      filteredTodos={filteredTodos}
      todos={todos}/>
    </div>
  );
}

export default App;
