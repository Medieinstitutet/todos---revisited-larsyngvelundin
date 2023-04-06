import { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState("");

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    }

    return (
        <form onSubmit={handleAdd}>
            <label>New Task: </label>
            <input type="text" value={value} onChange={handleInput} />
            <button type="submit">Add</button>
        </form>
    )
}