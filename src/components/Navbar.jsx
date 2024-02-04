import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import Avatar from "../utils/Avatar";
import Cookies from "js-cookie";
import { userStore } from "../Global/Store/store";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const loginUser = userStore((store) => store.loginUser);
  const token = Cookies.get("token");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && prev > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.nav
      variants={{
        hidden: {
          y: "-100%",
        },
        visible: {
          y: 0,
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.5,
      }}
      className=" text-primary bg-white px-2 py-3 fixed w-full z-50"
    >
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
    </motion.nav>
  );
};

export default Navbar;
