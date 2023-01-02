import React, { useState, useEffect, FormEvent } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useGetTodo } from "../../features/todo/api/getTodo";
import { Todo } from "../../types";
import TodoUserSearch from "./TodoUserSearch";
import { useDeleteTodo } from "../../features/todo/api/deleteTodo";
import { useUpdateTodo } from "../../features/todo/api/updateTodo";
import TodoDate from "./TodoDate";
import InputField from "../Elements/InputField";
import TextareaField from "../Elements/TextareaField";
import Button from "../Elements/Button";
import useToggle from "../../hooks/useToggle";
import { useRemoveUserFromTodo } from "../../features/todo/api/removeUserFromTodo";

type TodoDetailProps = {
  todoId: string;
  sectionId: string;
};

function TodoDetail({ todoId, sectionId }: TodoDetailProps) {
  const { data, isLoading, isError } = useGetTodo({ todoId });
  const todoData = data?.data.data as Todo;

  const [todo, setTodo] = useState<Todo>(todoData);

  const deleteTodoMutation = useDeleteTodo({ sectionId });
  const updateTodoMutation = useUpdateTodo({ sectionId });
  const removeUserFromTodoMutation = useRemoveUserFromTodo({ sectionId });

  const [openList, setOpenList] = useToggle();

  useEffect(() => {
    if (data) {
      setTodo(data?.data.data ?? {});
    }
  }, [data]);
  console.log("data", data?.data.data);
  function handleUpdateTodo(e: FormEvent) {
    e.preventDefault();
    const data = {
      todoId: todo.id,
      body: {
        title: todo.title,
        dueDate: todo.duedate,
        priority: todo.priority,
        isCompleted: todo.isCompleted,
        description: todo.description,
      },
    };
    updateTodoMutation.mutateAsync({ data });
  }
  if (isLoading) return <div>Waiting...</div>;
  if (!data || isError)
    return <div>Problem occured while retreiving the data</div>;

  return (
    <div>
      {todo && (
        <form onSubmit={handleUpdateTodo}>
          <div className="text-lg">Task</div>
          <div className="text-sm">
            <InputField
              label=""
              classname="e "
              value={todo.title}
              type="text"
              isLoading={false}
              onChange={(e) =>
                setTodo((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="text-lg">Details</div>
          <div className="text-sm mb-5">
            <TextareaField
              label=""
              classname="e "
              value={todo.description}
              isLoading={false}
              onChange={(e) =>
                setTodo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full flex flex-col gap-3 -mt-1">
            <div className="text-sm flex gap-3 items-center">
              <div className="text-sm">Collaborators:</div>
              {todo?.todoUsers?.map((todoUser, index) => (
                <div
                  className="border-2 px-2  py-1 rounded-full bg-gray-200 text-sm"
                  key={index}
                >
                  <div className="flex w-full gap-2 items-center">
                    <div>{todoUser?.user.username}</div>
                    <span>
                      <AiOutlineClose
                        className="cursor-pointer"
                        onClick={async () => {
                          const userId = todoUser.userId;
                          const todoId = todoUser.todoId;
                          removeUserFromTodoMutation.mutateAsync({
                            todoId,
                            userId,
                          });
                        }}
                      />
                    </span>
                  </div>
                </div>
              ))}
              <div className="relative">
                <FaPlus onClick={setOpenList} />
                {openList && (
                  <TodoUserSearch
                    todoItem={todo}
                    isOpen={openList}
                    setIsUserMenuOpen={setOpenList}
                    sectionId={sectionId}
                  />
                )}
              </div>
            </div>
            <div className="text-sm flex gap-3">Status: In Progress</div>
            <div className="text-sm flex gap-3">
              DueDate:
              <TodoDate todoItem={todo} sectionId={sectionId} />
            </div>

            <div className="flex flex-col ">
              <span className="text-sm">
                Created :{" "}
                {new Date(todo.createdAt.toString()).toLocaleDateString()}
              </span>
              <span className="text-sm">
                Updated :{" "}
                {new Date(todo.updatedAt.toString()).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-sm flex flex-end gap-3 w-full mr-10  mt-3">
            <Button
              icon={<FaCheck size={12} />}
              size="md"
              isLoading={updateTodoMutation.isLoading}
              text="Update"
              onClick={handleUpdateTodo}
              variant="primary"
              classname="h-10 rounded-full"
            />
            <Button
              icon={<FaTrash size={12} />}
              size="md"
              isLoading={updateTodoMutation.isLoading}
              text="Delete"
              onClick={async () => {
                deleteTodoMutation.mutateAsync({ todoId });
              }}
              variant="secondary"
              classname="h-10 rounded-full"
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default TodoDetail;
