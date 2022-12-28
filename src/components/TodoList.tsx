import React from "react";
import "./styles/styles.css";
import { Todo } from "./models/model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todoList,
  setTodoList,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            <div>
              {todoList.map((item, index) => (
                <SingleTodo
                  index={index}
                  todo={item}
                  key={item.id}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoListCompleted">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            <div>
              {completedTodos.map((item, index) => (
                <SingleTodo
                  index={index}
                  todo={item}
                  key={item.id}
                  todoList={completedTodos}
                  setTodoList={setCompletedTodos}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
