import { useState, type SubmitEvent } from "react";
import { useTodos, type Todo } from "../contexts/TodoContext";

interface TodoItemProps {
    todo: Todo;
}

// Manage the display and editing of an individual todo.
export default function TodoItem({ todo }: TodoItemProps) {
    const { toggleTodo, editTodo, deleteTodo } = useTodos();

    // Editing state belongs to this individual component.
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    // Save edited text through the shared context.
    function handleSave(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!editedText.trim()) return;

        editTodo(todo.id, editedText);
        setIsEditing(false);
    }

    // Restore the original text when editing is canceled.
    function handleCancel() {
        setEditedText(todo.text);
        setIsEditing(false);
    }

    return (
        <li>
            {isEditing ? (
                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(event) => setEditedText(event.target.value)}
                        aria-label="Edit todo"
                        autoFocus
                    />

                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />

                        <span
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                                opacity: todo.completed ? 0.6 : 1,
                            }}
                        >
                            {todo.text}
                        </span>
                    </label>

                    <button
                        type="button"
                        onClick={() => {
                            setEditedText(todo.text);
                            setIsEditing(true);
                        }}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </li>
    );
}
