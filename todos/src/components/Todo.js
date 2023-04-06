export const Todo = ({ todo, handleDone, handleDelete }) => {
    return (
        <div>
            <span>
                <span className={`checked-${todo.done}`} onClick={() => handleDone(todo.name)} />
                <span className="delete-button" onClick={() => handleDelete(todo.name)}></span>
                {todo.name}
            </span>
        </div>
    )
}