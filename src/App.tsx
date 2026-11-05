import { TodoProvider } from "./contexts/TodoContext";
import { FilterProvider } from "./contexts/FilterContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import ClearCompletedButton from "./components/ClearCompletedButton";
import ThemeToggleButton from "./components/ThemeToggleButton";

import "./App.css";

// Consume the theme inside the provider.
function TodoAppContent() {
  const { theme } = useTheme();

  return (
    <main className="todo-app" data-theme={theme}>
      <header className="app-header">
        <h1>Context API Todo App</h1>
        <ThemeToggleButton />
      </header>

      <TodoInput />
      <FilterButtons />
      <TodoList />
      <ClearCompletedButton />
    </main>
  );
}

// Provide independent todo, filter, and theme state.
export default function App() {
  return (
    <TodoProvider>
      <FilterProvider>
        <ThemeProvider>
          <TodoAppContent />
        </ThemeProvider>
      </FilterProvider>
    </TodoProvider>
  );
}
