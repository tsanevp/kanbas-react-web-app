import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div className="container float-start">
            <h2 className="fw-bold">Todo List</h2>
            <ul className="list-group mb-3">
                <TodoForm />
                {todos.map((todo: any) => (
                    <TodoItem todo={todo} />
                ))}
            </ul>
            <hr />
        </div>
    );
}
