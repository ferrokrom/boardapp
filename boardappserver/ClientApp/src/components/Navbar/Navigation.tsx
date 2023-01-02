import { ReactNode } from "react";
import {
  BsClipboardData,
  BsClipboardCheck,
  BsCalendarCheck,
} from "react-icons/bs";
import { Link } from "react-router-dom";

interface viewList {
  name: string;
  link: string;
  icon: ReactNode;
}

const Navigation = ({ boardId }: { boardId: string }) => {
  const views: viewList[] = [
    {
      icon: <BsClipboardData size={16} />,
      link: `/boardview`,
      name: "Board",
    },
    {
      icon: <BsClipboardCheck size={16} />,
      link: `/listview`,
      name: "List",
    },
    {
      icon: <BsCalendarCheck size={16} />,
      link: `/calenderview`,
      name: "Calendar",
    },
  ];

  return (
    <div className="flex justify-start">
      {views.map((view, index) => (
        <div
          key={index}
          className="flex h-full gap-2 ml-20 px-1 py-1 items-center"
        >
          {view.icon}{" "}
          <span className="ml-1  text-gray-600 font-bold hover:text-gray-800">
            <Link to={view.link}>{view.name}</Link>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
