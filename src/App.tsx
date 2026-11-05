import { TodoProvider } from "./contexts/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

// The provider shares todo state with both components.
export default function App() {
  return (
    <TodoProvider>
      <main>
        <h1>Context API Todo App</h1>
        <TodoInput />
        <TodoList />
      </main>
    </TodoProvider>
  );
}
