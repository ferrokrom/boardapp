import React, { useEffect, useState } from "react";
import Section from "../Section";
import { FaPlus } from "react-icons/fa";
import { useSections } from "../../features/section/api/getSections";
import { Board } from "../../types";
import Button from "../Elements/Button";
import useToggle from "../../hooks/useToggle";
import { useCreateSection } from "../../features/section/api/createSection";
import { useParams } from "react-router-dom";

const Boardview = ({ board }: { board?: Board }) => {
  const [boardId, setBoardId] = useState("");
  const { id } = useParams();
  const sectionQuery = useSections({ boardId });
  let sections = sectionQuery.data?.data;
  const createSectionQuery = useCreateSection({ boardId });
  console.log(id);
  useEffect(() => {
    if (board) {
      setBoardId(board.id);
    } else if (id) {
      setBoardId(id);
    }
  }, [board, id]);
  useEffect(() => {
    if (id) {
      setBoardId(id);
    }
  }, [id]);

  if (!board && !id) {
    return <div>You have no boards Yet</div>;
  }
  if (!sections?.data.length) {
    return (
      <div className="p-5 flex overflow-y-auto flex-col w-1/4">
        You have no Sections in this board
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
    );
  }

  return (
    <div className=" p-5 flex overflow-y-auto h-screen">
      {!sectionQuery.isLoading &&
        sectionQuery.data?.data.data.map((section, index) => (
          <Section key={index} section={section} boardId={boardId} />
        ))}

      <Button
        icon={<FaPlus size={12} />}
        onClick={async () => await createSectionQuery.mutateAsync({ boardId })}
        size="xsm"
        isLoading={createSectionQuery.isLoading}
        text="New Section"
        variant="primary"
        classname="h-10 rounded-full"
      />
    </div>
  );
};

export default Boardview;
