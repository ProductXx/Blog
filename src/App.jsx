import React, { useState } from "react";
import Path from "./routes/Path";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();


const App = () => {
  
  const location = useLocation();

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
