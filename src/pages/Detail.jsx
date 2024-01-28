import React, { useEffect, useState } from "react";
import moment from "moment";
import HashTag from "../utils/HashTag";
import CommentForm from "../utils/CommentForm";
import axios from "axios";
import { userStore } from "../Global/API/store";
import { getSingleBlogRoute } from "../Global/API/blogRoute";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useGetSingleBlog } from "../Hooks/blog";

const Detail = () => {
  const [blog, setBlog] = useState();
  const [refresh, setRefresh] = useState(false);
  const storeBlog = userStore((store) => store.blog);
  const { _id } = storeBlog;
  const location = useLocation();

  const { mutateAsync: getSingleBlog, data } = useGetSingleBlog();

  // const getSingleBlog = async () => {
  //   await axios
  //     .post("http://localhost:8000/api/v1/blog/single-blog", { _id })
  //     .then((res) => {
  //       setBlog(res?.data?.data[0]);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getSingleBlog();
  // }, [_id, refresh]);
  
  useEffect(() => {
    getSingleBlog({ _id }).then(res=>setBlog(res?.data?.data[0]));
  }, []);

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
        <CommentForm
          comments={blog?.comments}
          blogId={blog?._id}
        />
      </div>
    </div>
  );
};

export default Detail;
