import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../Auth/useAuth";
import useOutsideClick from "../../hooks/useOutsideClick";
import useToggle from "../../hooks/useToggle";
import { Message } from "../../types";
import MessageBody from "./MessageBody";
import MessageBoxNavigation from "./MessageBoxNavigation";
import MessageItem from "./MessageItem";
import NewMessage from "./NewMessage";

type MessageBoxProps = {
  allReceivedMessages?: Message[];
  allSentMessages?: Message[];
  isOpen: boolean;
  setOpenMessages: () => void;
};

function MessageBox({
  allReceivedMessages,
  isOpen,

  setOpenMessages,
  allSentMessages,
}: MessageBoxProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message>();

  const ref = useRef<HTMLDivElement>(null);

  const [allMessages, setAllMessages] = useState<Message[]>();

  const [newMessage, setNewMessage] = useToggle();

  const [selection, setSelection] = useState("inbox");
  const { user } = useAuth();

  const [userId, setUser] = useState("");

  useEffect(() => {
    if (user) {
      setUser(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (allReceivedMessages && selection === "inbox") {
      setAllMessages(allReceivedMessages);
    }
  }, [allReceivedMessages, selection]);

  useEffect(() => {
    if (allSentMessages && selection === "sent") {
      setAllMessages(allSentMessages);
    }
  }, [allSentMessages, selection]);
  console.log("as", allSentMessages);

  useOutsideClick(ref, setOpenMessages);

  if (!isOpen) return null;
  return (
    <div
      className="flex flex-col absolute left-64 bg-slate-100 border-2 text-gray-800 z-10  rounded-lg p-5 overflow-hidden"
      ref={ref}
      style={{ height: "700px" }}
    >
      <div className="flex w-full gap-5 text-2xl mb-3 items-center">
        Messages{" "}
        <div
          className="flex items-center gap-2 p-3 text-sm hover:bg-blue-100 rounded-lg cursor-pointer"
          onClick={setNewMessage}
        >
          <FaPlus />
          New Message
        </div>
      </div>

      <main className="flex w-full h-full  rounded-3xl z-10">
        <section
          className="flex flex-col pt-3 bg-gray-50 border-l-lg h-full overflow-y-scroll"
          style={{ width: "600px" }}
        >
          <MessageBoxNavigation
            setSelection={setSelection}
            setNewMessage={setNewMessage}
          />
          <ul className="mt-6">
            {!allMessages?.length ? (
              <div>You have No Messages</div>
            ) : (
              allMessages
                .map((messageItem) => (
                  <MessageItem
                    messageItem={messageItem}
                    setSelectedMessage={setSelectedMessage}
                    selection={selection}
                  />
                ))
                .reverse()
            )}
          </ul>
        </section>

        {selectedMessage && !newMessage && (
          <MessageBody messageItem={selectedMessage} userId={userId} />
        )}
        {newMessage && <NewMessage setNewMessage={setNewMessage} />}
      </main>
    </div>
  );
}

export default MessageBox;
