import { Todo } from './Todo'
import { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'

export const TodoList = () => {
    let todoListArray = [{ "name": "Laundry", "done": false }, { "name": "Code", "done": true }, { "name": "Shower", "done": false }]
    if (localStorage.getItem("todoList")) {
        todoListArray = JSON.parse(localStorage.getItem('todoList'));
    }

    const [todoList, setTodoList] = useState(todoListArray)

    const addTodo = (todo) => {
        setTodoList([...todoList, { name: todo, done: false }])
    }

    const saveTodoList = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    const handleDone = (todoName) => {
        setTodoList(todoList.map(todo => todo.name == todoName ? { ...todo, done: !todo.done } : todo));
    }

    const handleDelete = (todoName) => {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].name == todoName) {
                todoList.push(todoList.splice(i, 1)[0]);
                break;
            }
        };
        todoList.pop();
        setTodoList([...todoList]);
    }

    const handleSortByDone = () => {
        todoList.sort((a, b) => a.done - b.done);
        setTodoList([...todoList]);
    }

    const handleSortByName = () => {
        todoList.sort((a, b) => (a.name - b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setTodoList([...todoList]);
    }

    useEffect(() => {
        saveTodoList();
    }, [todoList]);

    return (
        <div>
            <TodoForm addTodo={addTodo} />
            <button onClick={handleSortByDone}>Sort by Status</button>
            <button onClick={handleSortByName}>Sort by Name</button>
            {todoList.map((todo, index) => (
                <Todo
                    todo={todo}
                    key={index}
                    handleDone={handleDone}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    )
}