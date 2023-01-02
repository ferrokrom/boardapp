import React, { useRef } from "react";
import { FiUsers } from "react-icons/fi";
import useToggle from "../../hooks/useToggle";
import { Todo } from "../../types";
import TodoUserSearch from "./TodoUserSearch";

type TodoAssignListProps = {
  todoItem: Todo;
  sectionId: string;
};

function TodoAssignList({
  todoItem,
  sectionId,
}: //removeFromList,
// removeUserFromTodoUserList,
TodoAssignListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useToggle();

  return (
    <div ref={ref} className="flex relative">
      <div onClick={setIsUserMenuOpen}>
        {todoItem.todoUsers.length < 1 ? (
          <FiUsers className="cursor-pointer" />
        ) : (
          <div className="flex">
            {todoItem.todoUsers.map((users, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_BASEURL}/${users.user.avatar}`}
                className="rounded-full w-5 h-5 border border-gray-700 z-1 "
                alt="User Avatar"
              />
            ))}
          </div>
        )}
      </div>
      {isUserMenuOpen && (
        <TodoUserSearch
          todoItem={todoItem}
          isOpen={isUserMenuOpen}
          sectionId={sectionId}
          setIsUserMenuOpen={setIsUserMenuOpen}
        />
      )}
    </div>
  );
}

export default TodoAssignList;
