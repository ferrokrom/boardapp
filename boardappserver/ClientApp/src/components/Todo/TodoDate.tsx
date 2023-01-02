import React, { useRef } from "react";
import { BsCalendarCheck } from "react-icons/bs";
import { Todo } from "../../types";
import useToggle from "../../hooks/useToggle";
import Calender from "../Elements/Calender";
import Priority from "../Elements/Priority";
import { useUpdateTodo } from "../../features/todo/api/updateTodo";

type TodoDateProps = {
  todoItem: Todo;
  sectionId: string;
};

function TodoDate({ todoItem, sectionId }: TodoDateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [openCalender, setOpenCalender] = useToggle();
  const { mutateAsync } = useUpdateTodo({ sectionId });

  function onSubmitFn(day: Date) {
    const data = {
      todoId: todoItem.id,
      body: {
        title: todoItem.title,
        priority: todoItem.priority,
        dueDate: day,
      },
    };
    mutateAsync({ data });
  }

  return (
    <div ref={ref} className="text-xs flex items-center gap-1">
      <span>
        <BsCalendarCheck onClick={() => setOpenCalender()} size={14} />
      </span>
      <span className="relative">
        {openCalender && (
          <Calender
            value={todoItem.duedate}
            onSubmit={onSubmitFn}
            setOpenCalender={setOpenCalender}
          />
        )}
      </span>
      <span>
        <Priority date={todoItem.duedate.toString()} />
      </span>
    </div>
  );
}

export default TodoDate;
