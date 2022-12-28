import React from "react";
import { Todo } from "./models/model";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import "./styles/styles.css";

interface Props {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todoList, setTodoList }: Props) => {
  return (
    <form className="todos__single">
      <span className="todos__single--text">{todo.todo}</span>
      <div>
        <span className="icon">
          <FaEdit />
        </span>
        <span className="icon">
          <FaTrash />
        </span>

        <span className="icon">
          <FaCheckCircle />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
