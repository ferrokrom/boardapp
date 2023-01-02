import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDeleteNotification } from "../../features/notification/deleteNotification";
import { useGetUserNotifications } from "../../features/notification/getUserNotifications";
import { useGetUserNotificationsMarkedAsRead } from "../../features/notification/notificationMarkAsRead";
import useOutsideClick from "../../hooks/useOutsideClick";

type NotificationProps = {
  openNotifications: boolean;
  setOpenNotifications: () => void;
  classnames: string;
  userId: string;
};

function Notifications({
  openNotifications,
  classnames,
  setOpenNotifications,
  userId,
}: NotificationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetUserNotifications({ userId });
  const markedAsReadMutation = useGetUserNotificationsMarkedAsRead({ userId });

  const [allNotifications, setNotifications] = useState(data?.data.data);
  const deletedNotifications = useDeleteNotification({ userId });

  useEffect(() => {
    if (data) {
      setNotifications(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    markedAsReadMutation.mutateAsync({ userId });
  }, []);

  useOutsideClick(ref, setOpenNotifications);
  if (!allNotifications?.length) return null;

  return (
    <div
      className={`flex flex-col absolute bg-slate-100 text-gray-800 border  rounded-lg p-4 z-10 ${classnames} `}
      ref={ref}
      style={{ width: "400px", maxHeight: "600px" }}
    >
      <div className="text-lg mb-3">Notifications</div>
      <div
        className="flex gap-2 flex-col overflow-auto h-full"
        style={{ maxHeight: "600px" }}
      >
        {!isLoading &&
          allNotifications.map((note) => (
            <div className="flex w-full  rounded-lg border p-3 items-center justify-between">
              <div>{note.message}</div>
              <div>
                <MdClose
                  className="cursor-pointer"
                  onClick={() => {
                    const notificationId = note.id;
                    deletedNotifications.mutateAsync({ notificationId });
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Notifications;
