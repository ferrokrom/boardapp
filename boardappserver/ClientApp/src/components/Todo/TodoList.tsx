import React from "react";
import TodoInput from "./TodoInput";
import TodoDate from "./TodoDate";
import TodoAssignList from "./TodoAssignList";
import { useTodos } from "../../features/todo/api/getTodos";

type TodoListProps = {
  sectionId: string;
};
const TodoList = ({ sectionId }: TodoListProps) => {
  const { data, isLoading } = useTodos({ sectionId });
  if (!data) return null;

  return (
    <div className="p-2">
      {!isLoading &&
        data.data.data
          .map((todoItem, index) => (
            <div
              key={index}
              className=" animate-fadeIn p-2 rounded-md transition duration-300 hover:bg-red-100 border border-gray-300 mb-4 bg-gray-200 items-center p-1"
            >
              <TodoInput todoItem={todoItem} sectionId={sectionId} />
              <div className="flex justify-between px-1 ">
                <div className="flex">
                  <TodoDate todoItem={todoItem} sectionId={sectionId} />
                </div>
                <TodoAssignList todoItem={todoItem} sectionId={sectionId} />
              </div>
            </div>
          ))
          .sort()}
    </div>
  );
};

export default TodoList;
