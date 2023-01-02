import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useCreateSection } from "../../features/section/api/createSection";
import { useSections } from "../../features/section/api/getSections";
import { Board } from "../../types";
import Button from "../Elements/Button";
import ListSection from "./ListSections";
type ListviewProps = {
  board: Board;
};

function Listview({ board }: ListviewProps) {
  const [boardId, setBoardId] = useState("");
  const sectionQuery = useSections({ boardId });
  let sections = sectionQuery.data?.data.data;
  const createSectionQuery = useCreateSection({ boardId });

  useEffect(() => {
    if (board) {
      setBoardId(board.id);
    }
  }, [board]);

  if (!board) {
    return <div>You have no boards Yet</div>;
  }
  if (!sections) {
    return <div>You have no Sections in this board</div>;
  }

  return (
    <div className="p-5 overflow-y-auto  h-screen flex- flex-col">
      <div className="flex gap-1 w-full  mb-3">
        <div style={{ width: "40%", display: "flex" }}></div>
        <div style={{ width: "20%" }}>DUE DATE</div>
        <div style={{ width: "20%" }}>PRIORITY</div>
        <div style={{ width: "20%" }}>ASSIGNEES</div>
      </div>
      {sections.map((section, index) => (
        <ListSection section={section} key={index} boardId={boardId} />
      ))}
      <div className="flex w-1/6 gap-1 flex-col mb-4">
        <Button
          icon={<FaPlus size={12} />}
          onClick={async () =>
            await createSectionQuery.mutateAsync({ boardId })
          }
          size="xsm"
          isLoading={createSectionQuery.isLoading}
          text="New Section"
          variant="primary"
          classname="h-10 rounded-full"
        />
      </div>
    </div>
  );
}

export default Listview;
