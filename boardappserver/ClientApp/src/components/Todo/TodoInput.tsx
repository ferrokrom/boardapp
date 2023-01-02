import React, { useState, useRef, useEffect } from "react";

import { AiOutlineMore } from "react-icons/ai";

import { Todo as ITodo, Todo } from "../../types";
import useToggle from "../../hooks/useToggle";
import InputField from "../Elements/InputField";
import TodoDropDown from "./TodoDropDown";
import Modal from "../Modal";
import { useUpdateTodo } from "../../features/todo/api/updateTodo";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import TodoDetail from "./TodoDetail";

type TodoProps = {
  todoItem: ITodo;
  sectionId: string;
};
function TodoInput({ todoItem, sectionId }: TodoProps) {
  const [todoInput, setTodoInput] = useState<Todo>(todoItem);

  const updateTodoUpdateMutation = useUpdateTodo({ sectionId });

  const ref = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useToggle();

  useEffect(() => {
    setTodoInput(todoItem);
  }, [todoItem]);
  const [isOptionButtonOpen, setIsOptionButtonOpen] = useToggle();
  const [_, setOpenTaskDetail] = useToggle();

  function handleTaskCompleted(e: MouseEvent) {
    e.preventDefault();
    const data = {
      todoId: todoItem.id,
      body: {
        title: todoInput.title,
        dueDate: todoInput.duedate,
        priority: todoInput.priority,
        isCompleted: !todoInput.isCompleted,
        description: todoInput.description,
      },
    };
    updateTodoUpdateMutation.mutateAsync({ data });
  }
  function handleUpdateTask(e: any) {
    e.preventDefault();
    console.log("update", todoItem.isCompleted);
    const data = {
      todoId: todoItem.id,
      body: {
        title: todoInput.title,
        dueDate: todoInput.duedate,
        priority: todoInput.priority,
        isCompleted: todoInput.isCompleted,
        description: todoInput.description,
      },
    };
    updateTodoUpdateMutation.mutateAsync({ data });
  }

  return (
    <div className="mb-1">
      <form
        className=" w-full flex justify-between  items-center p-1"
        onSubmit={handleUpdateTask}
      >
        {todoInput?.isCompleted ? (
          <BsCheckCircle
            size={22}
            className=" text-green-600"
            onClick={(e: any) => {
              handleTaskCompleted(e);
            }}
          />
        ) : (
          <BsCircle
            size={22}
            onClick={(e: any) => {
              handleTaskCompleted(e);
            }}
          />
        )}
        <InputField
          label=""
          classname="border-none bg-transparent shadow-none "
          value={todoInput?.title}
          type="text"
          isLoading={false}
          onChange={(e) =>
            setTodoInput((prev: any) => ({ ...prev, title: e.target.value }))
          }
        />
        <div ref={ref} className="relative" onClick={setIsOptionButtonOpen}>
          <div className="p flex relative rounded-sm">
            <AiOutlineMore
              size={24}
              className=" w-5 h-5  hover:text-red-700 cursor-pointer "
            />
          </div>
          {isOptionButtonOpen && (
            <TodoDropDown
              setOpenTaskDetail={setOpenTaskDetail}
              todoId={todoItem.id}
              sectionId={sectionId}
              setOpenModal={setOpenModal}
              setIsOptionButtonOpen={setIsOptionButtonOpen}
              handleTaskCompleted={handleTaskCompleted}
            />
          )}
        </div>
      </form>
      {openModal && (
        <Modal open={openModal} onClose={setOpenModal}>
          <TodoDetail todoId={todoItem.id} sectionId={sectionId} />
        </Modal>
      )}
    </div>
  );
}

export default TodoInput;
