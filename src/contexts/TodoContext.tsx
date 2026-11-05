import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Define the structure of an individual todo.
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Define the shared todo state and all available actions.
interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
}

// Create the shared context.
// Undefined allows us to detect a missing provider.
const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

// Define the children accepted by the provider.
interface TodoProviderProps {
    children: ReactNode;
}

// Manage shared todo state and expose actions to child components.
export function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Add a new task without mutating the existing array.
    function addTodo(text: string) {
        const trimmedText = text.trim();

        // Prevent empty or whitespace-only tasks.
        if (!trimmedText) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: trimmedText,
            completed: false,
        };

        setTodos((previousTodos) => [...previousTodos, newTodo]);
    }

    // Toggle the completion status of the matching task.
    function toggleTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    // Update the text of an existing task.
    function editTodo(id: string, newText: string) {
        const trimmedText = newText.trim();

        // Do not allow a task to be saved with empty text.
        if (!trimmedText) return;

        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, text: trimmedText }
                    : todo
            )
        );
    }

    // Remove a specific task using its unique ID.
    function deleteTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => todo.id !== id)
        );
    }

    // Remove all completed tasks while preserving active tasks.
    function clearCompleted() {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => !todo.completed)
        );
    }

    // Make the shared state and actions available to consumers.
    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                toggleTodo,
                editTodo,
                deleteTodo,
                clearCompleted,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

// Custom hook for accessing the shared todo context.
export function useTodos() {
    const context = useContext(TodoContext);

    // Prevent the hook from being used outside its provider.
    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider");
    }

    return context;
}
