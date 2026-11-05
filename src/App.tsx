import { TodoProvider } from "./contexts/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import ClearCompletedButton from "./components/ClearCompletedButton";
import "./App.css";

// Provide shared todo state to the application.
export default function App() {
  return (
    <TodoProvider>
      <main>
        <h1>Context API Todo App</h1>

        <TodoInput />
        <TodoList />
        <ClearCompletedButton />
      </main>
    </TodoProvider>
  );
}
