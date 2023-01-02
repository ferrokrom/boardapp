import React, { useState, FormEvent, useRef } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { User } from "../../types";
import InputField from "../Elements/InputField";
import TextareaField from "../Elements/TextareaField";
import Button from "../Elements/Button";
import useToggle from "../../hooks/useToggle";
import { useCreateBoard } from "../../features/board/api/createBoard";
import Calender from "../Elements/Calender";
import { BsCalendarCheck } from "react-icons/bs";
import UserSearch from "../Elements/UserSearch";

type NewBoardProps = {
  userId: string;
  onClose: () => void;
};
export interface IAddUser {
  userId: string;
  username: string;
}
type CreateBoardDTO = {
  title: string;
  description: string;
  isDefault: boolean;
  dueDate: Date;
  users: IAddUser[];
};

function NewBoard({ userId, onClose }: NewBoardProps) {
  const createBoardMutations = useCreateBoard({ userId });

  const ref = useRef<HTMLDivElement>(null);

  const [openCalender, setOpenCalender] = useToggle();
  const [newBoard, setNewBoard] = useState<CreateBoardDTO>({
    title: "",
    isDefault: false,
    users: [],
    dueDate: new Date(),
    description: "",
  });

  const [openList, setOpenList] = useToggle();

  function handleAddUsertoBoard(user: User) {
    const bodyUser = {
      userId: user.id,
      username: user.username,
    };
    setNewBoard((prev) => ({ ...prev, users: [...prev.users, bodyUser] }));
  }
  function handleRemoveUserFromBoard(user: User) {
    setNewBoard((prev) => ({
      ...prev,
      users: [...prev.users.filter((item) => item.userId !== user.id)],
    }));
  }
  function handleSetDueDate(dueDate: Date) {
    setNewBoard((prev) => ({
      ...prev,
      dueDate: dueDate,
    }));
  }

  function handleCreateBoard(e: FormEvent) {
    e.preventDefault();
    const data = {
      userId: userId,
      body: {
        title: newBoard.title,
        description: newBoard.description,
        dueDate: newBoard.dueDate,
        isDefault: newBoard.isDefault,
        users: newBoard.users,
      },
    };

    createBoardMutations.mutateAsync({ data });
  }

  return (
    <div>
      <form onSubmit={handleCreateBoard} className="flex flex-col gap-3">
        <div className="text-lg">New Board</div>
        <div className="text-sm">
          <InputField
            label="Title"
            classname=""
            value={newBoard.title}
            type="text"
            isLoading={false}
            onChange={(e) =>
              setNewBoard((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="text-sm mb-5 ">
          <TextareaField
            label="Description"
            classname=""
            value={newBoard.description}
            isLoading={false}
            onChange={(e) =>
              setNewBoard((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-full flex flex-col gap-3 -mt-1">
          <div className="text-sm flex gap-3 items-center">
            <div className="text-sm">Collaborators::</div>
            {newBoard.users?.map((user, index) => (
              <div
                className="border-2 px-2  py-1 rounded-full bg-gray-200 text-sm"
                key={index}
              >
                <div className="flex w-full gap-2 items-center">
                  <div>{user?.username}</div>
                  <span>
                    <AiOutlineClose className="cursor-pointer" />
                  </span>
                </div>
              </div>
            ))}
            <div className="relative">
              <FaPlus onClick={setOpenList} />
              {openList && (
                <UserSearch
                  valueArray={newBoard.users}
                  isOpen={openList}
                  onCloseFn={setOpenList}
                  addUserFn={handleAddUsertoBoard}
                  removeUserFn={handleRemoveUserFromBoard}
                />
              )}
            </div>
          </div>

          <div className="text-sm flex gap-3">
            <div ref={ref} className="text-sm flex items-center gap-2">
              <span>Due : </span>
              <span>{newBoard?.dueDate.toDateString()}</span>
              <span>
                <BsCalendarCheck onClick={setOpenCalender} size={14} />
              </span>
              <span className="relative">
                {openCalender && (
                  <Calender
                    value={newBoard.dueDate}
                    onSubmit={handleSetDueDate}
                    setOpenCalender={setOpenCalender}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="text-sm flex flex-end gap-3 w-full mr-10  mt-3">
          <Button
            icon={<FaCheck size={12} />}
            size="md"
            isLoading={createBoardMutations.isLoading}
            text="Save"
            onClick={handleCreateBoard}
            variant="primary"
            classname="h-10 rounded-full"
          />
          <Button
            icon={<FaTrash size={12} />}
            size="md"
            isLoading={createBoardMutations.isLoading}
            text="Cancel"
            onClick={onClose}
            variant="secondary"
            classname="h-10 rounded-full"
          />
        </div>
      </form>
    </div>
  );
}

export default NewBoard;
