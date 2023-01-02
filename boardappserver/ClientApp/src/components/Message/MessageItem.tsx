import React from "react";
import { Message } from "../../types";
type MessageItemProps = {
  messageItem: Message;
  selection: string;
  setSelectedMessage: (e: Message) => void;
};
function MessageItem({
  messageItem,
  selection,
  setSelectedMessage,
}: MessageItemProps) {
  return (
    <li
      className={`py-3 border-b border-red-200 px-3 transition hover:bg-indigo-100 cursor-pointer ${
        messageItem?.receivers[0]?.isRead ? "font-thin" : "font-bold"
      }`}
      onClick={() => setSelectedMessage(messageItem)}
    >
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold">
          {selection === "inbox"
            ? messageItem?.sender?.username
            : messageItem?.receivers.map((rec) => rec.user?.username)}
        </h3>
        <div>
          <p className="text-sm text-gray-400">23m ago</p>
        </div>
      </div>

      <div className="text-sm  text-gray-400">{messageItem.subject}</div>
    </li>
  );
}

export default MessageItem;
