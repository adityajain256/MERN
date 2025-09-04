import React, { useEffect, useState } from "react";
import "./App.css";


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  

  // ✅ Fetch todos from backend API
  useEffect(() => {
    fetch("http://localhost:5003/api/home/todos")  // Replace with your API endpoint
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // ✅ Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    const res = await fetch("http://localhost:5003/api/home/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }, { New: true })
    });

    const data = await res.json();
    setTodos([...todos, data]); // update UI
    setNewTodo(""); // clear input
    window.location.reload(true);
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5003/api/home/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter(todo => todo._id !== id));
  };

  const completeTodo = async (id) => {
    await fetch(`http://localhost:5003/api/home/todos/${id}/completed`, {
      method: "PATCH",
    });
    window.location.reload(true);

    setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: true } : todo));
  }

  return (
    <div className="p-4 container">
      <div className="mini">

        <h2>My Todo List</h2>
        
        {/* Input for new todo */}
        <input 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Enter todo"
        />
        <button onClick={addTodo} className="add-button">Add</button>
      </div>

      {/* Display todos */}
      <ul className="todo-list">
        {todos.map(todo => (
          <div className="todo-item" key={todo._id}>
            <h1 className="heading" onClick={() => completeTodo(todo._id)} style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.title}</h1>
            <button onClick={() => deleteTodo(todo._id)} className="delete-button">❌</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
