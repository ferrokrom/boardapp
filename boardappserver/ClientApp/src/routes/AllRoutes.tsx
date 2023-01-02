import Login from "../Auth/components/Login";
import useAuth from "../Auth/useAuth";
import { Routes, Route, Navigate, useNavigate, Router } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Boardview from "../components/Board/BoardView";
import { Spinner } from "../components/Elements/Spinner";
import { useEffect, useState } from "react";
import Notifications from "../components/Elements/Notifications";
import { useGetBoardsByUserId } from "../features/board/api/getBoardByUserId";
import { Board } from "../types";
import Listview from "../components/List/Listview";
import Calenderview from "../components/Calender/Calenderview";
import Taskview from "../components/Task/Taskview";

function AllRoutes() {
  const { user } = useAuth();
  const [userId, setUserId] = useState("");
  const [board, setBoard] = useState<Board[]>([]);

  const { data, isLoading, isError } = useGetBoardsByUserId({ userId });

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  useEffect(() => {
    if (data?.data.data) {
      setBoard([...data.data.data]);
    }
  }, [data]);
  if (!user) return <Login />;

  return (
    <div className=" w-full flex overflow-y-hidden h-screen bg-slate-100 h-screen">
      <Sidebar boards={board} userId={userId} />
      <div className="flex flex-col w-full ">
        {!isLoading ? <Navbar board={board[0]} user={user} /> : <Spinner />}
        <div className="relative flex flex-col">
          <Notifications />
        </div>
        <Routes>
          <Route path="/boardview" element={<Boardview board={board[0]} />}>
            <Route path=":id" element={<Boardview />} />
          </Route>
          <Route path="/taskview" element={<Taskview />} />

          <Route path="/listview" element={<Listview board={board[0]} />} />
          <Route
            path="/calenderview"
            element={<Calenderview board={board[0]} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default AllRoutes;
