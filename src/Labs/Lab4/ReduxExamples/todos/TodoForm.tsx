import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item">
            <button 
                onClick={() =>  dispatch(addTodo(todo))}
                className="btn btn-success btn-sm float-end"
                id="wd-add-todo-click"
            > 
                Add 
            </button>
            <button 
                onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"
                className="btn btn-warning btn-sm float-end"
            > 
                Update 
            </button>
            <input
                className="form-control w-50"
                defaultValue={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} 
            />
        </li>
    );
}