import { useTodos } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";

// Display all todos from the shared context.
export default function TodoList() {
    const { todos } = useTodos();

    return (
        <section>
            <h2>Todos ({todos.length})</h2>

            {todos.length === 0 ? (
                <p>No todos yet. Add your first task!</p>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </section>
    );
}
