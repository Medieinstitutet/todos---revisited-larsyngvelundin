export const Todo = ({ todo, handleDone, handleDelete }) => {
    return (
        <div>
            <span>
                <span className={`checked-${todo.completed}`} onClick={() => handleDone(todo.id)} />
                <span className="delete-button" onClick={() => handleDelete(todo.id)}></span>
                {todo.text}
            </span>
        </div>
    )
}