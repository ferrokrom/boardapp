import { useEffect, useState } from "react";
import { BsCheck, BsExclamationCircle, BsInfo, BsX } from "react-icons/bs";
import useToggle from "../../../hooks/useToggle";

const styles = {
  info: " bg-blue-100  border-blue-500 ",
  success: " bg-teal-100  border-teal-500 ",
  warning: "bg-yellow-100  border-yellow-500",
  error: " bg-red-100  border-red-500",
};
const icons = {
  info: <BsInfo size={20} />,
  success: <BsCheck size={20} />,
  warning: <BsExclamationCircle size={20} />,
  error: <BsX size={20} />,
};

export type NotificationProps = {
  id: string;
  type: keyof typeof icons;
  title: string;
  message?: string;
};
const NotificationItem = ({ id, title, type, message }: NotificationProps) => {
  const [open, setOpen] = useToggle();

  useEffect(() => {
    setOpen();
    setTimeout(() => {
      setOpen();
    }, 5000);
  }, []);

  if (!open) return null;
  return (
    <div
      className={` border-l-4 ${styles[type]} w-64 right-0  mb-3 transition transtion-all in-ease-out rounded-b text-slate-900 py-5  shadow-md`}
      role="alert"
    >
      <div className="">
        <div className="flex gap-2 ml-2 items-center">
          {icons[type]}
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message} </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
