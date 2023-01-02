import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { useUpdateMessageAsRead } from "../../features/message/api/updateMessageAsRead";
import { Message } from "../../types";
type MessageItemProps = {
  messageItem: Message;
  userId: string;
};
function MessageBody({ messageItem, userId }: MessageItemProps) {
  const updateMessageReadMutation = useUpdateMessageAsRead({ userId });
  const messageId = messageItem.id;

  useEffect(() => {
    updateMessageReadMutation.mutateAsync({ messageId });
  }, [messageId]);
  return (
    <section
      className="w-6/12 flex flex-col bg-white rounded-r-lg p-5 "
      style={{ width: "600px" }}
    >
      <div className="flex justify-between items-center h-24 border-b-2 mb-8 ">
        <div className="flex space-x-4 items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              src="https://bit.ly/2KfKgdy"
              className="h-full w-full object-cover"
              alt="sad"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">
              {messageItem.sender
                ? messageItem.sender.username
                : messageItem.receivers[0].user.username}
            </h3>
          </div>
        </div>
        <div>
          <ul className="flex text-gray-400 space-x-4">
            <li className="w-6 h-6">
              <FaArrowLeft />
            </li>
            <li className="w-6 h-6">
              <FaArrowRight />
            </li>

            <li className="w-6 h-6">
              <FaTrash />
            </li>
          </ul>
        </div>
      </div>
      <section>
        <h1 className="font-bold text-2xl"> {messageItem.subject}</h1>
        <article className="mt-8 text-gray-500 leading-7 tracking-wider">
          {messageItem.body}
        </article>
      </section>
    </section>
  );
}

export default MessageBody;
