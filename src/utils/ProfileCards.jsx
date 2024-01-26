import React from "react";
import HashTag from "./HashTag";
import LikeBtn from "./LikeBtn";
import CommentBtn from "./CommentBtn";
import Avatar from "./Avatar";
import moment from "moment";
import { userStore } from "../Global/API/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteBlogRoute, likeBlogRoute } from "../Global/API/apiRoute";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";

const ProfileCards = ({ blog, email, name, refresh, setRefresh }) => {
  const {
    _id,
    title,
    author_name,
    hashTag,
    content,
    blogImg,
    blogOwner,
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
            <Avatar name={email} />
            <div className="space-y-1">
              <span className="cursor-pointer hover:underline">
                {userInfo.name}
              </span>
              <p className="text-sm text-lightGray">{moment(date).fromNow()}</p>
            </div>
          </div>
          {/* If userId and blog userId is same, can't follow yourself and not same it's ok */}
          {userInfo?._id === blogOwner ? (
            <div className="flex gap-2">
              <BiSolidPencil className="text-xl border rounded-full w-9 h-9 p-2 text-primary" />
              <BiSolidTrashAlt
                  onClick={handleDelete}
                className="text-xl border rounded-full w-9 h-9 p-2 text-red-600"
              />
            </div>
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

export default ProfileCards;
