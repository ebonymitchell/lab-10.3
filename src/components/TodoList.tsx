import { useTodos } from "../contexts/TodoContext";
import { useFilter } from "../contexts/FilterContext";
import TodoItem from "./TodoItem";

// Display only the todos matching the selected filter.
export default function TodoList() {
    const { todos } = useTodos();
    const { filter } = useFilter();

    // Derive the visible list without modifying the original todos.
    const visibleTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <section>
            <h2>Todos ({visibleTodos.length})</h2>

            {visibleTodos.length === 0 ? (
                <p>No todos match the current filter.</p>
            ) : (
                <ul>
                    {visibleTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </section>
    );
}
