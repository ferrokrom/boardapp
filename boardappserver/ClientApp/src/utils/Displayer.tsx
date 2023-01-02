import { format } from "date-fns";
import React from "react";
import { FiUsers } from "react-icons/fi";

function Displayer({ imgSrc }: { imgSrc: string | undefined }) {
  return (
    <div>
      {!imgSrc ? (
        <FiUsers className="cursor-pointer" />
      ) : (
        <div className="flex">
          <img
            src={`${process.env.REACT_APP_BASEURL}/${imgSrc}`}
            className="rounded-full w-5 h-5 border border-gray-700 z-1"
            alt="User Avatar"
          />
        </div>
      )}
    </div>
  );
}

export default Displayer;
