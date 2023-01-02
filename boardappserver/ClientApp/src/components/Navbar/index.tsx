import React, { useEffect, useState } from "react";
import { FaPlus, FaBell, FaAngleDown } from "react-icons/fa";

import Navigation from "./Navigation";
import { Board, User } from "../../types";
import Button from "../Elements/Button";
import useToggle from "../../hooks/useToggle";
import Modal from "../Modal";
import NewBoard from "../Board/NewBoard";
import ProfileDropDown from "../Board/ProfileDropdown";
import UpdateBoard from "../Board/UpdateBoard";
import Notifications from "../User/Notifications";
import { useGetUserNotifications } from "../../features/notification/getUserNotifications";

const Header = ({ board, user }: { board?: Board; user: User }) => {
  const [openDropdown, setOpenDropdown] = useToggle();
  const [openBoardUpdate, setOpenBoardUpdate] = useToggle();
  const [openModal, setModalOpen] = useToggle();
  const [openNotifications, setOpenModifications] = useToggle();

  const userId = user.id;

  const { data, isLoading } = useGetUserNotifications({ userId });
  const [allNotifications, setAllNotifications] = useState(data?.data.data);

  useEffect(() => {
    setAllNotifications(data?.data.data);
  }, [data]);

  return (
    <div
      className="flex w-full border-sky-500  justify-between items-baseline  "
      style={{ borderBottom: "1px solid gray" }}
    >
      <div className="flex gap-2 items-center px-2 py-2">
        <div className="text-lg">
          {board?.title ? board.title.toLocaleUpperCase() : `Create New Board`}
        </div>
        {board && <FaAngleDown onClick={setOpenBoardUpdate} />}
        {board && <Navigation boardId={board.id} />}
      </div>
      <div className="flex justify-between items-center gap-3 px-2 py-2 relative">
        <div className="relative">
          <Button
            size="sm"
            icon={<FaBell />}
            isLoading={false}
            variant="primary"
            classname="relative"
            type="submit"
            onClick={setOpenModifications}
          />

          <div
            className="absolute -top-1 -right-1 rounded-full bg-red-700 w-4 h-4 p-1 flex text-slate-100 justify-center items-center text-sm"
            style={{ fontSize: "11px" }}
          >
            {allNotifications?.length}
          </div>

          <div className="relative">
            {!isLoading && openNotifications && (
              <Notifications
                openNotifications={openNotifications}
                userId={userId}
                classnames=" -right-4 top-4 "
                setOpenNotifications={setOpenModifications}
              />
            )}
          </div>
        </div>
        <Button
          size="sm"
          icon={<FaPlus />}
          isLoading={false}
          variant="primary"
          onClick={setModalOpen}
          classname="relative"
        />

        <Button
          size="sm"
          isLoading={false}
          variant="primary"
          text="FO"
          classname="relative"
          onClick={setOpenDropdown}
        />
        {openDropdown && (
          <ProfileDropDown userId={user.id} onClose={setOpenDropdown} />
        )}
        {openModal && (
          <Modal open={openModal} onClose={setModalOpen}>
            <NewBoard userId={user.id} onClose={setModalOpen}></NewBoard>
          </Modal>
        )}
        {openBoardUpdate && board && (
          <Modal open={openBoardUpdate} onClose={setOpenBoardUpdate}>
            <UpdateBoard
              userId={user.id}
              board={board}
              onClose={setOpenBoardUpdate}
            ></UpdateBoard>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Header;
