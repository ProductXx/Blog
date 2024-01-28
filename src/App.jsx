import React, { useState } from "react";
import Path from "./routes/Path";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <div className="px-2 pb-5 pt-20">
          <Path />
        </div>

        <BottomNavbar />

        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
