import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

// Define the supported theme values.
export type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

interface ThemeProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = "context-api-theme";

// Restore the saved theme or use light mode by default.
function loadTheme(): Theme {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        return saved === "dark" ? "dark" : "light";
    } catch {
        return "light";
    }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Initialize theme from localStorage.
    const [theme, setTheme] = useState<Theme>(loadTheme);

    // Save the selected theme whenever it changes.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.error("Unable to save theme:", error);
        }
    }, [theme]);

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

// Access theme state from components inside the provider.
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
