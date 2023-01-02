import React, { FormEvent,  useRef } from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Section } from "../../types";
import useToggle from "../../hooks/useToggle";
import InputField from "../Elements/InputField";
import { useUpdateSection } from "../../features/section/api/updateSection";

import HeaderDropdown from "../Section/HeaderDropdown";

type HeaderProps = {
  section: Section;
  setNewTodo: () => void;
  boardId: string;
};

function ListSectionHeader({ section, setNewTodo, boardId }: HeaderProps) {
  const iRef = useRef<HTMLInputElement>(null);
  const [openDropdown, setOpenDropdown] = useToggle();
  const [state, setstate] = useState(section);
  const updateSectionMutation = useUpdateSection({ boardId });

  function onSectionHandle(e: FormEvent) {
    e.preventDefault();
    const data = {
      sectionId: section.id,
      body: {
        title: state.title,
        dueDate: state.duedate,
        color: state.color,
        description: state.description,
      },
    };
    updateSectionMutation.mutateAsync({ data });

    iRef?.current?.blur();
  }
  return (
    <div className="flex justify-between flex-col border-b-2">
      <div className="flex flex-start p-2 gap-3 items-center bg-gray-300 -mb-1">
        <form onSubmit={onSectionHandle} className="flex">
          <InputField
            name="title"
            ref={iRef}
            onClick={() => {
              iRef.current?.focus();
            }}
            isLoading={false}
            onChange={(e) =>
              setstate((prev) => ({ ...prev, title: e.target.value }))
            }
            label=""
            classname="w-full"
            value={state.title}
            type="text"
          />
        </form>
        <div className="flex items-center relative">
          <FaPlus
            size={16}
            onClick={setNewTodo}
            className="hover:text-green-600 cursor-pointer"
          />
          <div>
            <BsThreeDotsVertical
              size={16}
              onClick={setOpenDropdown}
              className="hover:text-red-600 cursor-pointer"
            />
            {openDropdown && (
              <HeaderDropdown
                section={section}
                setOpenDropdown={setOpenDropdown}
                boardId={boardId}
                setState={setstate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSectionHeader;
