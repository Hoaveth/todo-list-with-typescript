import React from "react";
import "./styles/styles.css";
import { Todo } from "./models/model";
import SingleTodo from "./SingleTodo";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todoList, setTodoList }: Props) => {
  return (
    <div className="todos">
      {todoList.map((item) => (
        <SingleTodo
          todo={item}
          key={item.id}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </div>
  );
};

export default TodoList;
