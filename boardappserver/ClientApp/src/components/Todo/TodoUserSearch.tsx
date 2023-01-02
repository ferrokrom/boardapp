import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import { useAddUserToDo } from "../../features/todo/api/addUserToTodo";
import { useRemoveUserFromTodo } from "../../features/todo/api/removeUserFromTodo";
import { useGetUsers } from "../../features/user/api/getUsers";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Todo } from "../../types";
import SearchField from "../Elements/SearchField";

type UserSearchListProp = {
  todoItem: Todo;
  isOpen: boolean;
  setIsUserMenuOpen: () => void;
  sectionId: string;
};

function TodoUserSearch({
  todoItem,
  isOpen,
  sectionId,
  setIsUserMenuOpen,
}: UserSearchListProp) {
  const { data, isLoading } = useGetUsers();
  const ref = useRef<HTMLDivElement>(null);
  const allUsers = data?.data.data;
  const [userList, setUserList] = useState(data?.data.data);
  const [searchField, setSearchField] = useState("");

  const addUserTodoMutation = useAddUserToDo({ sectionId });
  const removeUserTodoMutation = useRemoveUserFromTodo({ sectionId });
  function handleUserSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setUserList(() =>
      allUsers?.filter((item) =>
        item.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }
  useEffect(() => {
    setUserList(data?.data.data);
  }, [data]);
  useOutsideClick(ref, setIsUserMenuOpen);
  if (isLoading) return <div>Receiving Users</div>;
  if (!isOpen) return null;
  return (
    <div
      className="w-64 rounded-md bg-white shadow-md absolute border rounded-lg left-6 p-3 top-0 z-10 flex flex-col items-baseline z-999"
      ref={ref}
    >
      <div className="flex flex-start flex-col align-start mb-1">
        <div className="flex gap-3 items-center  mb-2 w-full">
          <h1>User List</h1>
        </div>
        <SearchField
          label=""
          type="text"
          value={searchField}
          classname="w-full"
          onChange={(e) => {
            setSearchField(e.target.value);
            handleUserSearchInput(e);
          }}
          isLoading={false}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3 w-full">
        {!isLoading &&
          userList?.map((user, index) => (
            <div
              key={index}
              className="p-2 flex items-center align-start border-2 rounded-lg cursor-pointer  "
            >
              <div className="flex w-full items-center gap-2">
                <span className="user-avatar ">
                  <img src={user.avatar} alt="" />
                </span>
                <div>{user.username}</div>
              </div>

              {todoItem.todoUsers.some(
                (todoUser) => user.id === todoUser.userId
              ) ? (
                <div className="flex gap-1 hover:text-red-600">
                  <FaRegTrashAlt
                    onClick={async () => {
                      const userId = user.id;
                      const todoId = todoItem.id;
                      await removeUserTodoMutation.mutateAsync({
                        todoId,
                        userId,
                      });
                    }}
                  />
                </div>
              ) : (
                <div
                  className="flex gap-1 hover:text-green-600 "
                  onClick={async () => {
                    const userId = user.id;
                    const todoId = todoItem.id;
                    addUserTodoMutation.mutateAsync({ userId, todoId });
                  }}
                >
                  <FaPlus />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TodoUserSearch;
