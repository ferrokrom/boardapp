import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../../Auth/useAuth";
import { useUpdateUser } from "../../features/user/api/updateUser";
import Button from "../Elements/Button";
import InputField from "../Elements/InputField";

type UserProfileProps = {
  username: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  avatar: File | undefined;
  password: string | undefined;
};

function Profile({ userId }: { userId: string }) {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateUser();
  console.log(updateProfileMutation.isLoading);
  const [userState, setUserState] = useState<UserProfileProps>({
    username: user?.username,
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    avatar: user?.avatar as File | undefined,
    password: "",
  });
  console.log(user);
  useEffect(() => {
    setUserState({
      username: user?.username,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      avatar: user?.avatar as File | undefined,
      password: "",
    });
  }, [user]);
  if (!user) return <div>User not found</div>;
  function onFormSubmit(e: FormEvent) {
    e.preventDefault();

    const data = { userId: userId, body: userState };
    updateProfileMutation.mutateAsync({ data });
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setUserState((prev) => ({ ...prev, avatar: files[0] }));
    }
  }

  return (
    <div className="flex flex-col text-sm w-full bg-slate-100 animate-fadeIn ">
      <form onSubmit={onFormSubmit}>
        <div className="flex justify-between">
          <h1 className="text-lg">My Profile</h1>
        </div>
        <div className="flex flex-col mt-5 mb-5  flex-start">
          <div className="mb-4 ">Your Photo</div>
          <div className="flex gap-5 flex-start items-center">
            {user.avatar ? (
              <img
                className="w-20 rounded-full h-20"
                src={`${process.env.REACT_APP_BASEURL}/${user.avatar}`}
                alt=""
              />
            ) : (
              <FaUser />
            )}

            <div className="flex items-center justify-center w-32">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h- border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-3 w-1/3">
          <div className="flex-1 flex-col flex-start">
            <InputField
              label="Username"
              type="text"
              classname=""
              value={userState.username}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, firstname: e.target.value }))
              }
              isLoading={false}
            />
          </div>
        </div>
        <div className="flex justify-between mb-3 gap-5">
          <div className="flex-1 flex-col flex-start gap-2">
            <InputField
              label="Your Firstname"
              type="text"
              classname=""
              value={userState.firstname}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, firstname: e.target.value }))
              }
              isLoading={false}
            />
          </div>
          <div className="flex-1 flex-col flex-start gap-2">
            <InputField
              label="Your Lastname"
              type="text"
              classname=""
              value={userState.lastname}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, lastname: e.target.value }))
              }
              isLoading={false}
            />
          </div>
        </div>
        <div className="flex justify-between mb-3 gap-5">
          <div className="flex-1 w-1/3 flex-col flex-start gap-2">
            <InputField
              label="Password"
              type="password"
              classname=""
              value={userState.password}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, password: e.target.value }))
              }
              isLoading={false}
            />
          </div>
          <div className="flex-1 w-1/3 flex-col flex-start gap-2">
            <InputField
              label="Email"
              type="text"
              classname=""
              value={userState.email}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, email: e.target.value }))
              }
              isLoading={false}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            size="md"
            isLoading={false}
            variant="primary"
            type="submit"
            text="Save"
            classname="relative"
          />
          <Button
            size="md"
            isLoading={updateProfileMutation.isLoading}
            variant="secondary"
            type="submit"
            text="Cancel"
            classname="relative"
          />
        </div>
      </form>
    </div>
  );
}

export default Profile;
