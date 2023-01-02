import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./Auth/useAuth";
import { Board } from "./types";

function Layout() {
  const { user } = useAuth();
  const board = user?.boardUsers[0]?.board;
  console.log(board);
  return <div className="App"></div>;
}

export default Layout;
