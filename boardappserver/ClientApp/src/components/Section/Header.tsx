import React, { FormEvent, useEffect, useRef } from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { Section } from "../../types";
import Button from "../Elements/Button";
import useToggle from "../../hooks/useToggle";
import HeaderDropdown from "./HeaderDropdown";
import InputField from "../Elements/InputField";
import { useUpdateSection } from "../../features/section/api/updateSection";
import { previousDay } from "date-fns";
import useOutsideClick from "../../hooks/useOutsideClick";

type HeaderProps = {
  section: Section;
  setNewTodo: () => void;
  boardId: string;
};

function Header({ section, setNewTodo, boardId }: HeaderProps) {
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
      <div
        className={`h-1  rounded-t-lg`}
        style={{ backgroundColor: state.color }}
      ></div>
      <div className="flex justify-between px-2 py-2 gap-1 items-center">
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

export default Header;
