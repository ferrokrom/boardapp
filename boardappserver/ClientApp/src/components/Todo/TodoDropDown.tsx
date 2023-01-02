import React, { useRef } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { useDeleteTodo } from "../../features/todo/api/deleteTodo";
import useOutsideClick from "../../hooks/useOutsideClick";

type TodoDropDownProps = {
  setOpenTaskDetail: () => void;
  todoId: string;
  sectionId: string;
  setOpenModal: () => void;
  setIsOptionButtonOpen: () => void;
  handleTaskCompleted: (e: MouseEvent) => void;
};
function TodoDropDown({
  setOpenTaskDetail,
  sectionId,
  setOpenModal,
  setIsOptionButtonOpen,
  handleTaskCompleted,
  todoId,
}: TodoDropDownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mutateAsync } = useDeleteTodo({ sectionId });

  useOutsideClick(ref, setIsOptionButtonOpen);
  return (
    <div
      className="w-52 rounded-md bg-white shadow-md absolute left-6 top-5 border h-fit flex flex-col items-baseline z-99999"
      ref={ref}
    >
      <div
        onClick={setOpenModal}
        className="flex gap-2 items-center p-3 border-b-2 w-full cursor-pointer overflow-hidden hover:bg-blue-100  rounded-t-lg"
      >
        <FaPen onClick={setOpenModal} />
        Task Details
      </div>
      <div
        onClick={(e: any) => handleTaskCompleted(e as MouseEvent)}
        className="flex gap-2 items-center p-3 border-b-2 w-full cursor-pointer overflow-hidden hover:bg-blue-100  rounded-t-lg"
      >
        <AiOutlineCheckCircle size={20} />
        Mark as Complete
      </div>
      <div
        className="flex gap-2 items-center p-3  w-full hover:bg-blue-100 cursor-pointer rounded-b-lg"
        onClick={async () => await mutateAsync({ todoId })}
      >
        <AiOutlineCloseCircle size={20} />
        <div>Delete Task</div>
      </div>
    </div>
  );
}

export default TodoDropDown;
