import React, { useEffect, useState } from "react";
import Path from "./routes/Path";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useSocket } from "./Hooks/socket";
import { userStore } from "./Global/API/store";
import { connectSocket } from "./Global/Socket/connectSocket";

const queryClient = new QueryClient();

const App = () => {
  const socket = useSocket("http://localhost:8000");
  const userInfo = userStore((store) => store.userInfo);
  const addActiveUsers = userStore((store) => store.addActiveUsers);
  const location = useLocation();
  useEffect(() => {
    if (userInfo && socket) {
      connectSocket(userInfo, socket, addActiveUsers);
    }
  }, [socket, userInfo]);
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <div className="px-2 pb-5 pt-20">
          <Path />
        </div>

        {!location.pathname.includes("/message") && <BottomNavbar />}

        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
