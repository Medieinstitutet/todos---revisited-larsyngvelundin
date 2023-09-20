import { Todo } from './Todo'
import { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'

export const TodoList = ({ contract, connectedAccount, connected }) => {
    const [todoList, setTodoList] = useState([])
    const [todoChanged, setTodoChanged] = useState(false)

    const getAllTodos = async () => {
        let todoArray = []
        if (contract) {
            let count = await contract.methods.todoCount().call()
            for (let i = 1; i <= count; i++) {
                let todo = await contract.methods.todos(i).call()
                if (todo["id"] != 0) {
                    todoArray.push(todo)
                }
            }
        }
        return todoArray
    }

    const fetchTodosFromContract = async () => {
        try {
            const list = await getAllTodos();
            setTodoList(list);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (todoChanged) {
            fetchTodosFromContract();
            setTodoChanged(false);
        }
    }, [todoChanged]);

    useEffect(() => {
        fetchTodosFromContract();
    }, [contract]);

    useEffect(() => {
        fetchTodosFromContract();
    }, [connected]);


    const addTodo = async (task) => {
        await contract.methods.createTodo(task).send({ from: connectedAccount })
        setTodoChanged(true);
    }

    const handleDelete = async (id) => {
        await contract.methods.removeTodo(id).send({ from: connectedAccount })
        setTodoChanged(true);
    }

    const handleDone = async (id) => {
        await contract.methods.toggleTodo(id).send({ from: connectedAccount })
        setTodoChanged(true);
    }

    const handleSortByDone = () => {
        todoList.sort((a, b) => a.completed - b.completed);
        setTodoList([...todoList]);
    }

    const handleSortByName = () => {
        todoList.sort((a, b) => (a.text - b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
        setTodoList([...todoList]);
    }

    return (
        <div>
            <TodoForm addTodo={addTodo} />
            <button onClick={handleSortByDone}>Sort by Status</button>
            <button onClick={handleSortByName}>Sort by Name</button>
            {todoList.map((todo, index) => (
                <Todo
                    todo={todo}
                    key={index}
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                />
            ))}
        </div>
    )
}