import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./models/model";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import "./styles/styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({
  index,
  todo,
  todoList,
  setTodoList,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    todoList.map((todo) => {
      if (todo.id === id) {
        setCompletedTodos([
          ...completedTodos,
          { ...todo, isDone: !todo.isDone },
        ]);
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodoList(todoList.filter((todo) => todo.id !== id));
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
            {todo.isDone ? null : (
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
            )}

            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <FaTrash />
            </span>

            {todo.isDone ? null : (
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <FaCheckCircle />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
