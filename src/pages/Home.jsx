import React, { useEffect, useMemo } from "react";
import Card from "../utils/Card";
import { useGetAllBlogs } from "../Hooks/blog";
import { userStore } from "../Global/API/store";
import { useSocket } from "../Hooks/socket";
import { connectSocket } from "../Global/Socket/connectSocket";

const Home = () => {
  // const socket = useSocket("http://localhost:8000");

  // const userInfo = userStore((store) => store.userInfo);
  // const addActiveUsers = userStore((store) => store.addActiveUsers);
  const { data: blogs, isLoading } = useGetAllBlogs();

  const sortedBlogs = useMemo(() => {
    return blogs?.data?.data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [blogs]);

  // useEffect(() => {
  //   if (userInfo && socket) {
  //     connectSocket(userInfo, socket, addActiveUsers);
  //   }
  // }, [socket]);

  return (
    <div className="grid grid-cols-12 space-y-10 mb-20 w-full max-w-[400px] mx-auto">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        sortedBlogs?.map((blog) => <Card key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default Home;
