import { useTodos } from "../contexts/TodoContext";

// Display all todos stored in the shared TodoContext.
export default function TodoList() {
    // Read the current todos directly from context.
    const { todos } = useTodos();

    return (
        <section>
            <h2>Todos ({todos.length})</h2>

            {todos.length === 0 ? (
                <p>No todos yet. Add your first task!</p>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>{todo.text}</li>
                    ))}
                </ul>
            )}
        </section>
    );
}
