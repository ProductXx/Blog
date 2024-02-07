import React, { useMemo } from "react";
import Card from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userStore } from "../Global/Store/store";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const selected = userStore((store) => store.filterBlogs);
  const loginUsers = userStore((store) => store.loginUser);
  // Get All Blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["Blogs"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API}/blog`),
  });

  const followingBlogs = () => {
    return blogs?.data?.data?.filter((blog) =>
      loginUsers?.following?.find((el) => el === blog?.ownerInfo?._id)
    );
  };

  const allBlogs = () => {
    return blogs?.data?.data?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  };

  // Sorted Blogs descending order by date
  const filteredBlogs = useMemo(() => {
    if (selected === "Following") {
      return followingBlogs();
    } else {
      return allBlogs();
    }
  }, [blogs, selected]);

  if (filteredBlogs?.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-4 h-[50vh]">
        <h1 className="text-2xl font-bold text-center">There is no blogs.</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 space-y-10 mb-20 w-full max-w-[400px] mx-auto mt-12">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        filteredBlogs?.map((blog) => <Card key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default Home;
