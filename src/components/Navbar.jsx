import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import Avatar from "../utils/Avatar";
import Cookies from "js-cookie";
import { userStore } from "../Global/Store/store";

const Navbar = () => {
  const loginUser = userStore((store) => store.loginUser);
  const token = Cookies.get("token");

  return (
    <nav className=" text-primary px-2 pt-2 w-full z-50">
      <div className="flex justify-between items-center">
        {/* LOGO HERE */}
        <Link to={"/"} className="font-bold text-3xl">
          LOGO
        </Link>

        <div className="flex items-center space-x-5">
          {loginUser && token ? (
            <Avatar id={loginUser._id} />
          ) : (
            <>
              <Link to={"/login"} className="flex items-center gap-x-2">
                <BiLogIn className="text-xl" /> Login
              </Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
