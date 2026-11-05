import { useTodos } from "../contexts/TodoContext";

// Remove completed tasks from the shared todo list.
export default function ClearCompletedButton() {
    const { todos, clearCompleted } = useTodos();

    // Count how many completed tasks currently exist.
    const completedCount = todos.filter(
        (todo) => todo.completed
    ).length;

    return (
        <button
            type="button"
            onClick={clearCompleted}
            disabled={completedCount === 0}
        >
            Clear Completed ({completedCount})
        </button>
    );
}
