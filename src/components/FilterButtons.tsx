import {
    useFilter,
    type TodoFilter,
} from "../contexts/FilterContext";

// Define the available filters and their display labels.
const filterOptions: { value: TodoFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
];

// Allow users to change the current visibility filter.
export default function FilterButtons() {
    const { filter, setFilter } = useFilter();

    return (
        <nav aria-label="Todo filters">
            {filterOptions.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value)}
                    aria-pressed={filter === option.value}
                    style={{
                        fontWeight: filter === option.value ? "bold" : "normal",
                    }}
                >
                    {option.label}
                </button>
            ))}
        </nav>
    );
}
