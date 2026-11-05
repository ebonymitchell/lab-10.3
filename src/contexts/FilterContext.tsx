import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

// Restrict the visibility filter to supported values.
export type TodoFilter = "all" | "active" | "completed";

// Define the shared filter state and updater.
interface FilterContextType {
    filter: TodoFilter;
    setFilter: (filter: TodoFilter) => void;
}

// Create a context with a missing-provider check.
const FilterContext = createContext<FilterContextType | undefined>(
    undefined
);

interface FilterProviderProps {
    children: ReactNode;
}

// Manage the selected visibility filter.
export function FilterProvider({ children }: FilterProviderProps) {
    const [filter, setFilter] = useState<TodoFilter>("all");

    // Keep the context value stable until the filter changes.
    // React's state setter already has a stable reference.
    const contextValue = useMemo(
        () => ({ filter, setFilter }),
        [filter]
    );

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    );
}

// Access the filter from components inside FilterProvider.
export function useFilter() {
    const context = useContext(FilterContext);

    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }

    return context;
}
