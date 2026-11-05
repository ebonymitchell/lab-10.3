import { useTheme } from "../contexts/ThemeContext";

// Let users switch between the two supported themes.
export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
}
