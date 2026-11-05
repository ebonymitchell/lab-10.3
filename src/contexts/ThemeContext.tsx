import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Restrict the theme to two supported values.
export type Theme = "light" | "dark";

// Define the shared theme state and action.
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// Create the context with a missing-provider check.
const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

interface ThemeProviderProps {
    children: ReactNode;
}

// Manage the application's selected theme.
export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>("light");

    // Switch between light and dark modes.
    function toggleTheme() {
        setTheme((previousTheme) =>
            previousTheme === "light" ? "dark" : "light"
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Access theme state from components inside ThemeProvider.
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
