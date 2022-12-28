import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./models/model";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import "./styles/styles.css";

interface Props {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todoList, setTodoList }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    setIsEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <>
      <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {isEdit ? (
          <>
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          </>
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )}

        <div>
          <span
            className="icon"
            onClick={() => {
              if (!isEdit && !todo.isDone) {
                setIsEdit(!isEdit);
              }
            }}
          >
            <FaEdit />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <FaTrash />
          </span>

          <span className="icon" onClick={() => handleDone(todo.id)}>
            <FaCheckCircle />
          </span>
        </div>
      </form>
    </>
  );
};

export default SingleTodo;
