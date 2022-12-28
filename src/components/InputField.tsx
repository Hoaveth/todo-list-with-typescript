import React, { useRef } from "react";
import "./styles/styles.css";

//Set the interface for props
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAddTodo }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAddTodo(e);

        if (inputRef.current !== null) {
          inputRef.current.blur();
          inputRef.current.value = "";
        }
      }}
    >
      <input
        ref={inputRef}
        type={"input"}
        placeholder="Enter a task"
        className="input__box"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
