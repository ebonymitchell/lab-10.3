import { TodoProvider } from "./contexts/TodoContext";
import { FilterProvider } from "./contexts/FilterContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import ClearCompletedButton from "./components/ClearCompletedButton";
import "./App.css";

// Both providers make their independent state available to the app.
export default function App() {
  return (
    <TodoProvider>
      <FilterProvider>
        <main>
          <h1>Context API Todo App</h1>

          <TodoInput />
          <FilterButtons />
          <TodoList />
          <ClearCompletedButton />
        </main>
      </FilterProvider>
    </TodoProvider>
  );
}
