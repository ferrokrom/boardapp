import React, { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Section } from "../../types";
import { useDeleteSection } from "../../features/section/api/deleteSection";
import { previousDay } from "date-fns";
import useOutsideClick from "../../hooks/useOutsideClick";

export const SectionColors = {
  BLUE: { color: "#023E8A", subColor: "#90E0EF" },
  RED: { color: "#D90429", subColor: "#FFB6BF" },
  GREEN: { color: "#FFB6BF", subColor: "#CCE3DE" },
  YELLOW: { color: "#FFFF4B", subColor: "#FFFF4B" },
  ORANGE: { color: "#F77F00", subColor: "#ffd7ba" },
  BROWN: { color: "#7f5539", subColor: "e6ccb2" },
};

type HeaderDropdownProps = {
  section: Section;
  setState: (e: any) => void;
  setOpenDropdown: () => void;
  boardId: string;
};

const HeaderDropdown = ({
  section,
  setState,

  boardId,
  setOpenDropdown,
}: HeaderDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const sectionId = section.id;
  const deleteSectionMutations = useDeleteSection({ boardId });
  useOutsideClick(ref, setOpenDropdown);

  return (
    <div
      className="w-52 rounded-md bg-white gap-3 shadow-md absolute left-9 top-3 border h-fit flex flex-col items-baseline z-10"
      ref={ref}
    >
      <div className="flex  items-center p-3  w-full">Section Color</div>
      <div className="flex gap-2 px-3  w-full justify-around">
        {section.id !== null &&
          Object.values(SectionColors).map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() =>
                setState((prev: any) => ({ ...prev, color: item.color }))
              }
              style={{
                width: "20px",
                height: "20px",
                background: `${item.color}`,
              }}
            ></div>
          ))}
      </div>
      <div
        className="flex gap-2 items-center p-3 border-b-2 w-full cursor-pointer overflow-hidden hover:bg-red-100  rounded-t-lg"
        onClick={async () =>
          await deleteSectionMutations.mutateAsync({ sectionId })
        }
      >
        <FaTrash />
        Delete Section
      </div>
    </div>
  );
};

export default HeaderDropdown;
