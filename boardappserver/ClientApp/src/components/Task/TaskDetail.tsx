import React from "react";

import { Todo } from "../../types";
import formatDate from "../../utils/formatDate";
import Priority from "../Elements/Priority";
import Comments from "./Comments";
type TaskDetailProps = {
  todoItem: Todo;
};

function TaskDetail({ todoItem }: TaskDetailProps) {
  return (
    <div className="flex text-base p-3">
      <div className="flex flex-col w-2/3 gap-3">
        <div className="text-lg ">Task Detail</div>
        <div>
          Title
          <div className="text-sm">{todoItem.title}</div>
        </div>
        <div className="">
          Description
          <div className="text-sm">{todoItem.description}</div>
        </div>
        <div className="flex-col flex">
          <Comments todoId={todoItem.id} />
        </div>
      </div>
      <div className="flex flex-col w-1/3 p-2 ">
        <div className="text-sm mb-3 ">
          <div className="mb-1">ASSIGNEES</div>
          <div className="flex">
            <div className="text-sm   flex items-center gap-3">
              {todoItem?.todoUsers.map((todoUser) => (
                <div className="flex gap-2 items-center bg-gray-200 px-2 py-1 rounded-lg">
                  {todoUser?.user?.username}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm ">
          <div className="mb-1">PRIORITY</div>
          <div className="w-1/4 mb-2">
            <Priority date={todoItem.duedate.toString()} />
          </div>
        </div>
        <div className="text-sm" style={{ fontSize: "12px" }}>
          Created at :{formatDate(todoItem.createdAt)}
        </div>
        <div className="text-sm" style={{ fontSize: "12px" }}>
          Updated at:{formatDate(todoItem.updatedAt)}
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
