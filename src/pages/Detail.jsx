import React from "react";
import moment from "moment";
import HashTag from "../utils/HashTag";
import CommentForm from "../utils/CommentForm";
import axios from "axios";
import { userStore } from "../Global/API/store";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const storeBlog = userStore((store) => store.blog);
  const { _id } = storeBlog;

  const { data: blog } = useQuery({
    queryKey: ["Blog"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API}/blog/single-blog/${_id}`)
        .then((res) => res?.data?.data[0]),
  });

  return (
    <div>
      <div>
        <img src={blog?.blogImg} alt="" />
      </div>
      <div className="flex flex-col space-y-2 text-primary mb-5">
        <p className="text-sm">{moment(blog?.date).fromNow()}</p>
        <h1 className="font-bold text-3xl uppercase">{blog?.title}</h1>
        <HashTag hashTags={blog?.hashTag} />
        <p className="text-lg">{blog?.content}</p>
      </div>

      <div className="relative">
        <CommentForm comments={blog?.comments} blogId={blog?._id} />
      </div>
    </div>
  );
};

export default Detail;
