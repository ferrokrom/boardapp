import React, { FormEvent, useEffect, useState } from "react";
import { FaCheck, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import useAuth from "../../Auth/useAuth";
import { useCreateMessage } from "../../features/message/api/createMessage";
import useToggle from "../../hooks/useToggle";
import { User } from "../../types";
import Button from "../Elements/Button";
import InputField from "../Elements/InputField";
import TextareaField from "../Elements/TextareaField";
import UserSearch from "../Elements/UserSearch";

function NewMessage({ setNewMessage }: { setNewMessage: () => void }) {
  const { user } = useAuth();

  const [receiver, setReceiver] = useState<User[]>([]);
  const [openUsers, setOpenUsers] = useToggle();
  const [userId, setUser] = useState("");

  const [newMessageForm, setNewMessageForm] = useState({
    subject: "",
    body: "",
  });
  useEffect(() => {
    if (user) {
      setUser(user.id);
    }
  }, [user]);

  const newMessageMutation = useCreateMessage({ userId });

  function handleUserAdd(e: User) {
    var user2 = receiver.find((item) => item.id === e.id);
    if (!user2) {
      setReceiver((prev) => [...prev, e]);
    }
  }
  function handleRemoverUser(e: User) {
    setReceiver((prev) => prev.filter((item) => item.id !== e.id));
  }

  function handleMessageForm(e: FormEvent) {
    e.preventDefault();
    const userIds = receiver.map((item) => item.id);
    const data = {
      userId: userId,
      body: {
        receiver: [...userIds],
        subject: newMessageForm.subject,
        body: newMessageForm.body,
      },
    };
    newMessageMutation.mutateAsync({ data });
  }

  return (
    <div className="flex flex-col p-5 w-1/2" style={{ width: "600px" }}>
      <div className="text-bold text-md text-slate-900 flex gap-3 items-center">
        To:
        {receiver?.map((item, index) => (
          <div
            key={index}
            className="py-1 px-2 bg-blue-100 rounded-lg flex gap-2 items-center"
          >
            {item.username}
            <MdClose onClick={() => handleRemoverUser(item)} />
          </div>
        ))}
        <FaUser onClick={setOpenUsers} className="" />
        <div className="relative">
          {openUsers && (
            <UserSearch
              isOpen={openUsers}
              onCloseFn={setOpenUsers}
              valueArray={receiver}
              addUserFn={handleUserAdd}
              removeUserFn={handleRemoverUser}
            />
          )}
        </div>
      </div>
      <section className="mt-6  rounded-xl bg-gray-50 ">
        <form onSubmit={handleMessageForm}>
          <InputField
            type="text"
            isLoading={false}
            classname=""
            label="Subject"
            onChange={(e) =>
              setNewMessageForm((prev) => ({
                ...prev,
                subject: e.target.value,
              }))
            }
          />
          <div className="mt-3"></div>
          <TextareaField
            classname="w-full bg-gray-50 p-2 rounded-xl "
            placeholder="Type your message here..."
            label="Message"
            value={newMessageForm.body}
            onChange={(e) =>
              setNewMessageForm((prev) => ({ ...prev, body: e.target.value }))
            }
          />
          <div className="flex items-center justify-between p-2">
            <button className="h-6 w-6 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <div className="flex gap-3">
              <Button
                size="md"
                text="Cancel"
                onClick={setNewMessage}
                variant="secondary"
                classname="h-10 rounded-full"
              />
              <Button
                icon={<FaCheck size={12} />}
                size="md"
                isLoading={newMessageMutation.isLoading}
                text="Send"
                variant="primary"
                classname="h-10 rounded-full"
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewMessage;
