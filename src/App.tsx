import { TodoProvider, useTodos } from "./contexts/TodoContext";
import "./App.css";

// Temporary test component for our first context feature.
function TodoTest() {
  const { todos, addTodo } = useTodos();

  return (
    <main>
      <h1>Context API Todo App</h1>

      <button onClick={() => addTodo("Learn React Context API")}>
        Add Test Todo
      </button>

      <h2>Todos ({todos.length})</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </main>
  );
}

// Wrap the component with the provider so it can
// access the shared todo state.
export default function App() {
  return (
    <TodoProvider>
      <TodoTest />
    </TodoProvider>
  );
}
