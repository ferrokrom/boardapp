import React from "react";
import InputField from "../Elements/InputField";

function MessageBoxNavigation({
  setSelection,
  setNewMessage,
}: {
  setSelection: (e: string) => void;
  setNewMessage: () => void;
}) {
  return (
    <div className="flex w-full gap-5 items-center">
      <div
        className="cursor-pointer"
        onClick={() => {
          setSelection("inbox");
        }}
      >
        Inbox
      </div>
      <div>|</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          setSelection("sent");
        }}
      >
        Sent
      </div>
      <div>|</div>

      <div>
        <InputField
          label=""
          placeholder="Search..."
          classname="-mt-0 bg-transparent shadow-none "
          value=""
          type="text"
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default MessageBoxNavigation;
