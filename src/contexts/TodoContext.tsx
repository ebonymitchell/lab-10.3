import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

// Define the structure of an individual todo.
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Define shared todo state and actions.
interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

interface TodoProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = "context-api-todos";

// Validate data retrieved from localStorage.
function isTodoArray(value: unknown): value is Todo[] {
    return (
        Array.isArray(value) &&
        value.every(
            (item) =>
                typeof item === "object" &&
                item !== null &&
                typeof item.id === "string" &&
                typeof item.text === "string" &&
                typeof item.completed === "boolean"
        )
    );
}

// Restore previously saved todos when state initializes.
function loadTodos(): Todo[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return [];

        const parsed: unknown = JSON.parse(saved);

        return isTodoArray(parsed) ? parsed : [];
    } catch {
        // Fall back to an empty list if storage is unavailable
        // or contains invalid JSON.
        return [];
    }
}

export function TodoProvider({ children }: TodoProviderProps) {
    // Lazy initialization reads localStorage on initial render.
    const [todos, setTodos] = useState<Todo[]>(loadTodos);

    // Persist the latest todo state whenever it changes.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error("Unable to save todos:", error);
        }
    }, [todos]);

    // Add a new task.
    function addTodo(text: string) {
        const trimmedText = text.trim();

        if (!trimmedText) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: trimmedText,
            completed: false,
        };

        setTodos((previousTodos) => [...previousTodos, newTodo]);
    }

    // Toggle the completed status of a task.
    function toggleTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    // Edit the text of a task.
    function editTodo(id: string, newText: string) {
        const trimmedText = newText.trim();

        if (!trimmedText) return;

        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, text: trimmedText }
                    : todo
            )
        );
    }

    // Delete a task by its ID.
    function deleteTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => todo.id !== id)
        );
    }

    // Remove completed tasks while preserving active tasks.
    function clearCompleted() {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => !todo.completed)
        );
    }

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

// Access shared todo state from components inside the provider.
export function useTodos() {
    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider");
    }

    return context;
}
