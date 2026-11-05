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

// Define the data and actions available through the context.
interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
}

// Create the shared context.
const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

interface TodoProviderProps {
    children: ReactNode;
}

// Manage shared todo state and actions.
export function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Add a new task to the existing list.
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

    // Toggle the completion status of the selected task.
    function toggleTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

// Safely access the shared todo context.
export function useTodos() {
    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider");
    }

    return context;
}
