import { useState, type SubmitEvent } from "react";
import { useTodos } from "../contexts/TodoContext";

// This component allows users to create new todos.
export default function TodoInput() {
    // Store the current value of the input field.
    const [text, setText] = useState("");

    // Access the addTodo action from our shared context.
    const { addTodo } = useTodos();

    // Handle form submission without refreshing the page.
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // Prevent empty or whitespace-only todos.
        if (!text.trim()) return;

        // Add the todo through our context.
        addTodo(text);

        // Clear the input after successful submission.
        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="todo-input">New Todo</label>

            <input
                id="todo-input"
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="What needs to be done?"
            />

            <button type="submit">Add Todo</button>
        </form>
    );
}
