import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Only these three filter values are allowed.
export type TodoFilter = "all" | "active" | "completed";

// Define the shared filter state and its updater.
interface FilterContextType {
    filter: TodoFilter;
    setFilter: (filter: TodoFilter) => void;
}

// Create the context with a missing-provider check.
const FilterContext = createContext<FilterContextType | undefined>(
    undefined
);

interface FilterProviderProps {
    children: ReactNode;
}

// Manage the current visibility filter.
export function FilterProvider({ children }: FilterProviderProps) {
    const [filter, setFilter] = useState<TodoFilter>("all");

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}

// Access the filter from any component inside FilterProvider.
export function useFilter() {
    const context = useContext(FilterContext);

    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }

    return context;
}
