import { useTodos, type Todo } from "../contexts/TodoContext";

// Define the props received from TodoList.
interface TodoItemProps {
    todo: Todo;
}

// Display an individual todo and its completion checkbox.
export default function TodoItem({ todo }: TodoItemProps) {
    // Access the shared toggle action through context.
    const { toggleTodo } = useTodos();

    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />

                <span
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        opacity: todo.completed ? 0.6 : 1,
                    }}
                >
                    {todo.text}
                </span>
            </label>
        </li>
    );
}
