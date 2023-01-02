import React, { useEffect, useState } from "react";

import { AiFillMail, AiFillBell, AiFillGold } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { Board } from "../../types";
import Logo from "./Logo";
import useToggle from "../../hooks/useToggle";
import { useGetUserNotifications } from "../../features/notification/getUserNotifications";
import Notifications from "../User/Notifications";
import MessageBox from "../Message/MessageBox";
import { useGetReceivedMessages } from "../../features/message/api/getMessages";
import { useGetSentMessages } from "../../features/message/api/getSentMessages";

const Sidebar = ({ boards, userId }: { userId: string; boards: Board[] }) => {
  const [toggled, setToggle] = useToggle();
  const [openNotifications, setOpenNotifications] = useToggle();
  const [openMessage, setOpenMessages] = useToggle();

  const { data } = useGetUserNotifications({ userId });
  const [allNotifications, setAllNotifications] = useState(data?.data.data);

  const receivedMessages = useGetReceivedMessages({ userId });
  const sentMessages = useGetSentMessages({ userId });

  const [allReceivedMessages, setAllReceivedMessages] = useState(
    receivedMessages.data?.data.data
  );
  const [unreadMessages, setUnreadMessages] = useState(
    receivedMessages.data?.data.data.filter((message) =>
      message.receivers.some((rec) => rec.isRead !== true)
    ).length
  );
  console.log("rec", receivedMessages);
  useEffect(() => {
    setAllReceivedMessages(receivedMessages.data?.data.data);
    setUnreadMessages(
      receivedMessages.data?.data.data.filter((message) =>
        message.receivers.some((rec) => rec.isRead !== true)
      ).length
    );
  }, [receivedMessages]);

  const [allSentMessages, setAllSentMessages] = useState(
    sentMessages.data?.data.data
  );

  useEffect(() => {
    setAllSentMessages(sentMessages.data?.data.data);
  }, [sentMessages]);

  useEffect(() => {
    if (data) {
      setAllNotifications(data.data.data);
    }
  }, [data]);

  const footerItems = [
    { text: "Setting", icon: <AiFillMail size={20} /> },
    { text: "Logout", icon: <AiFillGold size={20} /> },
  ];
  return (
    <aside
      className="w-1/6  bg-gray-50  dark:bg-gray-800 "
      aria-label="Sidebar"
    >
      <Logo />
      <div className=" py-4 px-3  flex flex-col justify-between h-full border-t-[1px] border-slate-600">
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              className="flex items-center p-2 w-full font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={setToggle}
            >
              <AiFillGold size={20} />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Boards
              </span>
              <MdOutlineKeyboardArrowDown />
            </button>
            <ul
              id="dropdown-example"
              className={`${
                !toggled ? "hidden" : "block"
              } transition duration-75 ease-out py-2 space-y-2`}
            >
              {boards.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`boardview/${item.id}`}
                    className="flex items-center p-2 pl-11 w-full  font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="relative" onClick={setOpenMessages}>
            <Link
              to="#"
              className="flex items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillMail size={22} />
              <span className="flex-1 ml-3 whitespace-nowrap">Inbox </span>
              <span className="inline-flex justify-center items-center w-6 h-6 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-yellow-700 dark:text-gray-300 relative">
                {unreadMessages}
              </span>
            </Link>
          </li>
          <span className="relative">
            {openMessage && (
              <MessageBox
                allReceivedMessages={allReceivedMessages}
                allSentMessages={allSentMessages}
                isOpen={openMessage}
                setOpenMessages={setOpenMessages}
              />
            )}
          </span>

          <li className="relative">
            <Link
              to="taskview"
              className="flex items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillGold size={22} />
              <span className="flex-1 ml-3 whitespace-nowrap">My Tasks </span>
            </Link>
          </li>
          <li className="relative" onClick={setOpenNotifications}>
            <Link
              to="#"
              className="flex items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillBell size={22} />
              <span className="flex-1 ml-3 whitespace-nowrap ">
                Notifications{" "}
              </span>
              <span className="inline-flex justify-center items-center w-6 h-6 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-blue-700 dark:text-gray-300 relative">
                {allNotifications?.length}
                {openNotifications && (
                  <Notifications
                    openNotifications={openNotifications}
                    userId={userId}
                    classnames="left-10 top-0"
                    setOpenNotifications={setOpenNotifications}
                  />
                )}
              </span>
            </Link>
          </li>
          <span className="relative"></span>
        </ul>
        <ul className=" mb-12 space-y-2">
          {footerItems.map((item, index) => (
            <li key={index}>
              <Link
                to="/"
                className="flex items-center p-2 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
