import React, { FormEvent, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
import { useCreateTodo } from "../../features/todo/api/createTodo";

const NewTodo = ({
  sectionId,
  setNewTodo,
}: {
  sectionId: string;
  setNewTodo: () => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const createTodoQuery = useCreateTodo({ sectionId });

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const title = target.task.value;

    createTodoQuery.mutateAsync({ title, sectionId });
    setNewTodo();
  }
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <div className="flex justify-between items-center p-2  ">
      New Todo:
      <div className=" animate-fadeIn p-1 w-full rounded-md transition duration-300  border border-gray-400  items-center">
        <form onSubmit={handleOnSubmit} className="flex justify-between gap-2">
          <input
            ref={ref}
            type="text"
            placeholder=""
            name="task"
            className="border border-gray-300 hover:bg-blue-100 w-full rounded-md p-1 w-54 animate-fadeIn "
          />
          <button className="rounded-md items-center bg-blue-300 rounded-lg  p-2 ">
            <FaPlus />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTodo;
