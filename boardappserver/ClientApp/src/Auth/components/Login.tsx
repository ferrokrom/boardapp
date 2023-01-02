import { ChangeEvent, useState } from "react";
import useAuth from "../useAuth";

export default function Login() {
  const { login, loading, error } = useAuth();
  const [user, setUser] = useState("");
  const [pswd, setPswd] = useState("");

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = pswd;
    const username = user;
    login(username, password);
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 ring ring-1 ring-blue-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase ">
          MyKanban
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="flex text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="flex text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPswd(e.target.value)}
              value={pswd}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-blue-600 hover:underline flex">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              disabled={loading}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
          {error && <p className="text-sm">Bad login/password</p>}
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
