import { useEffect, useState } from "react";
import { BsCheck, BsEraser, BsExclamationCircle, BsInfo } from "react-icons/bs";
import { useSelector } from "react-redux";

import NotificationItem from "./NotificationItem";

const icons = {
  info: <BsInfo className="h-6 w-6 text-blue-500" aria-hidden="true" />,
  success: <BsCheck className="h-6 w-6 text-green-500" aria-hidden="true" />,
  warning: (
    <BsExclamationCircle
      className="h-6 w-6 text-yellow-500"
      aria-hidden="true"
    />
  ),
  error: <BsEraser className="h-6 w-6 text-red-500" aria-hidden="true" />,
};

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
  onClose: (id: string) => void;
};

const Notifications = () => {
  const notifications = useSelector((state: any) => state.notifications);
  const [notState, setNotState] = useState(notifications);

  useEffect(() => {
    setNotState(notifications.notifications);
  }, [notifications]);

  if (!notState.length) return null;

  return (
    <div className="absolute right-0 top-3">
      {notState.length &&
        notState?.map((item: any) => (
          <div className="flex flex-col transition-all gap-3">
            <NotificationItem
              id={item.id}
              title={item.title}
              type={item.type}
              message={item.message}
            />
          </div>
        ))}
    </div>
  );
};

export default Notifications;
