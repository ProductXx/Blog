import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiBell, BiLogIn } from "react-icons/bi";
import Avatar from "../utils/Avatar";
import Cookies from "js-cookie";
import { userStore } from "../Global/Store/store";
import { toast } from "react-toastify";

const Navbar = () => {
  const loginUser = userStore((store) => store.loginUser);
  const token = Cookies.get("token");
  const noti = userStore((store) => store.noti);
  const [openNoti, setOpenNoti] = useState(false);

  return (
    <nav className=" text-primary px-2 pt-2 w-full z-50">
      <div className="flex justify-between items-center">
        {/* LOGO HERE */}
        <Link to={"/"} className="font-bold text-3xl">
          LOGO
        </Link>

        <div className="flex items-center space-x-5">
          {loginUser && token ? (
            <>
              <Avatar id={loginUser._id} />

              <div className="relative" onClick={() => setOpenNoti(!openNoti)}>
                <BiBell className="text-xl" />
                <span className="absolute text-sm -top-3 -right-2 bg-primary text-secondary w-5 h-5 rounded-full text-center">
                  {noti.length}
                </span>
                {openNoti && (
                  <div className="z-[60] absolute top-7 right-1 flex-col gap-3 bg-primary text-secondary w-40 rounded">
                    {noti?.map((el, i) => {
                      return (
                        <p key={i} className="border-b p-3">
                          {el?.content?.content}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
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
