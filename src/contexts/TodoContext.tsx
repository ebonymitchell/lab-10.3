import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Describe the data stored in each todo.
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Describe the shared state and available actions.
interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

interface TodoProviderProps {
    children: ReactNode;
}

// Provide shared todo state to child components.
export function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Add a new task without mutating the existing array.
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

    // Reverse the completed status of the matching task.
    function toggleTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    // Replace the text of a matching task.
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

    // Remove the selected task from the list.
    function deleteTodo(id: string) {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => todo.id !== id)
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
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

// Access context only from inside TodoProvider.
export function useTodos() {
    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider");
    }

    return context;
}
