import React from "react";
import { Section } from "../../types";
import useToggle from "../../hooks/useToggle";
import Header from "./Header";
import { useTodos } from "../../features/todo/api/getTodos";
import TodoList from "../Todo/TodoList";
import NewTodo from "../Todo/NewTodo";

type SectionProps = {
  section: Section;
  boardId: string;
};

const Index = ({ section, boardId }: SectionProps) => {
  const [addNewTask, setNewTodo] = useToggle();

  const sectionId = section.id;

  if (!section) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        waiting
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-lg mr-5 animate-fadeIn border-2 h-fit"
      style={{ minWidth: "300px", maxWidth: "300px" }}
    >
      <Header section={section} setNewTodo={setNewTodo} boardId={boardId} />
      {addNewTask && <NewTodo sectionId={sectionId} setNewTodo={setNewTodo} />}
      
        <TodoList  sectionId={sectionId} />
      
    </div>
  );
};
export default Index;
