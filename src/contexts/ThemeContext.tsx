import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

// Define the supported theme values.
export type Theme = "light" | "dark";

// Define the shared theme state and action.
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
    const [theme, setTheme] = useState<Theme>(loadTheme);

    // Persist theme changes to localStorage.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.error("Unable to save theme:", error);
        }
    }, [theme]);

    // Keep the toggle function stable between renders.
    const toggleTheme = useCallback(() => {
        setTheme((previousTheme) =>
            previousTheme === "light" ? "dark" : "light"
        );
    }, []);

    // Recreate the context value only when the theme changes.
    const contextValue = useMemo(
        () => ({ theme, toggleTheme }),
        [theme, toggleTheme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
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
