import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {

  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const inputRef = useRef(null);
  const newItem = {
    id: todos.length + 1,
    completed: false,
    text: ""
  };
  const handleAddToDo = () => {
    if (!inputRef.current) return;

    const text = inputRef.current.value.trim();
    if (!text) return;
    newItem.text = text;

    setTodos([...todos, newItem]);
    inputRef.current.value = '';
  };
  const handleDeleteItem = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };
  const handleItemDone = (id) => () => {
    const newTodos = [...todos];
    newTodos.forEach((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
    setTodos(newTodos);
  };
  return (
    <div className='container'>
      <h1>To do List</h1>
      <div className='form-control'>
        <input ref={inputRef} type="text" placeholder="New todo"  onKeyDown={(e) => e.key === "Enter" && handleAddToDo()}/>
        <button onClick={handleAddToDo} >Add</button>


      </div>
   <ul>
  {todos.map((todo) => (
    <li
      key={todo.id}
      onClick={handleItemDone(todo.id)}
      className={todo.completed ? "completed todo-item" : "todo-item"}>
      <span className="todo-text">{todo.text}</span>

      <span
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteItem(todo.id);
        }}
      >
        ×
      </span>
    </li>
  ))}
</ul>


    </div>
  );
}

export default App;
