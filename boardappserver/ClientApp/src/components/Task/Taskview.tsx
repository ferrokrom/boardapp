import React, { useEffect, useState } from "react";

import useAuth from "../../Auth/useAuth";

import { useGetTodosByUser } from "../../features/todo/api/getTodosByUserId";

import TaskList from "./TaskList";

function Taskview() {
  const { user } = useAuth();
  const [userId, setUserId] = useState("");

  console.log(user?.id);
  const { data, isLoading } = useGetTodosByUser({ userId });
  const [todos, setTodos] = useState(data?.data.data);
  console.log(todos);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setTodos(data?.data.data);
    }
  }, [data]);

  if (!todos?.length) {
    return <div>You have no Todos</div>;
  }

  return (
    <div className="p-5 overflow-y-auto flex- flex-col h-screen">
      <div className="text-lg font-bold">MY TASKS</div>
      <div className="flex gap-1 w-full  mb-3">
        <div className="w-1/2 flex"></div>
        <div className="w-1/3 flex">DUE DATE</div>
        <div className="w-1/3 flex">PRIORITY</div>
      </div>
      {!isLoading &&
        todos.map((todoItem, index) => {
          return (
            <div key={index}>
              <TaskList todoItem={todoItem} />
            </div>
          );
        })}
    </div>
  );
}

export default Taskview;
