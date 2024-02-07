import React, { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { userStore } from "../Global/Store/store";

const Selector = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const selection = ["All", "Following"];
  // const [selected, setselected] = useState("All");
  const setFilterBlogs = userStore((store) => store.setFilterBlog);
  const selected = userStore((store) => store.filterBlogs);

  const containerVarient = {
    opened: {
      width: "155px",
    },
    closed: {
      width: selected === "Following" ? "120px" : "75px",
    },
  };
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && prev > 40) {
      setHidden(true);
      setOpen(false);
    } else {
      setHidden(false);
    }
  });

  const handleSelect = (e, el) => {
    e.stopPropagation();
    setFilterBlogs(el);
    setOpen(false);
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.5,
      }}
      className="sticky top-0 z-50 pt-2"
    >
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        variants={containerVarient}
        animate={open ? "opened" : "closed"}
        className="absolute right-3 flex items-center space-x-3 overflow-hidden bg-primary text-secondary pl-7 py-2 rounded-full"
      >
        <IoIosArrowDropleftCircle
          className={`text-4xl absolute left-0 ${
            open ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
        {/* All Following */}
        <div>
          <h1 className="text-center font-bold">{selected}</h1>
        </div>

        {selection.map((el, i) =>
          selected === el ? null : (
            <div key={i} onClick={(e) => handleSelect(e, el)}>
              <h1 className="text-center font-bold">{el}</h1>
            </div>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default Selector;
