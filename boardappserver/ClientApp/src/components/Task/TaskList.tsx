import React from "react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

import useToggle from "../../hooks/useToggle";
import { Todo } from "../../types";
import formatDate from "../../utils/formatDate";
import Priority from "../Elements/Priority";
import Modal from "../Modal";

import TaskDetail from "./TaskDetail";

type ListSectionProps = {
  todoItem: Todo;
};

function TaskList({ todoItem }: ListSectionProps) {
  const [openTaskDetail, setOpenTaskDetail] = useToggle();

  if (!todoItem) return <div>You have been assigned any task yet.</div>;

  return (
    <div className="w-full flex w-full gap-1 flex-col mb-2">
      <div className="flex justify-between flex-col border-b-2">
        <div className="flex flex-start py-2 px-4 gap-4 items-center bg-gray-300 -mb-1">
          {todoItem.section.title}
        </div>
      </div>

      <div className="flex gap-4    border border-gray-300 rounded items-center">
        <div
          className={` flex w-1/2 flex-start p-2 gap-3 border-l-3 border-${todoItem.section.color} rounded-lg items-center`}
        >
          {todoItem?.isCompleted ? (
            <BsCheckCircle size={20} className=" text-green-600" />
          ) : (
            <BsCircle size={20} />
          )}
          <div> {todoItem.title}</div>
          <FaComment onClick={setOpenTaskDetail} />
        </div>
        <div className="w-1/3 relative flex justify-start gap-2">
          <div>{formatDate(todoItem.duedate)}</div>
        </div>
        <div className="w-1/3 relative flex justify-start items-center gap-2">
          <Priority date={todoItem.duedate.toString()} />
        </div>
      </div>
      {openTaskDetail && (
        <Modal open={openTaskDetail} onClose={setOpenTaskDetail}>
          <TaskDetail todoItem={todoItem} />
        </Modal>
      )}
    </div>
  );
}

export default TaskList;
