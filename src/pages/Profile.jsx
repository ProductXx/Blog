import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../Global/API/store";
import Card from "../utils/Card";
import Avatar from "../utils/Avatar";
import {
  deleteUserRoute,
  followUserRoute,
  getUserDetailRoute,
  getUsersRoute,
} from "../Global/API/userRoute";
import Cookies from "js-cookie";
import axios from "axios";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileCards from "../utils/ProfileCards";
import { useGetAllUsers } from "../Hooks/user";
import { useGetOwnerBlog } from "../Hooks/blog";

const Profile = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const addUser = userStore((store) => store.addUser);
  // const profile = userStore((store) => store.profile);
  const userInfo = userStore((store) => store.userInfo);
  // const addProfile = userStore((store) => store.addProfile);
  const userDetail = userStore((store) => store.fetchUserDetail);
  const token = Cookies.get("token");

  const [profile,setProfile] = useState([])
  const { data } = useGetAllUsers();
  const { mutateAsync: profileData } = useGetOwnerBlog();
  // console.log(profileData())

  const allUsers = async () => {
    await axios
      .get(getUsersRoute, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // console.log(res?.data?.data);
        setUsers(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const showFollowers = (usersData) => {
    const users = usersData?.data?.data;
    return users?.filter((user) =>
      profile?.followers?.find((el) => user._id === el)
    );
  };

  const showFollowing = (usersData) => {
    const users = usersData?.data?.data;
    return users?.filter((user) =>
      profile?.following?.find((el) => user._id === el)
    );
  };

  // Follow user --> need blog user id, token
  const handleFollow = async (e) => {
    e.stopPropagation();
    if (token) {
      await axios
        .post(
          followUserRoute,
          { userId: profile._id },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          userDetail(userInfo._id, token);
          // setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
      return;
    }
    toast.error("You need to login!", { autoClose: 2000 });
    setTimeout(() => nav("/login"), 3000);
  };

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

  // useEffect(() => {
  //   // fetchProfile(id);
  //   // allUsers();
  // }, [id, refresh]);
  useEffect(() => {
    profileData({ ownerId: id }).then((res) => setProfile(res?.data?.data[0]));
  }, [id]);

  return (
    <div className="flex flex-col items-start gap-5 px-3">
      <div className="flex justify-between items-start w-full">
        <div className="space-y-3">
          <Avatar name={profile?.email} size={"lg"} />
          <div className="space-y-2">
            <div>
              <h1 className="font-bold text-2xl">{profile.name}</h1>
              <p className="font-semibold">{profile.email}</p>
            </div>
          </div>
        </div>
        {profile?._id === userInfo?._id ? (
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
          <div
            onClick={handleFollow}
            className="py-1 px-4 bg-lightWhite rounded mt-5"
          >
            <span>
              {userInfo?.following?.includes(profile?._id)
                ? "Following"
                : "Follow +"}
            </span>
          </div>
        )}
      </div>
      <div className="self-center w-full h-[1px] bg-gradient-to-r from-transparent via-lightWhite to-transparent"></div>

      <div className="grid grid-cols-3 border-b pb-3 w-full">
        <div>
          <h1 className="font-bold text-2xl">{profile?.blogs?.length}</h1>
          <span className="font-semibold">Blogs</span>
        </div>
        <div>
          <h1 className="font-bold text-2xl">
            {profile?.followers ? profile?.followers?.length : 0}
          </h1>
          <span className="font-semibold">Followers</span>
        </div>
        <div>
          <h1 className="font-bold text-2xl">
            {profile?.following ? profile?.following?.length : 0}
          </h1>
          <span className="font-semibold">Following</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2">
        <div className="space-y-2 ">
          <h1 className="text-2xl font-semibold">Followers</h1>
          <div className="flex gap-3 w-40 overflow-hidden">
            {showFollowers(data)?.map((follower) => (
              <div key={follower?._id} className="flex flex-col gap-1">
                <Avatar
                  name={follower?.email}
                  id={follower?._id}
                  stack={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Following</h1>
          <div className="flex gap-3 w-40 overflow-hidden">
            {showFollowing(data)?.map((following) => (
              <div key={following?._id} className="flex flex-col gap-1">
                <Avatar
                  name={following?.email}
                  id={following?._id}
                  stack={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
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
