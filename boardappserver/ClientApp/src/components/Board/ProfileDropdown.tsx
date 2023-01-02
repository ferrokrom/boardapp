import React, { useRef } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import useAuth from "../../Auth/useAuth";
import useToggle from "../../hooks/useToggle";
import Modal from "../Modal";
import Profile from "../User/Profile";

type ProfileDropDownProps = {
  onClose: () => void;
  userId: string;
};
function ProfileDropDown({ onClose, userId }: ProfileDropDownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [openProfileModal, setOpenProfileModal] = useToggle();
  const { logout } = useAuth();

  return (
    <div
      className="flex flex-col flex-start w-40 gap-2 absolute bg-slate-100 z-60 p-3 top-14 right-3 border-2 rounded-lg crounded-lg animate-fadeIn "
      ref={ref}
    >
      <div
        className="text-black flex flex-start gap-2 items-center text-sm cursor-pointer"
        onClick={setOpenProfileModal}
      >
        <FiUser />
        <div>Profile</div>
      </div>

      <div
        className="text-black flex flex-start gap-2 items-center text-sm cursor-pointer"
        onClick={logout}
      >
        <FiLogOut />
        <div>Logout</div>
      </div>
      {
        <Modal open={openProfileModal} onClose={setOpenProfileModal}>
          <Profile userId={userId} />
        </Modal>
      }
    </div>
  );
}

export default ProfileDropDown;
