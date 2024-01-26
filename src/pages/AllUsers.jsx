import axios from "axios";
import React, { useEffect, useState } from "react";
import { followUserRoute, getUsersRoute } from "../Global/API/apiRoute";
import Cookies from "js-cookie";
import Avatar from "../utils/Avatar";
import { userStore } from "../Global/API/store";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const token = Cookies.get("token");
  const userInfo = userStore((store) => store.userInfo);
  const userDetail = userStore((store) => store.fetchUserDetail);

  const getAllUsers = async () => {
    await axios
      .get(getUsersRoute, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUsers(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  // Follow user --> need blog user id, token
  const handleFollow = async (e, id) => {
    e.stopPropagation();
    if (token) {
      await axios
        .post(
          followUserRoute,
          { userId: id },
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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="space-y-3">
        {users?.map((user) =>
          user._id === userInfo._id ? null : (
            <div
              key={user._id}
              className="flex items-center justify-between border-b p-3"
            >
              <div className="flex items-center space-x-3">
                <Avatar name={user.email} id={user._id}/>
                <h1 className="text-sm">{user.name}</h1>
              </div>
              <div
                onClick={(e) => handleFollow(e, user._id)}
                className="py-1 px-4 bg-lightWhite rounded"
              >
                <span>
                  {userInfo?.following?.includes(user._id)
                    ? "Following"
                    : "Follow +"}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllUsers;
