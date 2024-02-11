import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../Global/Store/store";
import Avatar from "../utils/Avatar";
import { deleteUserRoute } from "../Global/API/userRoute";
import Cookies from "js-cookie";
import axios from "axios";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileCards from "../components/ProfileCards";
import { useGetAllUsers } from "../Hooks/user";
import { useGetOwnerBlog } from "../Hooks/blog";
import FollowBtn from "../utils/FollowBtn";
import AvatarStack from "../utils/AvatarStack";

const ShowCountContainer = ({ data, title }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">{data ? data?.length : 0}</h1>
      <span className="font-semibold">{title}</span>
    </div>
  );
};

const Profile = () => {
  const addUser = userStore((store) => store.addUser);
  const loginUser = userStore((store) => store.loginUser);

  const { id } = useParams();
  const nav = useNavigate();
  const token = Cookies.get("token");

  const [profile, setProfile] = useState([]);
  const { data: allUsers } = useGetAllUsers();
  const { mutateAsync: profileData } = useGetOwnerBlog();

  const { blogs, followers, following } = profile;

  // Only owner can delete --> need user id
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (token) {
      await axios
        .delete(deleteUserRoute + `/${profile._id}`)
        .then((res) => {
          if (res?.status === 200) toast.success("User delete successfully.");
          Cookies.remove("token");
          addUser(null);
          nav("/");
        })
        .catch((err) => console.log(err));
      return;
    }
    toast.error("You need to login!", { autoClose: 2000 });
    setTimeout(() => nav("/login"), 3000);
  };

  useEffect(() => {
    profileData({ ownerId: id }).then((res) => {
      setProfile(res?.data?.data[0]);
    });
  }, [id]);

  return (
    <div className="flex flex-col items-start gap-5 px-3">
      {/* User Info */}
      <div className="flex justify-between items-start w-full">
        <div className="space-y-3">
          {/* Avatar */}
          <Avatar name={profile?.email} size={"lg"} />
          {/* Name and email */}
          <div className="space-y-2">
            <div>
              <h1 className="font-bold text-2xl">{profile.name}</h1>
              <p className="font-semibold">{profile.email}</p>
            </div>
          </div>
        </div>
        {/* If loginUser show Delete and Edit */}
        {profile?._id === loginUser?._id ? (
          <div className="flex gap-2 mt-5">
            <BiSolidPencil
              onClick={() => nav("/EditUser")}
              className="text-xl border rounded-full w-9 h-9 p-2 text-primary"
            />
            <BiSolidTrashAlt
              onClick={handleDelete}
              className="text-xl border rounded-full w-9 h-9 p-2 text-red-600"
            />
          </div>
        ) : (
          <FollowBtn ownerInfo={profile} />
        )}
      </div>
      {/* Divider */}
      <div className="self-center w-full h-[1px] bg-gradient-to-r from-transparent via-lightWhite to-transparent"></div>
      {/* Followers and Blogs info */}
      <div className="grid grid-cols-3 border-b pb-3 w-full">
        {/* blog */}
        <ShowCountContainer title={"Blogs"} data={blogs} />
        {/* Follower */}
        <ShowCountContainer title={"Followers"} data={followers} />
        {/* Following */}
        <ShowCountContainer title={"Following"} data={following} />
      </div>
      {/* Show Followers Avatar */}
      <div className="w-full grid grid-cols-2">
        <div className="space-y-2 ">
          <h1 className="text-2xl font-semibold">Followers</h1>
          <AvatarStack usersData={allUsers} followers={followers} />
        </div>
        {/* Show Following Avatar */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Following</h1>
          <AvatarStack usersData={allUsers} following={following} />
        </div>
      </div>
      {/* Blogs */}
      <div className="w-full space-y-3">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <div className="grid grid-cols-12 space-y-10 mb-20 w-full max-w-[400px] mx-auto">
          {profile?.blogs?.map((blog) => {
            return (
              <ProfileCards
                key={blog._id}
                blog={blog}
                email={profile.email}
                name={profile.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
