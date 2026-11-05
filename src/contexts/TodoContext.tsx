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
}

// Create the context. Undefined helps us detect
// components that are missing the provider.
const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

// Define the children accepted by our provider.
interface TodoProviderProps {
    children: ReactNode;
}

// The provider manages shared todo state.
export function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Add a new todo without modifying the existing array.
    function addTodo(text: string) {
        const trimmedText = text.trim();

        // Prevent empty tasks from being added.
        if (!trimmedText) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: trimmedText,
            completed: false,
        };

        setTodos((previousTodos) => [...previousTodos, newTodo]);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

// Custom hook for accessing the todo context.
export function useTodos() {
    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider");
    }

    return context;
}
