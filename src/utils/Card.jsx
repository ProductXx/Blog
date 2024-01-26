import React, { useState } from "react";
import HashTag from "./HashTag";
import Avatar from "./Avatar";
import LikeBtn from "./LikeBtn";
import CommentBtn from "./CommentBtn";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import {
  deleteBlogRoute,
  followUserRoute,
  likeBlogRoute,
} from "../Global/API/apiRoute";
import { userStore } from "../Global/API/store";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";

const Card = ({ refresh, setRefresh, blog }) => {
  const {
    _id,
    title,
    author_name,
    ownerInfo,
    hashTag,
    content,
    blogImg,
    date,
    like,
    comments,
  } = blog;


  const userInfo = userStore((store) => store.userInfo);
  const addBlog = userStore((store) => store.addBlog);
  const nav = useNavigate();
  const likeCount = like ? like.length : 0;
  const commentCount = comments ? comments.length : 0;
  const token = Cookies.get("token");

  // Detail
  const handleDetail = () => {
    if (token) {
      addBlog(blog);
      nav(`/detail/${title}`);
    } else {
      toast.error("You need to login!", { autoClose: 2000 });
      setTimeout(() => nav("/login"), 3000);
    }
  };

  // if login userId and likeUserId same like btn will change
  const match = like?.find((el) => el === userInfo?._id);

  // Like function
  const handleLike = async () => {
    if (token) {
      await axios
        .post(
          likeBlogRoute,
          { blogId: _id },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res?.data);
          setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
      return;
    }
    toast.error("You need to login!", { autoClose: 2000 });
    setTimeout(() => nav("/login"), 3000);
  };

  // Follow user --> need blog user id, token
  const handleFollow = async (e) => {
    e.stopPropagation();
    if (token) {
      await axios
        .post(
          followUserRoute,
          { userId: ownerInfo._id },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
      return;
    }
    toast.error("You need to login!", { autoClose: 2000 });
    setTimeout(() => nav("/login"), 3000);
  };

  // Only owner can delete blog --> need blog id
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (token) {
      await axios
        .delete(deleteBlogRoute + `/${_id}`)
        .then((res) => {
          if (res?.status === 200) toast.success("Blog delete successfully.");
          setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
      return;
    }
    toast.error("You need to login!", { autoClose: 2000 });
    setTimeout(() => nav("/login"), 3000);
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
            <Avatar name={ownerInfo.email} id={ownerInfo._id} />
            <div
              onClick={(e) => {
                e.stopPropagation();
                nav(`/profile/${ownerInfo._id}`);
              }}
              className="space-y-1"
            >
              <span className="cursor-pointer hover:underline">
                {ownerInfo.name}
              </span>
              <p className="text-sm text-lightGray">{moment(date).fromNow()}</p>
            </div>
          </div>
          {/* If userId and blog userId is same, can't follow yourself and not same it's ok */}
          {userInfo?._id === ownerInfo._id ? (
            <div className="flex gap-2">
              <BiSolidTrashAlt
                onClick={handleDelete}
                className="text-xl border rounded-full w-9 h-9 p-2 text-red-600"
              />
            </div>
          ) : (
            <div
              onClick={handleFollow}
              className="py-1 px-4 bg-lightWhite rounded"
            >
              <span>
                {userInfo?.following?.includes(ownerInfo._id)
                  ? "Following"
                  : "Follow +"}
              </span>
            </div>
          )}
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
          <LikeBtn
            handleLike={handleLike}
            match={match}
            likeCount={likeCount}
          />
          <div className="w-[1px] h-[25px] bg-lightGray/30"></div>
          <CommentBtn commentCount={commentCount} />
        </div>
      </div>
      {/* <div className="self-center w-full h-[1px] bg-gradient-to-r from-transparent via-lightGray to-transparent"></div> */}
    </div>
  );
};

export default Card;
