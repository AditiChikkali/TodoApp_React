import React, { useState } from 'react';
import './style.css';

function generateId() {
  return Math.floor(Math.random() * 10);
}

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleSubmit = () => {
    setTodos((todos) =>
      todos.concat({
        text: input,
        id: generateId(),
      })
    );
    setInput('');
  };

  const removeTodo = (id) =>
    setTodos((todos) => todos.filter((t) => t.id !== id));

  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditedText(text);
  };

  const finishEditing = (id) => {
    setEditingTodoId(null);
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, text: editedText } : t))
    );
  };

  return (
    <div className='container'>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='New Todo'
      />
      <button onClick={handleSubmit}>Submit</button>
      <ul className='todos-list'>
        {todos.map(({ text, id }) => (
          <li key={id} className='todo'>
            {editingTodoId === id ? (
              <>
                <input
                  type='text'
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => finishEditing(id)}>Save</button>
              </>
            ) : (
              <>
                <span>{text}</span>
                <button className='edit' onClick={() => startEditing(id, text)}>
                  Edit
                </button>
                <button className='close' onClick={() => removeTodo(id)}>
                  X
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
