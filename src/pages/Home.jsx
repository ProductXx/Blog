import React from "react";
import Card from "../utils/Card";
import { useGetAllBlogs } from "../Hooks/blog";

const Home = () => {
  const { data: blogs, isLoading } = useGetAllBlogs();
  const sortedBlogs = blogs?.data?.data.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <div className="grid grid-cols-12 space-y-10 mb-20 w-full max-w-[400px] mx-auto">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        sortedBlogs?.map((blog) => {
          return <Card key={blog._id} blog={blog} />;
        })
      )}
    </div>
  );
};

export default Home;
