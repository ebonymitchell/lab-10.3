import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

// Define the structure of each todo.
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Define the shared todo state and available actions.
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

// Validate data restored from localStorage.
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

// Restore previously saved todos.
function loadTodos(): Todo[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return [];

        const parsed: unknown = JSON.parse(saved);

        return isTodoArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>(loadTodos);

    // Save todos whenever the list changes.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error("Unable to save todos:", error);
        }
    }, [todos]);

    // useCallback keeps each action's function reference stable.
    const addTodo = useCallback((text: string) => {
        const trimmedText = text.trim();

        if (!trimmedText) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: trimmedText,
            completed: false,
        };

        setTodos((previousTodos) => [...previousTodos, newTodo]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }, []);

    const editTodo = useCallback(
        (id: string, newText: string) => {
            const trimmedText = newText.trim();

            if (!trimmedText) return;

            setTodos((previousTodos) =>
                previousTodos.map((todo) =>
                    todo.id === id
                        ? { ...todo, text: trimmedText }
                        : todo
                )
            );
        },
        []
    );

    const deleteTodo = useCallback((id: string) => {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => todo.id !== id)
        );
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => !todo.completed)
        );
    }, []);

    // Recreate the context value only when its dependencies change.
    const contextValue = useMemo(
        () => ({
            todos,
            addTodo,
            toggleTodo,
            editTodo,
            deleteTodo,
            clearCompleted,
        }),
        [
            todos,
            addTodo,
            toggleTodo,
            editTodo,
            deleteTodo,
            clearCompleted,
        ]
    );

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}

// Access shared todo state from inside the provider.
export function useTodos() {
    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider");
    }

    return context;
}
