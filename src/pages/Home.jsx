import React, { useMemo } from "react";
import Card from "../utils/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  // Get All Blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["Blogs"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API}/blog`),
  });

  // Sorted Blogs descending order by date
  const sortedBlogs = useMemo(() => {
    return blogs?.data?.data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [blogs]);

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
