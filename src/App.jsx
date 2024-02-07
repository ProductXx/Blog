import React, { useEffect, useState } from "react";
import Path from "./routes/Path";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useSocket } from "./Hooks/socket";
import { userStore } from "./Global/Store/store";
import Selector from "./components/Selector";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const socket = useSocket("http://localhost:8000");
  const loginUser = userStore((store) => store.loginUser);
  const addActiveUsers = userStore((store) => store.addActiveUsers);

  useEffect(() => {
    if (loginUser && socket) {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socket.emit("activeUser", loginUser);

      socket.on("showActiveUser", (data) => {
        addActiveUsers(data);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });
    }
  }, [socket, loginUser, location]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <Navbar />
        {location.pathname === "/" && <Selector />}
        <div className="px-2 pb-5 mt-5">
          <Path />
        </div>

        {!location.pathname.includes("/message") && <BottomNavbar />}

        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
