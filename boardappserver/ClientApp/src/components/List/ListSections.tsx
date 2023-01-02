import React, { useState, useEffect } from "react";

import { useTodos } from "../../features/todo/api/getTodos";
import useToggle from "../../hooks/useToggle";
import TodoAssignList from "../Todo/TodoAssignList";
import TodoDate from "../Todo/TodoDate";
import TodoInput from "../Todo/TodoInput";
import { Section } from "../../types";
import ListSectionHeader from "./ListSectionHeader";
import NewTodo from "../Todo/NewTodo";
import formatDate from "../../utils/formatDate";

type ListSectionProps = {
  section: Section;
  boardId: string;
};

function ListSection({ section, boardId }: ListSectionProps) {
  const sectionId = section.id;
  const [newTodo, setNewTodo] = useToggle();

  const { data, isLoading } = useTodos({ sectionId });

  const [todos, setTodo] = useState(data?.data.data);

  useEffect(() => {
    setTodo(data?.data.data);
  }, [data]);

  if (!data) return null;
  return (
    <div className="w-full flex w-full gap-1 flex-col mb-2">
      <ListSectionHeader
        section={section}
        setNewTodo={setNewTodo}
        boardId={boardId}
      />
      <div className="w-1/6">
        {" "}
        {newTodo && <NewTodo sectionId={sectionId} setNewTodo={setNewTodo} />}
      </div>
      {!isLoading &&
        todos?.map((todoItem, index) => (
          <div
            key={index}
            className="flex gap-4   border border-gray-300 rounded items-center"
          >
            <div
              className="flex w-1/2 flex-start"
              style={{
                borderLeft: `3px solid ${section.color}`,
                borderRadius: "3px",
              }}
            >
              <TodoInput todoItem={todoItem} sectionId={sectionId} />
            </div>
            <div className="w-1/4 relative flex justify-start gap-2">
              <div>{formatDate(todoItem.duedate)}</div>
            </div>
            <div className="w-1/4 relative flex justify-start items-center gap-2">
              <TodoDate todoItem={todoItem} sectionId={sectionId} />
            </div>

            <div className="w-1/4 flex align-center justify-start">
              <TodoAssignList todoItem={todoItem} sectionId={sectionId} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListSection;
