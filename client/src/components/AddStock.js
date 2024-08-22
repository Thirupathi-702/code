import React, { useState, useEffect } from "react";
import { authState } from "../store/authState";
import { useRecoilValue } from 'recoil';
import './TodoList.css'; // Import the CSS file

const StockList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const authStateValue = useRecoilValue(authState);

    
    const addTodo = async () => {
        const response = await fetch("https://backend-hoac.onrender.com/todo/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
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
        </div>
    );
}    

export default StockList;
