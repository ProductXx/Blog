import React, { useEffect, useState } from "react";
import { useSocket } from "../Hooks/socket";
import { userStore } from "../Global/API/store";
import Avatar from "../utils/Avatar";
import { useGetAllUsers } from "../Hooks/user";
import { TbMessageCircleBolt } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const socket = useSocket("http://localhost:8000");

  const userInfo = userStore((store) => store.userInfo);
  const { data: users } = useGetAllUsers();
  // console.log(userInfo, users);

  const nav = useNavigate();

  const [activeUser, setActiveUser] = useState([]);

  console.log(activeUser);
  // console.log(userInfo);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socket.emit("activeUser", userInfo);

      socket.on("showActiveUser", (data) => {
        setActiveUser(data);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });
    }
  }, [socket]);

  // for showing active
  const isMatch = users?.data?.data.some((user) =>
    activeUser?.some((acusr) => acusr?.userInfo?._id === user?._id)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="space-y-3">
        {users?.data?.data?.map((user) => {
          const isActive = activeUser?.some(
            (acusr) => acusr?.userInfo?._id === user?._id
          );
          // for showing all users
          return user._id === userInfo._id ? null : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                nav(`/message/${user._id}`);
              }}
              key={user._id}
              className="flex items-center justify-between border-b p-3"
            >
              <div className="flex items-center space-x-3 ">
                <div className="relative">
                  <Avatar name={user.email} id={user._id} />
                  {isActive && (
                    <span className="w-3 h-3 absolute bg-green-600 rounded-full right-0 bottom-0"></span>
                  )}
                </div>
                <h1 className="text-sm">{user.name}</h1>
              </div>
              <TbMessageCircleBolt className="text-2xl text-gray-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Message;
