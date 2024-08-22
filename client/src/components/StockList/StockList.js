import React, { useState, useEffect } from "react";
import { authState } from "../../store/authState";
import { useRecoilValue } from 'recoil';
import './StockList.css'; // Import the CSS file

const StockList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("important");
    const authStateValue = useRecoilValue(authState);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('https://backend-hoac.onrender.com/todo/todos', {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setTodos(data);
        }
        getTodos();
    }, [authStateValue.token]);

    const addTodo = async () => {
        const response = await fetch("https://backend-hoac.onrender.com/todo/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    }


    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`https://backend-hoac.onrender.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete todo with id ${id}`);
            }

            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    return (
        <div className="todo-container">
            <h2 className="todo-header">Watchlist</h2>
            <input
                type="text"
                className="todo-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <button onClick={addTodo} className="todo-button">Add Stock</button>
            {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => deleteTodo(todo._id)} className="delete-button">Delete</button>
                </div>
            ))}
        </div>
    );
}    

export default StockList;
