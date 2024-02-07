import React from "react";
import moment from "moment";
import Cookies from "js-cookie";
import FollowBtn from "../utils/FollowBtn";
import HashTag from "../utils/HashTag";
import Avatar from "../utils/Avatar";
import LikeBtn from "../utils/LikeBtn";
import CommentBtn from "../utils/CommentBtn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userStore } from "../Global/Store/store";
import DeleteBtn from "../utils/DeleteBtn";

const Card = ({ blog }) => {
  const {
    _id,
    title,
    ownerInfo,
    hashTag,
    content,
    blogImg,
    date,
    like,
    comments,
  } = blog;

  const nav = useNavigate();
  const loginUser = userStore((store) => store.loginUser);
  const addBlog = userStore((store) => store.addBlog);
  const token = Cookies.get("token");

  // Store blog in userStore and navigate Detail route
  const handleDetail = () => {
    if (token) {
      addBlog(blog);
      nav(`/detail/${title}`);
    } else {
      toast.error("You need to login!", { autoClose: 2000 });
      setTimeout(() => nav("/login"), 3000);
    }
  };

  return (
    <div
      onClick={handleDetail}
      className="col-span-12 md:col-span-6 lg:col-span-12"
    >
      <div className="flex flex-col gap-3 relative shadow rounded-md p-2 md:p-4">
        <div className="flex justify-between items-center gap-2">
          {/* User info and when u click direct to user profile */}
          <div className="flex space-x-3">
            {/* Avatar */}
            <Avatar name={ownerInfo.email} id={ownerInfo._id} />
            <div
              onClick={(e) => {
                e.stopPropagation();
                nav(`/profile/${ownerInfo._id}`);
              }}
              className="space-y-1"
            >
              {/* Name */}
              <span className="cursor-pointer hover:underline">
                {ownerInfo.name}
              </span>
              {/* Created Date */}
              <p className="text-sm text-lightGray">{moment(date).fromNow()}</p>
            </div>
          </div>
          {/* If userId and blog userId is same, can't follow yourself and not same it's ok */}
          {token ? (
            loginUser?._id === ownerInfo._id ? (
              <DeleteBtn blogId={_id} />
            ) : (
              <FollowBtn loginUser={loginUser} ownerInfo={ownerInfo} />
            )
          ) : null}
        </div>
        <div className="flex flex-col gap-2 p-2 mb-3">
          <h1 className="font-bold text-xl uppercase">{title}</h1>
          <HashTag hashTags={hashTag} />
          <div>{content}</div>
          <div className="w-full h-full overflow-hidden">
            <img src={blogImg} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="absolute -bottom-5 left-[50%] -translate-x-[50%] flex gap-3  rounded-3xl backdrop-blur px-3 py-2 shadow">
          <LikeBtn blogId={_id} userId={loginUser?._id} like={like} />
          <div className="w-[1px] h-[25px] bg-lightGray/30"></div>
          <CommentBtn comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default Card;
